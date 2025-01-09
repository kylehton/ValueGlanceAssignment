export function Table({ incomeStatements }) {

return (
    <table className="border-1 border-black">
        <thead>
          <tr className="w-full border-collapse">
            <th className="text-center px-10 py-5">Date</th>
            <th className="text-center px-10 py-5">Revenue</th>
            <th className="text-center px-10 py-5">Net Income</th>
            <th className="text-center px-10 py-5">Gross Profit</th>
            <th className="text-center px-10 py-5">EPS</th>
            <th className="text-center px-10 py-5">Operating Income</th>
          </tr>
        </thead>
        <tbody>
        {incomeStatements.map((incomeStatement, index) => (
          <tr key={index}>
            <td className="text-center">{incomeStatement[0]}</td>
            <td className="text-center">{incomeStatement[1]}</td>
            <td className="text-center">{incomeStatement[2]}</td>
            <td className="text-center">{incomeStatement[3]}</td>
            <td className="text-center">{incomeStatement[4]}</td>
            <td className="text-center">{incomeStatement[5]}</td>
          </tr>
        ))}
        </tbody>
      </table>
);
}
