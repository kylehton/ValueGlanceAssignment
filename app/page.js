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
  const [lowBound, setLowBound] = useState(-1);
  const [highBound, setHighBound] = useState(-1);
  const [filterType, setFilterType] = useState(-1);
  const [fromTextField, setFromTextField] = useState("");
  const [toTextField, setToTextField] = useState("");

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
      
      setIncomeStatements(newStatements); // Update the state with the new array
      setFilteredStatements(newStatements); // Update the state with the new array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // type -> filterType
  // lowBound -> minimum value in range
  // highBound -> maximum value in range
  const filter_data = () => {
    
    let newStatement = [...incomeStatements];

    if (filterType === 0) {
        setLowBound(new Date(lowBound));
        setHighBound(new Date(highBound));

        newStatement = incomeStatements.filter(
          (incomeStatement) => incomeStatement[filterType].getFullYear() >= lowBound 
          && incomeStatement[filterType].getFullYear() <= highBound
        );
    }
    else {
    newStatement = incomeStatements.filter(
      (incomeStatement) => incomeStatement[filterType] >= lowBound && incomeStatement[filterType] <= highBound
    );
  }
    setFilteredStatements([...newStatement]);
    setFilterType(-1); // Reset filter type
    setLowBound(-1); // Reset low bound
    setHighBound(-1); // Reset high bound
  };

  // type -> date (0), revenue (1), netIncome (2)
  // order -> ascending (true), descending (false)
  const sort_data = (data, type, order) => {
    let newStatement = [...data];
    if (order === true) {
      newStatement.sort((a, b) => a[type] - b[type]); 
      console.log(newStatement);
    } else if (order === false) {
      newStatement.sort((a, b) => b[type] - a[type]); 
      console.log(newStatement);
    } else {
      throw new Error('Invalid order value');
    }
  
    setFilteredStatements([...newStatement]);  
  };

  const apply_filter = () => {
    setLowBound
  }
  
  const reset_data = () => {
    setFilteredStatements([...incomeStatements]);  
  };

  const clear_data = () => {
    setIncomeStatements([]);
    setFilteredStatements([]);
  }

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
                  }}>Net Income</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <TextField
          type="number"
          placeholder="From" // Placeholder text displayed when value is empty
          className="h-8 w-20 sm:w-32 m-1"
          value={lowBound === -1 ? "" : lowBound} // Show placeholder when lowBound is 0
          InputProps={{
            style: { height: '2rem' }, // Ensures the TextField has the same height as the buttons
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10); // Convert input to integer
            setLowBound(isNaN(value) ? 0 : value); // Default to 0 for invalid input
          }}
        />
        <TextField
          type="number"
          placeholder="To" // Placeholder text displayed when value is empty
          className="h-8 w-20 sm:w-32 m-1"
          value={highBound === -1 ? "" : highBound} // Show placeholder when highBound is 0
          InputProps={{
            style: { height: '2rem' }, // Ensures the TextField has the same height as the buttons
          }}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10); // Convert input to integer
            setHighBound(isNaN(value) ? 0 : value); // Default to 0 for invalid input
          }}
        />
        <Button
          variant="outlined"
          color="black"
          className="m-1 h-8"
          onClick={() => {
            filter_data(); // Apply the filter logic
            setLowBound(-1); // Clear "From" input field
            setHighBound(-1); // Clear "To" input field
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
    </div>
  );
}
