import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import AppTemplate from "../../../app-template";
import { Themes } from "../../../../context/themes/themes";
import {
  updateTask,
  getTaskById,
} from "../../../../store/tasks/action/tasksActions";
import { selectTask } from "../../../../store/tasks/tasksSlice";
import {
  StyledCard,
  StyledFormControl,
  StyledFormSelect,
} from "../../projects/CreateProject/createProject.styles";
import Loading from "../../../layout/Loading";

const EditTask = () => {
  const { theme } = useContext(Themes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { projectId } = useParams();
  const location = useLocation();

  const reduxTask = useSelector(selectTask);
  const locationTask = location.state?.task;

  const [task, setTask] = useState(
    locationTask ||
      reduxTask || {
        id: "",
        title: "",
        description: "",
        status: "not_started",
        priority: "medium",
        due_date: "",
        project: { id: projectId },
        subtasks: [],
      }
  );

  useEffect(() => {
    if (!reduxTask?.id) {
      dispatch(
        getTaskById({
          projectId: Number(projectId),
          taskId: Number(id),
        })
      );
    }
  }, [id]);

  useEffect(() => {
    if (reduxTask?.id === Number(id)) {
      setTask(reduxTask);
    }
  }, [reduxTask, id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (index, field, value) => {
    const updated = [...task.subtasks];
    updated[index][field] = value;
    setTask({ ...task, subtasks: updated });
  };

  const handleAddSubtask = () => {
    setTask({
      ...task,
      subtasks: [...task.subtasks, { title: "", completed: false }],
    });
  };

  const handleRemoveSubtask = (index) => {
    const updated = task.subtasks.filter((_, i) => i !== index);
    setTask({ ...task, subtasks: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", task.title || "");
    formData.append("description", task.description || "");
    formData.append("status", task.status || "not_started");
    formData.append("priority", task.priority || "medium");
    formData.append("due_date", task.due_date || "");

    dispatch(
      updateTask({
        projectId: task.project?.id,
        taskId: task.id,
        formData,
      })
    )
      .unwrap()
      .then(() => navigate("/tasks"));
  };

  if (!task?.id) return <Loading />;

  return (
    <AppTemplate pageTitle="Edit Task" navbar sidebar>
      <div className="container mt-4">
        <StyledCard theme={theme}>
          <h3 className="mb-4">Edit Task</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Task Title</Form.Label>
              <StyledFormControl
                theme={theme}
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 textArea">
              <Form.Label>Description</Form.Label>
              <StyledFormControl
                theme={theme}
                as="textarea"
                name="description"
                rows={3}
                value={task.description}
                onChange={handleChange}
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

            {/* Subtasks UI */}
            {/* <div className="mb-3">
              <h5>Subtasks</h5>
              {task.subtasks.map((sub, index) => (
                <Row key={index} className="align-items-center mb-2">
                  <Col sm={8}>
                    <StyledFormControl
                      theme={theme}
                      placeholder="Subtask Title"
                      value={sub.title}
                      onChange={(e) =>
                        handleSubtaskChange(index, "title", e.target.value)
                      }
                    />
                  </Col>
                  <Col sm={3}>
                    <Form.Check
                      type="checkbox"
                      label="Completed"
                      checked={sub.completed}
                      onChange={(e) =>
                        handleSubtaskChange(
                          index,
                          "completed",
                          e.target.checked
                        )
                      }
                    />
                  </Col>
                  <Col sm={1}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveSubtask(index)}
                    >
                      <FiTrash2 />
                    </Button>
                  </Col>
                </Row>
              ))}
              <Button
                variant="outline-secondary"
                onClick={handleAddSubtask}
                size="sm"
              >
                <FiPlus /> Add Subtask
              </Button>
            </div> */}

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

export default EditTask;
