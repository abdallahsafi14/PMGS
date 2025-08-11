import React, { useState } from "react";
import AppTemplate from "../../app-template";
import {
  Container,
  FilterRow,
  SearchInput,
  Select,
  FileCard,
  FileHeader,
  FileInfo,
  FileFooter,
  FileNote,
} from "./styles";
import { Button, Badge } from "react-bootstrap";
import {
  FaDownload,
  FaTrashAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileArchive,
  FaFileImage,
  FaFileAlt,
  FaFileVideo,
  FaFile,
} from "react-icons/fa";

const dummyAttachments = [
  {
    id: 1,
    fileName: "login_ui.png",
    type: "image/png",
    uploadedBy: "Ahmed",
    relatedTo: "Design Login Page",
    date: "2025-06-11",
    note: "First UI draft",
  },
  {
    id: 2,
    fileName: "project_specs.pdf",
    type: "application/pdf",
    uploadedBy: "Sara",
    relatedTo: "Project Alpha",
    date: "2025-06-10",
    note: "Specs document",
  },
  {
    id: 3,
    fileName: "archive_docs.zip",
    type: "application/zip",
    uploadedBy: "Ali",
    relatedTo: "System Backup",
    date: "2025-06-09",
    note: "Compressed archive",
  },
  {
    id: 4,
    fileName: "financial_report.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploadedBy: "Fatima",
    relatedTo: "Finance Project",
    date: "2025-06-08",
    note: "Q2 Report",
  },
];

const getFileIcon = (type) => {
  if (type.includes("image")) return <FaFileImage color="#007bff" />;
  if (type.includes("pdf")) return <FaFilePdf color="#dc3545" />;
  if (type.includes("word")) return <FaFileWord color="#0072c6" />;
  if (type.includes("excel")) return <FaFileExcel color="#2e7d32" />;
  if (type.includes("zip") || type.includes("rar"))
    return <FaFileArchive color="#6c757d" />;
  if (type.includes("text")) return <FaFileAlt color="#343a40" />;
  if (type.includes("video")) return <FaFileVideo color="#6f42c1" />;
  return <FaFile color="#6c757d" />;
};

const matchesType = (type, filter) => {
  if (!filter) return true;
  if (filter === "image") return type.includes("image");
  if (filter === "pdf") return type.includes("pdf");
  if (filter === "word")
    return type.includes("msword") || type.includes("wordprocessingml");
  if (filter === "excel")
    return type.includes("spreadsheetml") || type.includes("excel");
  if (filter === "zip") return type.includes("zip") || type.includes("rar");
  if (filter === "text") return type.includes("text");
  if (filter === "video") return type.includes("video");
  return false;
};

const AttachmentsPage = () => {
  const [attachments, setAttachments] = useState(dummyAttachments);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setAttachments((prev) => prev.filter((file) => file.id !== id));
    }
  };

  const filtered = attachments.filter((file) => {
    return (
      (!search ||
        file.fileName.toLowerCase().includes(search.toLowerCase()) ||
        file.uploadedBy.toLowerCase().includes(search.toLowerCase()) ||
        file.relatedTo.toLowerCase().includes(search.toLowerCase())) &&
      matchesType(file.type, typeFilter)
    );
  });

  return (
    <AppTemplate
      pageTitle="Attachment Management"
      navbar
      sidebar
      SEOPageName="Attachments"
    >
      <Container>
        <h3 className="mb-4">Uploaded Files</h3>

        <FilterRow>
          <SearchInput
            placeholder="Search file name, user or task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="image">Images</option>
            <option value="pdf">PDF</option>
            <option value="word">Word</option>
            <option value="excel">Excel</option>
            <option value="zip">ZIP / RAR</option>
            <option value="text">Text</option>
            <option value="video">Video</option>
          </Select>
        </FilterRow>

        {filtered.length === 0 && <p>No files found.</p>}

        {filtered.map((file) => (
          <FileCard key={file.id}>
            <FileHeader>
              <FileInfo>
                <strong>
                  {getFileIcon(file.type)} {file.fileName}
                </strong>
                <Badge bg="secondary" className="ms-2">
                  {file.type}
                </Badge>
              </FileInfo>
              <span>{file.date}</span>
            </FileHeader>

            <FileNote>
              <em>Note:</em> {file.note || "No note"}
            </FileNote>

            <FileFooter>
              <div>
                <small>
                  <strong>Uploaded by:</strong> {file.uploadedBy}
                </small>
                <br />
                <small>
                  <strong>Related to:</strong> {file.relatedTo}
                </small>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => alert(`Downloading: ${file.fileName}`)}
                >
                  <FaDownload /> Download
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(file.id)}
                >
                  <FaTrashAlt /> Delete
                </Button>
              </div>
            </FileFooter>
          </FileCard>
        ))}
      </Container>
    </AppTemplate>
  );
};

export default AttachmentsPage;
