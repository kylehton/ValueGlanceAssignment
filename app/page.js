'use client';
import React from 'react';
import { useState } from "react";
import { Table } from "./Table.js"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Menu, MenuItem, Button } from "@mui/material";

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${api_key}`;

export default function Home() {
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [sortOrder, setSortOrder] = useState(0);

  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Raw Data:", data);

      // Create a new array with simplified data
      const newStatements = data.map((incomeStatement) => [
        incomeStatement.date,
        incomeStatement.revenue,
        incomeStatement.netIncome,
        incomeStatement.grossProfit,
        incomeStatement.eps,
        incomeStatement.operatingIncome,
      ]);

      setIncomeStatements(newStatements); // Update the state with the new array
      setFilteredStatements(newStatements); // Update the state with the new array
      console.log("Simplified Data:", newStatements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // type -> revenue, netIncome, grossProfit, eps, operatingIncome
  // lowBound -> minimum value in range
  // highBound -> maximum value in range
  const filterData = (data, type, lowBound, highBound) => {

  };

  // type -> revenue, netIncome, grossProfit, eps, operatingIncome
  // order -> ascending, descending
  const sortData = (data, type, order) => {
    if (order === 0) {

    }
    else if (order === 1) {

    }
    else {
      
    }
  };

  return (
    <div className="ml-20 mt-10 mr-20">
      <button className="ml-10 mt-10 border-2 border-black p-1 mr-10" onClick={getData}>
        Get Data
      </button>
            <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="" {...bindTrigger(popupState)}>
              Sort
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Ascending</MenuItem>
              <MenuItem onClick={popupState.close}>Descending</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <Table className="ml-20 mt-10 border-2 border-black p-1 mr-20" incomeStatements={filteredStatements} />
      
    </div>
  );
}
