// import React, { useState, useRef } from "react";
// import PropTypes from "prop-types";
// import { Container, StyledTable } from "./Styles";
// import { Spinner, Button } from "react-bootstrap";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { GrEdit } from "react-icons/gr";
// import { FaEye, FaFileExport } from "react-icons/fa";
// import ReactPaginate from "react-paginate";
// import CustomDropdown from "./custom-drop-filter/index";
// import CustomModal from "../../utils/custom-modal/CustomModal";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";

// const CustomDataTable = ({
//   title,
//   data,
//   columns,
//   isLoading,
//   error,
//   renderActions,
//   Add,
//   onDelete,
//   onEdit,
//   onView,
//   currentPage,
//   totalPages,
//   onPageChange,
//   onPerPageChange,
//   perPage,
//   // onApplyFilter,
//   Link,
//   LinkToEdit,
// }) => {
//   const [showExportModal, setShowExportModal] = useState(false);
//   const tableRef = useRef(null);
//   const navigate = useNavigate();

//   const enhancedColumns = React.useMemo(() => {
//     const updatedColumns = columns.map((col) => ({
//       ...col,
//       name: (
//         <div className="table-header">
//           {col.name}
//           {/* {col.isFilterable && (
//             <CustomDropdown
//               columnKey={col.name}
//               onApplyFilter={onApplyFilter}
//             />
//           )} */}
//         </div>
//       ),
//     }));

//     if (renderActions) {
//       updatedColumns.push({
//         name: "Actions",
//         cell: (row) => (
//           <div style={{ display: "flex", gap: "10px" }}>
//             {onDelete && (
//               <button
//                 className="action-btn"
//                 onClick={() => onDelete(row)}
//                 title="Delete"
//               >
//                 <RiDeleteBin6Line />
//               </button>
//             )}
//             {onEdit && LinkToEdit && (
//               <button
//                 className="action-btn"
//                 onClick={() => onEdit(row)}
//                 title="Edit"
//               >
//                 <GrEdit />
//               </button>
//             )}

//             {onView && (
//               <button
//                 className="action-btn"
//                 onClick={() => onView(row)}
//                 title="View"
//               >
//                 <FaEye />
//               </button>
//             )}
//           </div>
//         ),
//       });
//     }
//     return updatedColumns;
//   }, [columns, renderActions, onDelete, onEdit, onView]);

//   const handleExportSVG = () => {
//     if (!tableRef.current) {
//       console.error("Table reference is null.");
//       return;
//     }

//     html2canvas(tableRef.current, { useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");

//         const svgContent = `
//           <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
//             <image href="${imgData}" width="${canvas.width}" height="${canvas.height}" />
//           </svg>
//         `;

//         const blob = new Blob([svgContent], { type: "image/svg+xml" });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "table.svg";
//         link.click();
//         URL.revokeObjectURL(url);
//       })
//       .catch((error) => {
//         console.error("Error exporting to SVG:", error);
//       });
//   };

//   const handleExportPDF = () => {
//     if (!tableRef.current) {
//       console.error("Table reference is null.");
//       return;
//     }
//     html2canvas(tableRef.current, { useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");
//         const imgWidth = 210;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//         pdf.save("table.pdf");
//       })
//       .catch((error) => {
//         console.error("Error exporting to PDF:", error);
//       });
//   };

//   const handleExportJPG = () => {
//     if (!tableRef.current) {
//       console.error("Table reference is null.");
//       return;
//     }
//     html2canvas(tableRef.current, { useCORS: true })
//       .then((canvas) => {
//         const link = document.createElement("a");
//         link.href = canvas.toDataURL("image/jpeg");
//         link.download = "table.jpg";
//         link.click();
//       })
//       .catch((error) => {
//         console.error("Error exporting to JPG:", error);
//       });
//   };

//   const handleExportExcel = () => {
//     if (!data || data.length === 0) {
//       console.error("No data available for export.");
//       return;
//     }

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(data);

//     XLSX.utils.book_append_sheet(wb, ws, "DataTable");
//     XLSX.writeFile(wb, "table.xlsx");
//   };

