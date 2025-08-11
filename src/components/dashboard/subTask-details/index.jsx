import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppTemplate from "../../app-template";
import Loading from "../../layout/Loading";
import {
  TaskContainer,
  TaskHeader,
  TaskMeta,
  TaskSection,
  SectionTitle,
  SubmissionBox,
  CommentBox,
  SubmitButton,
  SubmitForm,
  SubmitInput,
  SubmitLabel,
  SubmitField,
  SubmitSection,
  ErrorMessage,
} from "../TaskDetails/styles";

import { selectSubTask } from "../../../store/subtask/subTasksSlice";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  selectPermissions,
  selectRole,
  selectUser,
} from "../../../store/auth/authSlice";
import {
  approveSubmission,
  getSubTaskById,
  rejectSubmission,
  submitWork,
} from "../../../store/subtask/action/subTasksActions";

const SubtaskDetails = () => {
  const { subtaskId, taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtask = useSelector(selectSubTask);
  const currentUser = useSelector(selectUser);
  const userRole = useSelector(selectRole);
  const permissions = useSelector(selectPermissions);
  console.log("currentUser", currentUser);
  console.log("userRole", userRole);
  console.log("permissions", permissions);

  useEffect(() => {
    if (subtaskId && taskId) {
      dispatch(
        getSubTaskById({ subtaskId: Number(subtaskId), taskId: Number(taskId) })
      );
    }
  }, [dispatch, subtaskId, taskId]);

  const formik = useFormik({
    initialValues: {
      file: null,
      comment: "",
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("attachments[]", values.file);
      formData.append("comment", values.comment || "");
      dispatch(submitWork({ subtaskId, taskId, formData }));
      resetForm();
    },
  });

  const handleApprove = () => {
    dispatch(approveSubmission({ subtaskId, taskId }));
  };

  const handleReject = () => {
    dispatch(rejectSubmission({ subtaskId, taskId }));
  };

  if (!subtask) return <Loading />;

  const isAssignee = currentUser?.id === subtask.assignee_id;
  const isCompleted = subtask.status === "completed";
  const isAdmin = userRole === "admin";
  const canModerate =
    isCompleted && (isAdmin || permissions.includes("manage tasks"));
  const canSubmit = isAssignee && !isCompleted;

  return (
    <AppTemplate pageTitle={`Subtask: ${subtask.title}`} navbar sidebar>
      <TaskContainer>
        <TaskHeader>{subtask.title}</TaskHeader>
        <TaskMeta>
          <div>
            <strong>Status:</strong> {subtask.status}
          </div>
          <div>
            <strong>Priority:</strong> {subtask.priority}
          </div>
          <div>
            <strong>Due Date:</strong> {subtask.due_date}
          </div>
          <div>
            <strong>Created By:</strong> {subtask.creator?.name}
          </div>
          <div>
            <strong>Assignee:</strong> {subtask.assignee?.name}
          </div>
          <div>
            <strong>Task:</strong> Task #{taskId}
          </div>
          <div>
            <strong>Project:</strong> Project #
          </div>
        </TaskMeta>

        <TaskSection>
          <SectionTitle>Description</SectionTitle>
          <p>{subtask.description || "No description provided."}</p>
        </TaskSection>

        <TaskSection>
          <SectionTitle>Submissions</SectionTitle>
          {subtask.media?.length > 0 ? (
            subtask.media.map((file, i) => (
              <SubmissionBox key={file.id || i}>
                📄{" "}
                <a href={file.original_url} target="_blank" rel="noreferrer">
                  {file.file_name}
                </a>{" "}
                {file.custom_properties?.comment && (
                  <em>— {file.custom_properties.comment}</em>
                )}
              </SubmissionBox>
            ))
          ) : (
            <p>No submissions yet.</p>
          )}
        </TaskSection>

        {/* Admin Approve/Reject */}
        {canModerate && (
          <TaskSection>
            <SectionTitle>Moderation</SectionTitle>
            <div className="d-flex gap-3">
              <button className="btn btn-success" onClick={handleApprove}>
                ✅ Approve
              </button>
              <button className="btn btn-danger" onClick={handleReject}>
                ❌ Reject
              </button>
            </div>
          </TaskSection>
        )}

        {/* Submission Form for Assignee */}
        {canSubmit && (
          <TaskSection>
            <SectionTitle>Submit Your Work</SectionTitle>
            <SubmitSection>
              <SubmitForm onSubmit={formik.handleSubmit}>
                <SubmitField>
                  <SubmitLabel htmlFor="file">Upload File</SubmitLabel>
                  <input
                    name="file"
                    type="file"
                    onChange={(e) =>
                      formik.setFieldValue("file", e.currentTarget.files[0])
                    }
                  />
                  {formik.errors.file && formik.touched.file && (
                    <ErrorMessage>{formik.errors.file}</ErrorMessage>
                  )}
                </SubmitField>

                <SubmitField>
                  <SubmitLabel htmlFor="comment">Comment</SubmitLabel>
                  <SubmitInput
                    name="comment"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                  />
                </SubmitField>

                <SubmitButton type="submit">📤 Submit</SubmitButton>
              </SubmitForm>
            </SubmitSection>
          </TaskSection>
        )}

        <TaskSection>
          <SectionTitle>Comments</SectionTitle>
          <CommentBox>No comments available.</CommentBox>
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
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </TaskContainer>
    </AppTemplate>
  );
};

export default SubtaskDetails;
