import React, { useState, useEffect, useRef } from "react";
import { DropdownTrigger, DropdownMenu, DropdownItem } from "./Styles";

const CustomDropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="custom-dropdown"
      style={{ position: "relative", display: "inline-block" }}
    >
      <DropdownTrigger onClick={() => setIsOpen((prev) => !prev)}>
        {label}
      </DropdownTrigger>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default CustomDropdown;
