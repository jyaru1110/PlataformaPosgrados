import { Link } from "react-router-dom";

export default function Table({ headers, data, route, loading }) {
  return (
    <div className="w-full py-1 px-2 bg-white rounded-xl border border-grayborder">
      {loading ? (
        <p>cargando</p>
      ) : (
        <table className="w-full text-sm overflow-x-auto">
          <thead className="">
            <tr className="text-left border-b border-grayborder">
              {headers.map((header, index) => (
                <th
                  className="px-2 py-1 font-normal text-secondary"
                  key={index}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data.map((row, index) => (
              <tr className="border-b border-grayborder" key={index}>
                {row.map((cell, index) => (
                  <td className="px-2 py-1" key={index}>
                    <Link to={route + row[0]}>{cell}</Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
