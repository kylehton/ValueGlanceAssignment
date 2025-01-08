'use client';
import { useState } from "react";
import { Table } from "./Table.js"

const api_key = process.env.NEXT_PUBLIC_API_KEY;
const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${api_key}`;

export default function Home() {
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);

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
    
  };

  return (
    <div>
      <button className="border-2 border-black" onClick={getData}>
        Get Data
      </button>
      <Table incomeStatements={filteredStatements} />
      
    </div>
  );
}
