import PropTypes from "prop-types";

export const Table = ({ columns, data }) => {
  return (
    <div className="shadow-md rounded-lg overflow-x-auto">
      <table className="w-full bg-white border-collapse">
        <thead className="bg-[#F4F2FF] border-b">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-3 text-[12px] text-center text-[#6E6893] uppercase text-left border align-middle">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-100">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="border text-[12px] p-2">
                    {col.cell({ row })}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-[12px] text-gray-500">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      cell: PropTypes.func.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
