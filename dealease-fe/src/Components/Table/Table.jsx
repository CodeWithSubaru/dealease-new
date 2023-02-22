export function TableComp({ headers, data }) {
  return (
    <>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              <th> header</th>;
            })}
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </>
  );
}
