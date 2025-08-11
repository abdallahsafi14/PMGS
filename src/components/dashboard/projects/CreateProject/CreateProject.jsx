// src/pages/projects/create/CreateProject.jsx
import React, { useState, useContext, useEffect } from "react";
import AppTemplate from "../../../app-template";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Themes } from "../../../../context/themes/themes";
import {
  StyledCard,
  StyledFormControl,
  StyledFormSelect,
  StyledReactSelect,
  HiddenFileInput,
  FileUploadLabel,
} from "./createProject.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../../../../store/users/usersSlice";
import { fetchUsers } from "../../../../store/users/action/usersActions";
import { createProject } from "../../../../store/projects/action/projectsActions";

const CreateProject = () => {
  const { theme } = useContext(Themes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);

  const [project, setProject] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    priority: "medium",
    status: "active",
    team_members: [],
    attachments: [],
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setProject({ ...project, attachments: Array.from(files) });
    } else {
      setProject({ ...project, [name]: value });
    }
  };

  const handleTeamChange = (selected) => {
    setProject({ ...project, team_members: selected.map((s) => s.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(project).forEach(([key, val]) => {
      if (key === "attachments") {
        val.forEach((file) => formData.append("attachments[]", file));
      } else if (key === "team_members") {
        val.forEach((id) => formData.append("team_members[]", id));
      } else {
        formData.append(key, val);
      }
    });

    dispatch(createProject(formData))
      .unwrap()
      .then(() => navigate("/projects"));
  };

  const teamOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} - ${user.email}`,
  }));

  const selectedTeam = teamOptions.filter((opt) =>
    project.team_members.includes(opt.value)
  );

  return (
    <AppTemplate pageTitle="Create New Project" navbar sidebar>
      <div className="container mt-4">
        <StyledCard theme={theme}>
          <h3 className="mb-4">Create New Project</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <StyledFormControl
                name="name"
                value={project.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 textArea">
              <Form.Label>Description</Form.Label>
              <StyledFormControl
                theme={theme}
                as="textarea"
                rows={3}
                name="description"
                value={project.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <StyledFormSelect
                theme={theme}
                name="status"
                value={project.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="not started">Not Started</option>
              </StyledFormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <StyledFormSelect
                theme={theme}
                name="priority"
                value={project.priority}
                onChange={handleChange}
              >
                <option>high</option>
                <option>medium</option>
                <option>low</option>
              </StyledFormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <StyledFormControl
                theme={theme}
                type="date"
                name="start_date"
                value={project.start_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <StyledFormControl
                theme={theme}
                type="date"
                name="end_date"
                value={project.end_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Team Members</Form.Label>
              <StyledReactSelect
                theme={theme}
                classNamePrefix="react-select"
                isMulti
                name="team_members"
                value={selectedTeam}
                options={teamOptions}
                onChange={handleTeamChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Attachments</Form.Label>
              <FileUploadLabel htmlFor="attachments" theme={theme}>
                Choose Files
              </FileUploadLabel>
              <HiddenFileInput
                id="attachments"
                type="file"
                name="attachments"
                multiple
                onChange={handleChange}
              />
              {project.attachments.length > 0 && (
                <ul>
                  {project.attachments.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              style={{ backgroundColor: theme.secondary, border: "none" }}
            >
              Save Project
            </Button>
          </Form>
        </StyledCard>
      </div>
    </AppTemplate>
  );
};

export default CreateProject;
