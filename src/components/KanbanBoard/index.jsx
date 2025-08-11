import React, { useState, useEffect } from "react";
import {
  BoardContainer,
  Column,
  ColumnHeader,
  TaskCard,
  TaskTitle,
  SubtaskList,
  SubtaskItem,
  AddTaskButton,
  AddSubtaskButton,
} from "./styles";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../utils/custom-modal/CustomModal";
import { createTask } from "../../store/tasks/action/tasksActions";
import { createSubTask } from "../../store/subtask/action/subTasksActions";
import { selectUsers } from "../../store/users/usersSlice";
import Loading from "../layout/Loading";

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  due_date: Yup.string().required("Due date is required"),
  assignees: Yup.array().min(1, "At least one assignee is required"),
  status: Yup.string().required(),
  priority: Yup.string().required(),
});

const SubtaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  due_date: Yup.string().required("Due date is required"),
  assignee_id: Yup.string().required(),
  status: Yup.string().required(),
  priority: Yup.string().required(),
});

const KanbanBoard = ({ tasks }) => {
  console.log("Tasks:", tasks);
  const { id } = useParams();
  const projectId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);

  const initialColumns = {
    not_started: [],
    in_progress: [],
    for_review: [],
    completed: [],
  };

  const [columns, setColumns] = useState(initialColumns);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSubtaskModal, setShowSubtaskModal] = useState(false);
  const [activeColumn, setActiveColumn] = useState("");
  const [activeTask, setActiveTask] = useState(null);

  // Update columns when tasks prop changes
  useEffect(() => {
    const groupedTasks = tasks?.length
      ? tasks.reduce(
          (acc, task) => {
            const columnId = task.status || "not_started";
            if (!acc[columnId]) {
              acc[columnId] = [];
            }
            acc[columnId].push(task);
            return acc;
          },
          { ...initialColumns }
        )
      : { ...initialColumns };
    setColumns(groupedTasks);
  }, [tasks]);

  const userOptions =
    users?.map((u) => ({
      label: u.name,
      value: u.id,
    })) || [];

  const handleOpenTaskModal = (columnId) => {
    setActiveColumn(columnId);
    setShowTaskModal(true);
  };

  const handleOpenSubtaskModal = (task) => {
    setActiveTask(task);
    setShowSubtaskModal(true);
  };

  // Optional: Show loading state if tasks are not yet available
  if (!tasks) {
    return <Loading />;
  }

  return (
    <>
      <BoardContainer>
        {Object.entries(columns).map(([columnId, columnTasks]) => (
          <Column key={columnId}>
            <ColumnHeader>
              {columnId.replace(/_/g, " ").toUpperCase()}
            </ColumnHeader>

            {columnTasks.length > 0 ? (
              columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  onClick={() =>
                    navigate(`/projects/${task.project_id}/tasks/${task.id}`)
                  }
                >
                  <TaskTitle>{task.title}</TaskTitle>
                  {task.subtasks?.length > 0 ? (
                    <SubtaskList>
                      {task.subtasks.map((sub) => (
                        <SubtaskItem
                          key={sub.id}
                          completed={sub.status === "completed"}
                        >
                          {sub.status === "completed" ? "✅" : "🕓"} {sub.title}
                        </SubtaskItem>
                      ))}
                    </SubtaskList>
                  ) : (
                    <div>No subtasks</div> // Optional: Display if no subtasks
                  )}
                  <AddSubtaskButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSubtaskModal(task);
                    }}
                  >
                    + Add Subtask
                  </AddSubtaskButton>
                </TaskCard>
              ))
            ) : (
              <div>No tasks in this column</div> // Optional: Display if no tasks
            )}

            <AddTaskButton onClick={() => handleOpenTaskModal(columnId)}>
              + Add Task
            </AddTaskButton>
          </Column>
        ))}
      </BoardContainer>

      {/* Modal for Adding Task */}
      <CustomModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        title="Add Task"
        bodyContent={
          <Formik
            initialValues={{
              title: "",
              description: "",
              due_date: "",
              assignees: [],
              attachments: [],
              priority: "medium",
              status: activeColumn,
            }}
            validationSchema={TaskSchema}
            onSubmit={(values, { setSubmitting }) => {
              const formData = new FormData();
              for (const key in values) {
                if (Array.isArray(values[key])) {
                  values[key].forEach((val) =>
                    formData.append(`${key}[]`, val)
                  );
                } else {
                  formData.append(key, values[key]);
                }
              }
              dispatch(createTask({ projectId, formData })).then(() => {
                setShowTaskModal(false);
              });
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Field
                  name="title"
                  placeholder="Title"
                  className="form-control mb-2"
                />
                <Field
                  name="description"
                  placeholder="Description"
                  className="form-control mb-2"
                />
                <Field
                  name="due_date"
                  type="date"
                  className="form-control mb-2"
                />
                <Field
                  name="priority"
                  as="select"
                  className="form-control mb-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Field>
                <label className="mb-1">Assignees</label>
                <Select
                  isMulti
                  name="assignees"
                  options={userOptions}
                  className="mb-3"
                  classNamePrefix="select"
                  onChange={(selected) => {
                    setFieldValue(
                      "assignees",
                      selected.map((s) => s.value)
                    );
                  }}
                />
                <input
                  type="file"
                  name="attachments"
                  multiple
                  className="form-control mb-3"
                  onChange={(e) =>
                    setFieldValue("attachments", Array.from(e.target.files))
                  }
                />
                <Button type="submit">Create</Button>
              </Form>
            )}
          </Formik>
        }
      />

      {/* Modal for Adding Subtask */}
      <CustomModal
        show={showSubtaskModal}
        onHide={() => setShowSubtaskModal(false)}
        title="Add Subtask"
        bodyContent={
          <Formik
            initialValues={{
              title: "",
              description: "",
              due_date: "",
              assignee_id: "",
              attachments: [],
              priority: "medium",
              status: "not_started",
            }}
            validationSchema={SubtaskSchema}
            onSubmit={(values, { setSubmitting }) => {
              const formData = new FormData();
              for (const key in values) {
                formData.append(key, values[key]);
              }
              if (values.attachments.length) {
                values.attachments.forEach((f) =>
                  formData.append("attachments[]", f)
                );
              }
              dispatch(
                createSubTask({ taskId: activeTask?.id, formData })
              ).then(() => {
                setShowSubtaskModal(false);
              });
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Field
                  name="title"
                  placeholder="Title"
                  className="form-control mb-2"
                />
                <Field
                  name="description"
                  placeholder="Description"
                  className="form-control mb-2"
                />
                <Field
                  name="due_date"
                  type="date"
                  className="form-control mb-2"
                />
                <Field
                  name="priority"
                  as="select"
                  className="form-control mb-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Field>
                <Field
                  name="assignee_id"
                  as="select" // Use select for consistency
                  className="form-control mb-2"
                >
                  <option value="">Select Assignee</option>
                  {userOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <input
                  type="file"
                  name="attachments"
                  multiple
                  className="form-control mb-3"
                  onChange={(e) =>
                    setFieldValue("attachments", Array.from(e.target.files))
                  }
                />
                <Button type="submit">Add Subtask</Button>
              </Form>
            )}
          </Formik>
        }
      />
    </>
  );
};

export default KanbanBoard;
