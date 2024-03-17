import { Link } from "react-router-dom";
import SkeletonTable from "./SkeletonTable";

export default function Table({ headers, children, loading }) {
  return (
    <div className="w-full py-1 px-2 bg-white rounded-xl border border-grayborder">
      {loading ? (
        <SkeletonTable />
      ) : (
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white">
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
            {children}
          </tbody>
        </table>
      )}
    </div>
  );
}
