'use client';
import React, { useState } from 'react';
import { Table } from './Table.js';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Menu, MenuItem, Button, TextField } from '@mui/material';

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${api_key}`;

export default function Home() {
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [sortOrder, setSortOrder] = useState(true); // true -> ascending, false -> descending
  const [lowBound, setLowBound] = useState(0);
  const [highBound, setHighBound] = useState(0);
  const [filterType, setFilterType] = useState(-1);

  const get_data = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log('Raw Data:', data);

      // Create a new array with simplified data
      const newStatements = data.map((incomeStatement) => [
        new Date(incomeStatement.date),
        incomeStatement.revenue,
        incomeStatement.netIncome,
        incomeStatement.grossProfit,
        incomeStatement.eps,
        incomeStatement.operatingIncome,
      ]);
      
      setIncomeStatements(newStatements); // Update the state with the new array
      setFilteredStatements(newStatements); // Update the state with the new array
      console.log('Simplified Data:', newStatements);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // type -> filterType
  // lowBound -> minimum value in range
  // highBound -> maximum value in range
  const filter_data = () => {
    
    let newStatement = [...filteredStatements];

    if (filterType === 0) {
        setLowBound(new Date(lowBound));
        setHighBound(new Date(highBound));

        newStatement = filteredStatements.filter(
          (incomeStatement) => incomeStatement[filterType].getFullYear() >= lowBound 
          && incomeStatement[filterType].getFullYear() <= highBound
        );
    }
    else {
    console.log('Filter Type:', filterType);
    console.log('Low Bound:', lowBound);
    console.log('High Bound:', highBound);

    newStatement = filteredStatements.filter(
      (incomeStatement) => incomeStatement[filterType] >= lowBound && incomeStatement[filterType] <= highBound
    );
  }
    setFilteredStatements([...newStatement]);
    setFilterType(-1); // Reset filter type
    setLowBound(0); // Reset low bound
    setHighBound(0); // Reset high bound
  };

  // type -> date (0), revenue (1), netIncome (2)
  // order -> ascending (true), descending (false)
  const sort_data = (data, type, order) => {
    let newStatement = [...data];
    if (order === true) {
      console.log('Ascending');
      newStatement.sort((a, b) => a[type] - b[type]); 
      console.log(newStatement);
    } else if (order === false) {
      console.log('Descending');
      newStatement.sort((a, b) => b[type] - a[type]); 
      console.log(newStatement);
    } else {
      throw new Error('Invalid order value');
    }
  
    setFilteredStatements([...newStatement]);  
  };
  
  const reset_data = () => {
    setFilteredStatements([...incomeStatements]);  
  };

  return (
    <div className="ml-10 mt-5 mr-10 w-9/10 content-center">
      <div className="mt-2">
        <Table className="overflow-x-auto border-2 border-black w-full" incomeStatements={filteredStatements} />
      </div>
      <div className="mt-4 flex flex-wrap items-center space-x-2 sm:space-x-4 sm:justify-start justify-center">
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={get_data}>
          Get Data
        </Button>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="outlined" color="black" className="m-1 h-8" {...bindTrigger(popupState)}>
                Sort
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={()=> {
                  sort_data(filteredStatements, 0, true)
                  }}>Date (Ascending)</MenuItem>
                <MenuItem onClick={()=> {
                  sort_data(filteredStatements, 0, false)
                  }}>Date (Descending)</MenuItem>
                <MenuItem onClick={()=> {
                  sort_data(filteredStatements, 1, true)
                  }}>Revenue (Ascending)</MenuItem>
                <MenuItem onClick={()=> {
                  sort_data(filteredStatements, 1, false)
                  }}>Revenue (Descending)</MenuItem>
                <MenuItem onClick={()=> {
                  sort_data(filteredStatements, 2, true)
                  }}>Net Income (Ascending)</MenuItem>
                <MenuItem onClick={()=> {
                  sort_data(filteredStatements, 2, false)
                  }}>Net Income (Descending)</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="outlined" color="black" className="m-1 h-8" {...bindTrigger(popupState)}>
                Filter
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={()=> {
                  setFilterType(0)
                  }}>Date</MenuItem>
                <MenuItem onClick={()=> {
                  setFilterType(1)
                  }}>Revenue</MenuItem>
                <MenuItem onClick={()=> {
                  setFilterType(2)
                  }}>Descending</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <TextField
          placeholder="From"
          className="h-8 w-20 sm:w-32 m-1"
          InputProps={{
            style: { height: '2rem' }, // Ensures the TextField has the same height as the buttons
          }}
          onChange={(e) => {
            setLowBound(e.target.value)
          }}
        />
        <TextField
          placeholder="To"
          className="h-8 w-20 sm:w-32 m-1"
          InputProps={{
            style: { height: '2rem' }, // Ensures the TextField has the same height as the buttons
          }}
          onChange={(e) => {
            setHighBound(e.target.value)
          }}
        />
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={filter_data}>
          Apply
        </Button>
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={reset_data}>
          Reset Sort/Filter
        </Button>
      </div>
    </div>
  );
}
