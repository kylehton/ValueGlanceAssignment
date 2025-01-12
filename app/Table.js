/* This is a Table component, made to custom create a table to hold Apple's
income statements from the FinancialModelingPrep API. It uses HTML built in
table components and elements, hand-creating the headers and filling rows
per data entry. */

import "./globals.css";

export function Table ({ incomeStatements }) {
    return (
      <div className="m-5 mb-10 overflow-x-auto overflow-y-auto rounded border border-white text-zinc-600"
      style={{
        maxWidth: "95.25%",
        marginLeft: 20,
      }}
      >
        <table className="table-auto min-w-full sm:w-auto"
        style={{
          maxWidth: "100%", 
          maxHeight: "100%",
          tableLayout: "auto", 

        }}
        >
          <thead>
            <tr>
              <th className="text-center px-2 py-3 border border-gray-300">Date</th>
              <th className="text-center px-2 py-3 border border-gray-300">Revenue</th>
              <th className="text-center px-2 py-3 border border-gray-300">Net Income</th>
              <th className="text-center px-2 py-3 border border-gray-300">Gross Profit</th>
              <th className="text-center px-2 py-3 border border-gray-300">EPS</th>
              <th className="text-center px-2 py-3 border border-gray-300">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {incomeStatements.map((incomeStatement, index) => (
              <tr key={index}>
                <td className="text-center px-2 py-2 border border-gray-300">{(incomeStatement[0].toString()).substring(0,15)}</td>
                <td className="text-center px-2 py-2 border border-gray-300">{incomeStatement[1]}</td>
                <td className="text-center px-2 py-2 border border-gray-300">{incomeStatement[2]}</td>
                <td className="text-center px-2 py-2 border border-gray-300">{incomeStatement[3]}</td>
                <td className="text-center px-2 py-2 border border-gray-300">{incomeStatement[4]}</td>
                <td className="text-center px-2 py-2 border border-gray-300">{incomeStatement[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  