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
  const [sortType, setSortType] = useState(0); // 0 -> date, 1 -> revenue, 2 -> netIncome

  const getData = async () => {
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

  // type -> revenue, netIncome, grossProfit, eps, operatingIncome
  // lowBound -> minimum value in range
  // highBound -> maximum value in range
  const filterData = (data, type, lowBound, highBound) => {
    newStatement = data.filter(
      (incomeStatement) => incomeStatement[type] >= lowBound && incomeStatement[type] <= highBound
    );
    setFilteredStatements(newStatement);
  };

  // type -> date (0), revenue (1), netIncome (2)
  // order -> ascending (true), descending (false)
  const sortData = (data, type, order) => {
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
  

  const resetData = () => {
    setFilteredStatements([...incomeStatements]);  
  };

  return (
    <div className="ml-10 mt-5 mr-10 w-9/10 content-center">
      <div className="mt-2">
        <Table className="overflow-x-auto border-2 border-black w-full" incomeStatements={filteredStatements} />
      </div>
      <div className="mt-4 flex flex-wrap items-center space-x-2 sm:space-x-4 sm:justify-start justify-center">
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={getData}>
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
                  sortData(filteredStatements, 0, true)
                  }}>Date (Ascending)</MenuItem>
                <MenuItem onClick={()=> {
                  sortData(filteredStatements, 0, false)
                  }}>Date (Descending)</MenuItem>
                <MenuItem onClick={()=> {
                  sortData(filteredStatements, 1, true)
                  }}>Revenue (Ascending)</MenuItem>
                <MenuItem onClick={()=> {
                  sortData(filteredStatements, 1, false)
                  }}>Revenue (Descending)</MenuItem>
                <MenuItem onClick={()=> {
                  sortData(filteredStatements, 2, true)
                  }}>Net Income (Ascending)</MenuItem>
                <MenuItem onClick={()=> {
                  sortData(filteredStatements, 2, false)
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
                <MenuItem onClick={popupState.close}>Date</MenuItem>
                <MenuItem onClick={popupState.close}>Revenue</MenuItem>
                <MenuItem onClick={popupState.close}>Descending</MenuItem>
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
        <Button variant="outlined" color="black" className="m-1 h-8">
          Apply
        </Button>
        <Button variant="outlined" color="black" className="m-1 h-8" onClick={resetData}>
          Reset Sort/Filter
        </Button>
      </div>
    </div>
  );
}
