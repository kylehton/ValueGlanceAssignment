export function Table({ incomeStatements }) {
    return (
      <div className="mt-10 overflow-x-auto min-w-full">
        <table className="table-auto border-collapse border border-black min-w-full sm:w-auto">
          <thead>
            <tr>
              <th className="text-center px-3 py-2 border border-black">Date</th>
              <th className="text-center px-3 py-2 border border-black">Revenue</th>
              <th className="text-center px-3 py-2 border border-black">Net Income</th>
              <th className="text-center px-3 py-2 border border-black">Gross Profit</th>
              <th className="text-center px-3 py-2 border border-black">EPS</th>
              <th className="text-center px-3 py-2 border border-black">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {incomeStatements.map((incomeStatement, index) => (
              <tr key={index}>
                <td className="text-center px-3 py-2 border border-black">{incomeStatement[0]}</td>
                <td className="text-center px-3 py-2 border border-black">{incomeStatement[1]}</td>
                <td className="text-center px-3 py-2 border border-black">{incomeStatement[2]}</td>
                <td className="text-center px-3 py-2 border border-black">{incomeStatement[3]}</td>
                <td className="text-center px-3 py-2 border border-black">{incomeStatement[4]}</td>
                <td className="text-center px-3 py-2 border border-black">{incomeStatement[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  