//   return (
//     <Container>
//       <h1>{title}</h1>
//       <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//         {Add && <button onClick={() => navigate(Link)}>Add {title}</button>}
//         <Button variant="primary" onClick={() => setShowExportModal(true)}>
//           <FaFileExport /> Export
//         </Button>
//       </div>
//       {!data ? (
//         <div>
//           <Spinner animation="border" />
//         </div>
//       ) : error ? (
//         <div>Error: {error}</div>
//       ) : (
//         <>
//           <div ref={tableRef}>
//             <StyledTable columns={enhancedColumns} data={data} />
//           </div>
//           <div
//             className=""
//             style={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <ReactPaginate
//               previousLabel={"previous"}
//               nextLabel={"next"}
//               breakLabel={"..."}
//               pageCount={totalPages}
//               forcePage={currentPage}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={2}
//               onPageChange={onPageChange}
//               containerClassName={"pagination"}
//               subContainerClassName={"pages pagination"}
//               activeClassName={"pagination"}
//             />
//             <div style={{ marginBottom: "10px" }}>
//               <label htmlFor="perPage">Items per page:</label>
//               <select
//                 id="perPage"
//                 value={perPage}
//                 onChange={(e) => onPerPageChange(Number(e.target.value))}
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={15}>15</option>
//               </select>
//             </div>
//           </div>
//         </>
//       )}

//       <CustomModal
//         show={showExportModal}
//         onHide={() => setShowExportModal(false)}
//         title="Export Table"
//         bodyContent={
//           <div
//             style={{ display: "flex", gap: "10px", justifyContent: "center" }}
//           >
//             <Button variant="primary" onClick={handleExportSVG}>
//               SVG
//             </Button>
//             <Button variant="primary" onClick={handleExportPDF}>
//               PDF
//             </Button>
//             <Button variant="primary" onClick={handleExportJPG}>
//               JPG
//             </Button>
//             <Button variant="primary" onClick={handleExportExcel}>
//               Excel
//             </Button>
//           </div>
//         }
//         footerContent={null}
//         headerBg="#007bff"
//         headerColor="white"
//         bodyBg="#f4f4f4"
//         footerBg="#f1f1f1"
//         buttonProps={{
//           bgColor: "#28a745",
//           textColor: "white",
//           hoverColor: "#218838",
//         }}
//       />
//     </Container>
//   );
// };

// CustomDataTable.propTypes = {
//   title: PropTypes.string,
//   data: PropTypes.array.isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.node.isRequired,
//       selector: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
//         .isRequired,
//       isFilterable: PropTypes.bool,
//     })
//   ).isRequired,
//   isLoading: PropTypes.bool,
//   error: PropTypes.string,
//   renderActions: PropTypes.bool,
//   Add: PropTypes.func,
//   onDelete: PropTypes.func,
//   onView: PropTypes.func,
//   onEdit: PropTypes.func,
//   currentPage: PropTypes.number,
//   totalPages: PropTypes.number,
//   onPageChange: PropTypes.func.isRequired,
//   onPerPageChange: PropTypes.func.isRequired,
//   perPage: PropTypes.number.isRequired,
//   onApplyFilter: PropTypes.func.isRequired,
//   Link: PropTypes.string,
//   LinkToEdit: PropTypes.string,
// };

// CustomDataTable.defaultProps = {
//   isLoading: false,
//   error: null,
//   renderActions: false,
//   onDelete: null,
//   onView: null,
//   onEdit: null,
//   currentPage: 0,
//   totalPages: 1,
//   Add: null,
// };

// export default CustomDataTable;

