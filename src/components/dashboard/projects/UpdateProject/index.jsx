import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import AppTemplate from "../../../app-template";
import { useDispatch, useSelector } from "react-redux";
import { Themes } from "../../../../context/themes/themes";
import { updateProject } from "../../../../store/projects/action/projectsActions";
import { selectUsers } from "../../../../store/users/usersSlice";
import {
  StyledCard,
  StyledFormControl,
  StyledFormSelect,
  StyledReactSelect,
} from "../CreateProject/createProject.styles";
import { fetchUsers } from "../../../../store/users/action/usersActions";

const EditProject = () => {
  const { theme } = useContext(Themes);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const initialProject = location.state?.project || {
    id: "",
    name: "",
    description: "",
    status: "active",
    priority: "medium",
    start_date: "",
    end_date: "",
    team_members: [],
    attachments: [],
  };

  const [project, setProject] = useState(() => {
    const normalizedMembers = initialProject.team_members.map((m) =>
      typeof m === "object" ? m.id : m
    );

    return {
      ...initialProject,
      team_members: normalizedMembers,
    };
  });

  // Get users for team member selection
  const users = useSelector(selectUsers);
  console.log(users);
  const availableTeamMembers = users?.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    const field =
      name === "startDate"
        ? "start_date"
        : name === "endDate"
        ? "end_date"
        : name;

    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProject((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  const handleTeamMemberChange = (selected) => {
    setProject((prev) => ({
      ...prev,
      team_members: selected.map((user) => user.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", project.name);
    formData.append("description", project.description);
    formData.append("status", project.status.toLowerCase());
    formData.append("priority", project.priority.toLowerCase());
    formData.append("start_date", project.start_date);
    formData.append("end_date", project.end_date);

    project.team_members.forEach((id) => formData.append("team_members[]", id));

    if (project.attachments?.length) {
      project.attachments.forEach((file, i) =>
        formData.append(`attachments[${i}]`, file)
      );
    }
    console.log("formData", formData);

    try {
      await dispatch(updateProject({ id: project.id, data: formData }));

      navigate("/projects");
    } catch (err) {
      console.error("Project update failed:", err);
    }
  };

  return (
    <AppTemplate pageTitle="Edit Project" navbar sidebar>
      <div className="container mt-4">
        <StyledCard theme={theme}>
          <h3 className="mb-4">Edit Project</h3>
          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <StyledFormControl
                theme={theme}
                name="name"
                value={project.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
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

            {/* Status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <StyledFormSelect
                theme={theme}
                name="status"
                value={project.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
              </StyledFormSelect>
            </Form.Group>

            {/* Priority */}
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <StyledFormSelect
                theme={theme}
                name="priority"
                value={project.priority}
                onChange={handleChange}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </StyledFormSelect>
            </Form.Group>

            {/* Start Date */}
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <StyledFormControl
                theme={theme}
                type="date"
                name="startDate"
                value={project.start_date}
                onChange={handleChange}
              />
            </Form.Group>

            {/* End Date */}
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <StyledFormControl
                theme={theme}
                type="date"
                name="endDate"
                value={project.end_date}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Team Members */}
            <Form.Group className="mb-3">
              <Form.Label>Team Members</Form.Label>
              <StyledReactSelect
                theme={theme}
                isMulti
                classNamePrefix="react-select"
                options={availableTeamMembers}
                value={availableTeamMembers.filter((u) =>
                  project.team_members.includes(u.value)
                )}
                onChange={handleTeamMemberChange}
              />
            </Form.Group>

            {/* Attachments */}
            <Form.Group className="mb-3">
              <Form.Label>Attachments</Form.Label>
              <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
            </Form.Group>

            {/* Submit */}
            <Button
              type="submit"
              style={{ backgroundColor: theme.secondary, border: "none" }}
            >
              Save Changes
            </Button>
          </Form>
        </StyledCard>
      </div>
    </AppTemplate>
  );
};

export default EditProject;
