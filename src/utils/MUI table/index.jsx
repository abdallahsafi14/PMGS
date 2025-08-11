import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

const NestedTable = () => {
  const rows = [
    {
      id: 1,
      task: "Wireframing",
      description: "Create wireframe for Dashboard page",
      details: [
        { label: "Detail 1", value: "Lorem ipsum dolor sit amet." },
        { label: "Detail 2", value: "Consectetur adipiscing elit." },
        { label: "Detail 3", value: "Sed do eiusmod tempor incididunt." },
      ],
    },
    {
      id: 2,
      task: "Hi-Fi Design",
      description: "Create hi-fi design 3 main screen",
      details: [
        { label: "Detail 1", value: "Pellentesque habitant morbi tristique." },
        {
          label: "Detail 2",
          value: "Senectus et netus et malesuada fames ac turpis egestas.",
        },
        {
          label: "Detail 3",
          value: "Vestibulum ante ipsum primis in faucibus orci luctus.",
        },
      ],
    },
  ];

  // State to track expanded rows
  const [expandedRows, setExpandedRows] = useState({});

  // Toggle expand/collapse for a specific row
  const handleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell /> {/* For expand/collapse icon */}
            <TableCell>Task</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              {/* Main Row */}
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleExpand(row.id)}
                  >
                    {expandedRows[row.id] ? <FaArrowUp /> : <FaArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell>{row.task}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>

              {/* Expanded Content Row */}
              {expandedRows[row.id] && (
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleExpand(row.id)}
                    >
                      {expandedRows[row.id] ? <FaArrowUp /> : <FaArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Detail</TableCell>
                          <TableCell>Description</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.details.map((detail, index) => (
                          <TableRow key={index}>
                            <TableCell>{detail.label}</TableCell>
                            <TableCell>{detail.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NestedTable;