// src/utils/custom-data-table/CustomDataTable.jsx
import { useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Container, StyledTable, FormWrapper } from "./Styles";
import { Spinner, Button, Form } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { FaEye, FaFileExport } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import CustomModal from "../../utils/custom-modal/CustomModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const CustomDataTable = ({
  title,
  data,
  columns,
  isLoading,
  error,
  renderActions,
  Add,
  onDelete,
  onEdit,
  onView,
  currentPage,
  totalPages,
  onPageChange,
  onPerPageChange,
  perPage,
  filterEnabled,
  filterConfig = [],
  onApplyFilter,
  Link,
  LinkToEdit,
}) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const tableRef = useRef(null);
  const navigate = useNavigate();

  // --- Filter form state ---
  const initialFilters = filterConfig.reduce((acc, f) => {
    acc[f.name] = "";
    return acc;
  }, {});
  const [formValues, setFormValues] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFormValues((fv) => ({ ...fv, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    onApplyFilter(formValues);
  };

  // --- Columns with actions ---
  const enhancedColumns = useMemo(() => {
    const updated = columns.map((col) => ({
      ...col,
      name: <div className="table-header">{col.name}</div>,
    }));

    if (renderActions) {
      updated.push({
        name: "Actions",
        cell: (row) => (
          <div style={{ display: "flex", gap: 10 }}>
            {onDelete && (
              <button
                className="action-btn"
                onClick={() => onDelete(row)}
                title="Delete"
              >
                <RiDeleteBin6Line />
              </button>
            )}
            {onEdit && LinkToEdit && (
              <button
                className="action-btn"
                onClick={() => onEdit(row)}
                title="Edit"
              >
                <GrEdit />
              </button>
            )}
            {onView && (
              <button
                className="action-btn"
                onClick={() => onView(row)}
                title="View"
              >
                <FaEye />
              </button>
            )}
          </div>
        ),
      });
    }

    return updated;
  }, [columns, renderActions, onDelete, onEdit, LinkToEdit, onView]);

  // --- Export handlers (unchanged) ---
  const exportImage = (type) => {
    if (!tableRef.current) return;
    html2canvas(tableRef.current, { useCORS: true }).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      if (type === "SVG") {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}"><image href="${img}" width="${canvas.width}" height="${canvas.height}"/></svg>`;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "table.svg";
        a.click();
        URL.revokeObjectURL(url);
      } else if (type === "PDF") {
        const pdf = new jsPDF("p", "mm", "a4");
        const w = 210;
        const h = (canvas.height * w) / canvas.width;
        pdf.addImage(img, "PNG", 0, 0, w, h);
        pdf.save("table.pdf");
      } else if (type === "JPG") {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "table.jpg";
        link.click();
      }
    });
  };

  const handleExportExcel = () => {
    if (!data?.length) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "table.xlsx");
  };

  return (
    <Container>
      <h1>{title}</h1>

      {/* ➕ Add & Export */}
      <div
        style={{ width: "100wh", display: "flex", gap: 10, marginBottom: 10 }}
      >
        {Add && <button onClick={() => navigate(Link)}>Add {title}</button>}
        <Button onClick={() => setShowExportModal(true)}>
          <FaFileExport /> Export
        </Button>
      </div>
      {/* 🔎 Filter Form */}
      {filterEnabled && filterConfig.length > 0 && (
        <FormWrapper as="form" onSubmit={handleFilterSubmit}>
          {filterConfig.map((f) => (
            <Form.Group key={f.name} className="me-3 mt-3 mb-3">
              {f.type === "select" ? (
                <Form.Select
                  name={f.name}
                  value={formValues[f.name]}
                  onChange={handleFilterChange}
                >
                  <option value="">{f.label}</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type="search"
                  name={f.name}
                  placeholder={`Search ${f.label}…`}
                  value={formValues[f.name]}
                  onChange={handleFilterChange}
                />
              )}
            </Form.Group>
          ))}
          <div className="align-self-end mb-3">
            <Button type="submit" variant="primary">
              Apply Filters
            </Button>
          </div>
        </FormWrapper>
      )}

      {/* 🔄 Loading / Error */}
      {isLoading ? (
        <Spinner animation="border" />
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <>
          {/* 📋 Table */}
          <div ref={tableRef}>
            <StyledTable columns={enhancedColumns} data={data} />
          </div>

          {/* 📊 Pagination + Per‑page */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <ReactPaginate
              previousLabel="‹"
              nextLabel="›"
              breakLabel="…"
              pageCount={totalPages}
              forcePage={currentPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={onPageChange}
              containerClassName="pagination"
              activeClassName="active"
            />
            <div>
              <label htmlFor="perPage">Items per page:</label>
              <Form.Select
                id="perPage"
                value={perPage}
                onChange={(e) => onPerPageChange(Number(e.target.value))}
                style={{
                  width: "auto",
                  display: "inline-block",
                  marginLeft: 8,
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </Form.Select>
            </div>
          </div>
        </>
      )}

      {/* 🔧 Export Modal */}
      <CustomModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        title="Export Table"
        bodyContent={
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => exportImage("SVG")}>SVG</Button>
            <Button onClick={() => exportImage("PDF")}>PDF</Button>
            <Button onClick={() => exportImage("JPG")}>JPG</Button>
            <Button onClick={handleExportExcel}>Excel</Button>
          </div>
        }
        footerContent={null}
        headerBg="#007bff"
        headerColor="#fff"
        bodyBg="#f4f4f4"
        footerBg="#f1f1f1"
      />
    </Container>
  );
};

CustomDataTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  renderActions: PropTypes.bool,
  Add: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,

  filterEnabled: PropTypes.bool,
  filterConfig: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["select", "search"]).isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  onApplyFilter: PropTypes.func,
  Link: PropTypes.string,
  LinkToEdit: PropTypes.string,
};

CustomDataTable.defaultProps = {
  isLoading: false,
  error: null,
  renderActions: false,
  Add: false,
  onDelete: null,
  onEdit: null,
  onView: null,
  filterEnabled: false,
  filterConfig: [],
  onApplyFilter: () => {},
};

export default CustomDataTable;
