import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import { Themes } from "../../../context/themes/themes";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../store/projects/action/projectsActions";
import { selectProjects } from "../../../store/projects/projectsSlice";

const AddTaskModal = ({ show, onClose, onSave }) => {
  const { theme } = useContext(Themes);
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  const [task, setTask] = useState({
    title: "",
    status: "not_started",
    priority: "medium",
    due_date: "",
    project_id: "",
  });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave?.(task);
    onClose();
  };

  const bodyContent = (
    <Form>
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control name="title" value={task.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Status</Form.Label>
        <Form.Select name="status" value={task.status} onChange={handleChange}>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="for_review">For Review</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Project</Form.Label>
        <Form.Select
          name="project_id"
          value={task.project_id}
          onChange={handleChange}
        >
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
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
      title="Add New Task"
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

export default AddTaskModal;
