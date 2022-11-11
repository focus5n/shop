import React, { useEffect } from "react";
import FileSaver from 'file-saver';

const ExportCSV = ({ csvData, fileName }) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";


  const header = ['제목', '사용자 이름', '질문', '답변', '숏코드']

  const exportToCSV = (csvData, fileName) => {


    const ws = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, [header]);
    XLSX.utils.sheet_add_json(ws, csvData, {
      origin: 'A2', skipHeader: true
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      <button
        variant="warning"
        id="exporttable" className="btn btn-primary"
        onClick={e => exportToCSV(csvData, fileName, null)}
      >
        엑셀추출
      </button>
    </div>
  );
};

export default ExportCSV;

