// src/components/tasks/TaskDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskById,
  deleteTask,
} from "../../../store/tasks/action/tasksActions";
import {
  createSubTask,
  deleteSubTask,
  getSubTasks,
  updateSubTask,
} from "../../../store/subtask/action/subTasksActions";
import { selectTask } from "../../../store/tasks/tasksSlice";
import { selectSubTasks } from "../../../store/subtask/subTasksSlice";
import { selectUsers } from "../../../store/users/usersSlice";
import AppTemplate from "../../app-template";
import FormModal from "../../../utils/custom-modal/FormModal";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import Loading from "../../layout/Loading";
import {
  TaskContainer,
  TaskHeader,
  TaskMeta,
  TaskSection,
  SectionTitle,
  SubtaskList,
  SubtaskItem,
  SubmissionBox,
  CommentBox,
  SubmitButton,
  SubmitInput,
  SubmitLabel,
  SubmitField,
  ErrorMessage,
  SubmitForm,
  SubmitSection,
} from "./styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const currentUser = "Ahmed Ali";

const SubmitFileSchema = Yup.object().shape({
  file: Yup.string().required("File is required"),
  notes: Yup.string(),
});

const TaskDetails = () => {
  const { id, projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector(selectTask);
  const users = useSelector(selectUsers);
  const subTasks = useSelector(selectSubTasks);
  console.log(subTasks);

  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSubtask, setEditSubtask] = useState(null);

  useEffect(() => {
    if (id && projectId) {
      dispatch(
        getTaskById({ taskId: Number(id), projectId: Number(projectId) })
      );
      dispatch(getSubTasks(Number(id)));
    }
  }, [id, projectId, dispatch]);

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: Number(id), projectId: Number(projectId) }))
      .unwrap()
      .then(() => navigate("/tasks"));
  };
  const handleDeleteSubtask = () => {
    dispatch(deleteSubTask(Number(id)));
  };

  const handleFileSubmit = (values, { resetForm }) => {
    console.log("Simulated File Submission:", values);
    resetForm();
  };

  const teamOptions = users.map((u) => ({
    value: u.id,
    label: `${u.name} (${u.email})`,
  }));

  const handleCreateSubtask = (values, { resetForm }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "attachments" && value?.length) {
        value.forEach((file, i) => formData.append(`attachments[${i}]`, file));
      } else {
        formData.append(key, value);
      }
    });
    dispatch(createSubTask({ taskId: task.id, formData }));
    resetForm();
    setShowCreateModal(false);
  };

  const handleUpdateSubtask = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    dispatch(
      updateSubTask({ taskId: task.id, subtaskId: editSubtask.id, formData })
    );
    resetForm();
    setShowEditModal(false);
  };

  if (!task) return <Loading />;

  return (
    <AppTemplate pageTitle={`Task: ${task.title}`} navbar sidebar>
      <TaskContainer>
        <TaskHeader>{task.title}</TaskHeader>
        <TaskMeta>
          <div>
            <strong>Status:</strong> {task.status}
          </div>
          <div>
            <strong>Priority:</strong> {task.priority}
          </div>
          <div>
            <strong>Due Date:</strong> {task.due_date}
          </div>
          <div>
            <strong>Created By:</strong> {task.creator?.name}
          </div>
          <div>
            <strong>Project:</strong> {task.project?.name}
          </div>
          <div>
            <strong>Assigned To:</strong>{" "}
            {task.assignees?.map((u) => u.name).join(", ") || "Unassigned"}
          </div>
        </TaskMeta>

        <TaskSection>
          <SectionTitle>Description</SectionTitle>
          <p>{task.description || "No description provided."}</p>
        </TaskSection>

        <TaskSection>
          <SectionTitle>Subtasks</SectionTitle>
          {subTasks?.length > 0 ? (
            <SubtaskList>
              {subTasks.map((sub) => (
                <SubtaskItem
                  key={sub.id}
                  completed={sub.status === "completed"}
                >
                  <div>
                    <strong>{sub.title}</strong> - {sub.status} (Due:{" "}
                    {sub.due_date})
                  </div>
                  <div
                    // style={{
                    //   display: "flex",
                    //   justifyContent: "flex-start",
                    //   alignItems: "center",
                    // }}
                    className="d-flex align-items-center justify-center mt-2"
                  >
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => {
                        setEditSubtask(sub);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        border: "none",
                        color: "#fff",
                        padding: "4px 8px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowModal(true)}
                    >
                      Delete SubTask
                    </button>
                  </div>
                  <CustomModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title="Delete Task"
                    bodyContent={
                      <p>Are you sure you want to delete this subTask?</p>
                    }
                    footerContent={
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={handleDeleteSubtask}
                      >
                        Confirm Delete
                      </button>
                    }
                    buttonProps={{
                      bgColor: "#6c757d",
                      textColor: "white",
                      hoverColor: "#5a6268",
                    }}
                  />
                </SubtaskItem>
              ))}
            </SubtaskList>
          ) : (
            <p>No subtasks available.</p>
          )}
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Add Subtask
          </button>
        </TaskSection>

        <FormModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          title="Create Subtask"
          initialValues={{
            title: "",
            description: "",
            priority: "medium",
            status: "not_started",
            assignee_id: "",
            due_date: "",
            attachments: [],
          }}
          validationSchema={Yup.object({
            title: Yup.string().required(),
            priority: Yup.string().required(),
            status: Yup.string().required(),
            due_date: Yup.string().required(),
          })}
          formFields={[
            { name: "title", type: "text", label: "Title" },
            { name: "description", type: "textarea", label: "Description" },
            {
              name: "priority",
              type: "select",
              label: "Priority",
              options: ["low", "medium", "high"],
            },
            {
              name: "status",
              type: "select",
              label: "Status",
              options: [
                "not_started",
                "in_progress",
                "for_review",
                "completed",
              ],
            },
            { name: "due_date", type: "date", label: "Due Date" },
            {
              name: "assignee_id",
              type: "select",
              label: "Assignee",
              options: teamOptions,
            },
            {
              name: "attachments",
              type: "file",
              label: "Attachments",
              multiple: true,
            },
          ]}
          onSubmit={handleCreateSubtask}
        />

        {editSubtask && (
          <FormModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            title="Edit Subtask"
            initialValues={editSubtask}
            formFields={[
              { name: "title", type: "text", label: "Title" },
              { name: "description", type: "textarea", label: "Description" },
              {
                name: "priority",
                type: "select",
                label: "Priority",
                options: ["low", "medium", "high"],
              },
              {
                name: "status",
                type: "select",
                label: "Status",
                options: [
                  "not_started",
                  "in_progress",
                  "for_review",
                  "completed",
                ],
              },
              { name: "due_date", type: "date", label: "Due Date" },
              {
                name: "assignee_id",
                type: "select",
                label: "Assignee",
                options: teamOptions,
              },
            ]}
            onSubmit={handleUpdateSubtask}
          />
        )}

        <TaskSection>
          <SectionTitle>Submissions</SectionTitle>
          {task.media?.length > 0 ? (
            task.media.map((file, i) => (
              <SubmissionBox key={i}>
                📄{" "}
                <a href={file.original_url} target="_blank" rel="noreferrer">
                  {file.file_name}
                </a>
              </SubmissionBox>
            ))
          ) : (
            <p>No submissions yet.</p>
          )}
        </TaskSection>

        {task.assignees?.some((u) => u.name === currentUser) && (
          <TaskSection>
            <SectionTitle>Submit File</SectionTitle>
            <SubmitSection>
              <Formik
                initialValues={{ file: "", notes: "" }}
                validationSchema={SubmitFileSchema}
                onSubmit={handleFileSubmit}
              >
                {({ errors, touched }) => (
                  <SubmitForm as={Form}>
                    <SubmitField>
                      <SubmitLabel>File</SubmitLabel>
                      <Field
                        name="file"
                        as={SubmitInput}
                        placeholder="example.pdf"
                      />
                      {errors.file && touched.file && (
                        <ErrorMessage>{errors.file}</ErrorMessage>
                      )}
                    </SubmitField>
                    <SubmitField>
                      <SubmitLabel>Notes</SubmitLabel>
                      <Field
                        name="notes"
                        as={SubmitInput}
                        placeholder="Optional notes"
                      />
                    </SubmitField>
                    <SubmitButton type="submit">Submit</SubmitButton>
                  </SubmitForm>
                )}
              </Formik>
            </SubmitSection>
          </TaskSection>
        )}

        <TaskSection>
          <SectionTitle>Comments</SectionTitle>
          {task.comments?.length > 0 ? (
            task.comments.map((c, i) => (
              <CommentBox key={i}>
                <strong>{c.user}</strong>: {c.text}
              </CommentBox>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </TaskSection>

        <div style={{ marginTop: "2rem" }}>
          <button
            style={{
              backgroundColor: "#dc3545",
              border: "none",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => setShowModal(true)}
          >
            Delete Task
          </button>
          <CustomModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title="Delete Task"
            bodyContent={<p>Are you sure you want to delete this task?</p>}
            footerContent={
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
            }
            buttonProps={{
              bgColor: "#6c757d",
              textColor: "white",
              hoverColor: "#5a6268",
            }}
          />
        </div>
      </TaskContainer>
    </AppTemplate>
  );
};

export default TaskDetails;
