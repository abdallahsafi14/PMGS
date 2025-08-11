import React, { useState, useContext, useEffect } from "react";
import AppTemplate from "../../../app-template";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Themes } from "../../../../context/themes/themes";
import {
  StyledCard,
  StyledFormControl,
  StyledFormSelect,
} from "../../projects/CreateProject/createProject.styles";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../../store/tasks/action/tasksActions";
import { fetchProjects } from "../../../../store/projects/action/projectsActions";
import { selectProjects } from "../../../../store/projects/projectsSlice";

const CreateTask = () => {
  const { theme } = useContext(Themes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectProjects);

  const [task, setTask] = useState({
    title: "",
    status: "not_started",
    priority: "medium",
    due_date: "",
    project_id: "",
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that a project is selected
    if (!task.project_id) {
      alert("Please select a project");
      return;
    }

    dispatch(
      createTask({
        projectId: task.project_id,
        formData: task,
      })
    )
      .unwrap()
      .then(() => navigate("/tasks"));
  };

  return (
    <AppTemplate pageTitle="Create Task" navbar sidebar>
      <div className="container mt-4">
        <StyledCard theme={theme}>
          <h3 className="mb-4">Create Task</h3>
          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>
            <StyledFormSelect
              theme={theme}
              name="project_id"
              value={task.project_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.name}
                </option>
              ))}
            </StyledFormSelect>
          </Form.Group>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <StyledFormControl
                theme={theme}
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <StyledFormControl
                theme={theme}
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <StyledFormSelect
                theme={theme}
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="for_review">For Review</option>
                <option value="completed">Completed</option>
              </StyledFormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <StyledFormSelect
                theme={theme}
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </StyledFormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <StyledFormControl
                theme={theme}
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              style={{ backgroundColor: theme.secondary, border: "none" }}
            >
              Save Task
            </Button>
          </Form>
        </StyledCard>
      </div>
    </AppTemplate>
  );
};

export default CreateTask;
