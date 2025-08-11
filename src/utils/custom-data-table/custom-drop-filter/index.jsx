import React, { useState } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { StyledDropdown } from "./Styles";
import { FaSearch } from "react-icons/fa";

const CustomDropdown = ({ columnKey, onApplyFilter }) => {
  const [value, setValue] = useState("");

  const handleApply = () => {
    console.log(columnKey);
    onApplyFilter(columnKey, value);
  };

  return (
    <StyledDropdown>
      <Dropdown.Toggle variant="secondary" id={`dropdown-${columnKey}`}>
        <FaSearch />
      </Dropdown.Toggle>

      <Dropdown.Menu autoClose="outside">
        <Form className="p-3" onClick={(e) => e.stopPropagation()}>
          <Form.Group controlId={`filter-${columnKey}`}>
            <Form.Label>Enter {columnKey}:</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Filter by ${columnKey}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleApply}
            className="mt-3 w-100"
          >
            Apply
          </Button>
        </Form>
      </Dropdown.Menu>
    </StyledDropdown>
  );
};

export default CustomDropdown;
