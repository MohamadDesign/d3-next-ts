import React from "react";
import PaginationComponent from "./Pagination";
interface TableProps {
  tableHeads: string[];
  title: string;
  data: string;
}

interface DataProps {
  id: number;
  title: string;
  name: string;
}

const TableComponent: React.FC<TableProps> = async ({
  tableHeads,
  title,
  data,
}) => {
  const res = await fetch(data);
  const tableData: DataProps[] = await res.json();
  const sortedData = tableData.slice(1, 6);
  return (
    <>
      <div className="card-custom">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  {tableHeads.map((tableHead) => (
                    <th>{tableHead}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {sortedData.map((table) => (
                  <tr className="hover" key={table.id}>
                    <td>{table.title ? table.title : table.name}</td>
                    <td>{(Math.random() * 100).toFixed(2)} Gb</td>
                    <td>{(Math.random() * 100).toFixed(2)} Mb</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-actions justify-end">
            <PaginationComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
