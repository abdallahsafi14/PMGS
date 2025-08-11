import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import { Themes } from "../../../context/themes/themes";

const AddProjectModal = ({ show, onClose, onSave }) => {
  const { theme } = useContext(Themes);

  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave?.(project);
    onClose();
  };

  const bodyContent = (
    <Form>
      <Form.Group>
        <Form.Label>Project Name</Form.Label>
        <Form.Control
          name="name"
          value={project.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={project.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          value={project.priority}
          onChange={handleChange}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );

  const footerContent = (
    <>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Save
      </Button>
    </>
  );

  return (
    <CustomModal
      show={show}
      onHide={onClose}
      title="Add New Project"
      bodyContent={bodyContent}
      footerContent={footerContent}
      headerBg={theme.secondary}
      headerColor={theme.textOnSecondary}
      bodyBg={theme.primary}
      footerBg={theme.background}
      buttonProps={{
        bgColor: theme.secondary,
        textColor: theme.textOnSecondary,
        hoverColor: theme.active,
      }}
    />
  );
};

export default AddProjectModal;
