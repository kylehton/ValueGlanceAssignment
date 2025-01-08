export function Table({ incomeStatements }) {

return (
    <table>
        <thead>
          <tr className="w-full border-collapse">
            <th className="text-left px-5 py-2">Date</th>
            <th>Revenue</th>
            <th>Net Income</th>
            <th>Gross Profit</th>
            <th>EPS</th>
            <th>Operating Income</th>
          </tr>
        </thead>
        <tbody>
        {incomeStatements.map((incomeStatement, index) => (
          <tr key={index}>
            <td>{incomeStatement[0]}</td>
            <td>{incomeStatement[1]}</td>
            <td>{incomeStatement[2]}</td>
            <td>{incomeStatement[3]}</td>
            <td>{incomeStatement[4]}</td>
            <td>{incomeStatement[5]}</td>
          </tr>
        ))}
        </tbody>
      </table>
);
}
