import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { useTable } from 'react-table';
import './form.css';

function Form() {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState();
  const [uploading, setUploading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);




  // Function to handle CSV upload
  const handleCsvUpload = (data, fileInfo) => {
    console.log(data, fileInfo);
    setCsvHeaders(data[0]);
    setCsvData(data.slice(1));
  };

  // Table component using react-table
  const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });

    return (
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const columns = React.useMemo(
    () =>
      csvHeaders.map((header) => ({
        Header: header,
        accessor: header,
      })),
    [csvHeaders]
  );

  const data = React.useMemo(
    () =>
      csvData.map((row) => {
        const rowData = {};
        csvHeaders.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      }),
    [csvData, csvHeaders]
  );

  return (
    <>
      <div className="drop-section">
       </div>
      <div className="list-section">
        <div className="list-title">Uploaded Files</div>
        <ul className="list">
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
              <button>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <CSVReader onFileLoaded={handleCsvUpload} />
      {csvData.length > 0 && <Table columns={columns} data={data} />}
    </>
  );
}

export default Form;
