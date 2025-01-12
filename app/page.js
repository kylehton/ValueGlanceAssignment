'use client';
import './globals.css';
import React, { useState } from 'react';
import { Table } from './Table.js';
import { Typography, Button, TextField } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"San Francisco", Helvetica, Arial, sans-serif',
  },
});

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${api_key}`;

export default function Home() {
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [sortType, setSortType] = useState(-1); // index of type to sort
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending
  const [selectedSort, setSelectedSort] = useState(""); // placeholder for sortType
  const [lowBound, setLowBound] = useState(-1); // lower bound for interval
  const [upperBound, setUpperBound] = useState(-1); //upper bound for interval
  const [filterType, setFilterType] = useState(-1); // index of type to filter
  const [selectedFilter, setSelectedFilter] = useState(""); // placeholder for filterType

  const get_data = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      // Create a new array with simplified data
      const newStatements = data.map((incomeStatement) => [
        new Date(incomeStatement.date),
        incomeStatement.revenue,
        incomeStatement.netIncome,
        incomeStatement.grossProfit,
        incomeStatement.eps,
        incomeStatement.operatingIncome,
      ]);

      console.log(newStatements);
      
      setIncomeStatements(newStatements); 
      setFilteredStatements(newStatements);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // type -> index of type to sort
  // order -> true for ascending, false for descending
  const sort_data = (type, order, data = filteredStatements) => {
    let newStatement = [...data];
    if (order === true) {
      newStatement.sort((a, b) => a[type] - b[type]); 
    } else if (order === false) {
      newStatement.sort((a, b) => b[type] - a[type]); 
    } else {
      throw new Error('Invalid order value');
    }
    setFilteredStatements([...newStatement]);
  };
  
  // filterType -> index of type to filter
  // lowBound -> minimum value in range
  // upperBound -> maximum value in range
  const filter_data = () => {
    let newStatement = [...incomeStatements];
  
    if (filterType === 0) {
      setLowBound(new Date(lowBound));
      setUpperBound(new Date(upperBound));
  
      newStatement = incomeStatements.filter(
        (incomeStatement) => {
          const date = new Date(incomeStatement[filterType]);
          return (
            date.getFullYear() >= lowBound &&
            date.getFullYear() <= upperBound
          );
        }
      );
    } else {
      newStatement = incomeStatements.filter(
        (incomeStatement) => 
          incomeStatement[filterType] >= lowBound && 
          incomeStatement[filterType] <= upperBound
      );
    }
  
    // apply active sort to the filtered data
    if (sortType !== -1) {
      sort_data(sortType, sortOrder, newStatement);
    } else {
      setFilteredStatements([...newStatement]);
    }
  
    setFilterType(-1);
    setLowBound(-1);
    setUpperBound(-1);
    setSelectedFilter("");
  };

  const reset_filters = () => {
      setFilterType(-1);
      setLowBound(-1); 
      setUpperBound(-1); 
      setSelectedFilter("");
  }

  const reset_sort = () => {
    setSortType(-1);
    setSortOrder(true); 
    setSelectedSort("");
  }
  
  const reset_data = () => {
    setFilteredStatements([...incomeStatements]); 
    reset_filters();
    reset_sort();
  };

  const clear_data = () => {
    reset_filters();
    reset_sort();
    setIncomeStatements([]);
    setFilteredStatements([]);
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="m-10 w-9/10" >
    <Typography
      className="ml-5 mt-10"
      sx={{
        marginLeft: 2.25,
        fontWeight: 'bold',   
        fontSize: '2.25rem', 
        fontFamily: '"San Francisco", Helvetica, Arial, sans-serif', 
        color: '#1f2937',
      }}>
        Income Statement Data
    </Typography>

      <p className="font-thin text-slate-700 text-xs ml-5 mr-5 m-1">Data provided by FinancialModelingPrep Income Statements API</p>
      <div className="mt-10 flex flex-wrap items-center gap-y-2 gap-x-1 sm:gap-x-2 justify-start
      ml-5 mr-5 text-zinc-700 min-w-full
      ">
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={get_data}>
          Get Data
        </Button>
        <select
          value={selectedSort}
          className="m-1 h-8 border border-zinc-700 rounded-md px-2 text-sm"
          onChange={(e) => {
            const [type, order] = e.target.value.split(',');
        
            // Update states for UI tracking
            setSelectedSort(e.target.value);
            setSortType(Number(type));
            setSortOrder(order === 'true');
        
            // Immediately sort data with the new type and order
            sort_data(Number(type), order === 'true');
          }}
        >
          <option value="">Sort By</option>
          <option value="0,true">Date (Ascending)</option>
          <option value="0,false">Date (Descending)</option>
          <option value="1,true">Revenue (Ascending)</option>
          <option value="1,false">Revenue (Descending)</option>
          <option value="2,true">Net Income (Ascending)</option>
          <option value="2,false">Net Income (Descending)</option>
        </select>
          <select
            value={selectedFilter}
            className="m-1 h-8 border border-zinc-700 rounded-md px-2 text-sm"
            onChange={(e) => {
              setFilterType(Number(e.target.value));
              setSelectedFilter(Number(e.target.value));
            }}
          >
            <option value="">Filter By</option>
            <option value="0">Date</option>
            <option value="1">Revenue</option>
            <option value="2">Net Income</option>
            
          </select>
        <TextField
          type="number"
          placeholder="From" 
          className="h-8 w-20 sm:w-32 m-1"
          value={lowBound === -1 ? "" : lowBound} 
          InputProps={{
            style: { height: '2rem' }, 
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10); 
            setLowBound(isNaN(value) ? 0 : value); 
          }}
        />
        <TextField
          type="number"
          placeholder="To" 
          className="h-8 w-20 sm:w-32 m-1"
          value={upperBound === -1 ? "" : upperBound} 
          InputProps={{
            style: { height: '2rem' },
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10); 
            setUpperBound(isNaN(value) ? 0 : value); 
          }}
        />
        <Button
          variant="outlined"
          color="black"
          className="m-1 h-8"
          onClick={() => {
            filter_data();
            setLowBound(-1);
            setUpperBound(-1);
          }}
        >
          Apply
        </Button>

        <Button variant="outlined" color="black" className="m-1 h-8" onClick={reset_data}>
          Reset Sort/Filter
        </Button>
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={clear_data}>
          Clear Data
        </Button>
      </div>
      <div className="">
        <Table className="overflow-x-auto w-full" incomeStatements={filteredStatements} />
      </div>
    </div>
    </ThemeProvider>
  );
}