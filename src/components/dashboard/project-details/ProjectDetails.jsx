// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ProjectContainer,
//   ProjectHeader,
//   ProjectMeta,
//   Section,
//   SectionTitle,
//   MetaItem,
//   Tag,
//   DescriptionBox,
//   TeamList,
//   CommentBox,
//   SubmissionBox,
//   SubtaskList,
//   TaskBox,
// } from "./styles";
// import AppTemplate from "../../app-template";
// import KanbanBoard from "../../KanbanBoard";
// import { useDispatch, useSelector } from "react-redux";
// import { selectProjectDetails } from "../../../store/projects/projectsSlice";
// import {
//   deleteProject,
//   getProjectDetails,
// } from "../../../store/projects/action/projectsActions";
// import { getTasks } from "../../../store/tasks/action/tasksActions";
// import { selectTasks } from "../../../store/tasks/tasksSlice";
// import {
//   createComment,
//   updateComment,
//   deleteComment,
//   fetchComments,
// } from "../../../store/comments/action/commentsActions";
// import { Button } from "react-bootstrap";
// import CustomModal from "../../../utils/custom-modal/CustomModal";
// import { Formik, Field, Form as FormikForm } from "formik";
// import * as Yup from "yup";
// import { selectComments } from "../../../store/comments/commentsSlice";
// import Loading from "../../layout/Loading";

// const ProjectDetails = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const project = useSelector(selectProjectDetails);
//   const tasks = useSelector(selectTasks);
//   const { comments } = useSelector((state) => state.comments);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [editingComment, setEditingComment] = useState(null);
//   const [deleteCommentModal, setDeleteCommentModal] = useState(false);
//   const [commentToDelete, setCommentToDelete] = useState(null);

//   const handleDelete = () => {
//     dispatch(deleteProject(project.id)).then(() => {
//       navigate("/projects");
//     });
//   };

//   useEffect(() => {
//     dispatch(getProjectDetails(id));
//     dispatch(getTasks(id));
//     dispatch(fetchComments(id));
//   }, [dispatch, id]);

//   if (!project) return <Loading />;

//   const CommentSchema = Yup.object().shape({
//     content: Yup.string().required("Comment cannot be empty"),
//   });

//   const handleCommentSubmit = (values, { resetForm }) => {
//     console.log(values);
//     dispatch(createComment({ projectId: project.id, content: values.content }));
//     resetForm();
//   };

//   const handleEditSubmit = (values) => {
//     dispatch(
//       updateComment({
//         projectId: project.id,
//         commentId: editingComment.id,
//         content: values.content, // ✅ Pass content string directly
//       })
//     ).then(() => {
//       setEditModal(false);
//       setEditingComment(null);
//     });
//   };

//   const confirmDeleteComment = () => {
//     dispatch(
//       deleteComment({
//         projectId: project.id,
//         commentId: commentToDelete.id,
//       })
//     ).then(() => {
//       setDeleteCommentModal(false);
//       setCommentToDelete(null);
//     });
//   };

//   return (
//     <AppTemplate
//       pageTitle={`Project: ${project.name}`}
//       navbar
//       sidebar
//       SEOPageName={`Project: ${project.name}`}
//     >
//       <ProjectContainer>
//         <ProjectHeader>{project.name}</ProjectHeader>
//         <ProjectMeta>
//           <MetaItem>
//             <strong>Status:</strong> <Tag>{project.status}</Tag>
//           </MetaItem>
//           <MetaItem>
//             <strong>Priority:</strong> <Tag>{project.priority}</Tag>
//           </MetaItem>
//           <MetaItem>
//             <strong>Start:</strong> {project.start_date}
//           </MetaItem>
//           <MetaItem>
//             <strong>End:</strong> {project.end_date}
//           </MetaItem>
//           <MetaItem>
//             <strong>Attachment:</strong>{" "}
//             <a
//               href={`/${project.attachments}`}
//               target="_blank"
//               rel="noreferrer"
//             >
//               View
//             </a>
//           </MetaItem>
//         </ProjectMeta>

//         <Section>
//           <SectionTitle>Description</SectionTitle>
//           <DescriptionBox>{project.description}</DescriptionBox>
//         </Section>

//         <Section>
//           <SectionTitle>Tasks</SectionTitle>
//           <KanbanBoard tasks={tasks} />
//         </Section>

//         <Section>
//           <SectionTitle>Team Members</SectionTitle>
//           <TeamList>
//             {project.team_members.map((user) => (
//               <li key={user.id}>
//                 {user.name} - <small>{user.email}</small>
//               </li>
//             ))}
//           </TeamList>
//         </Section>

//         <Section>
//           <SectionTitle>Comments</SectionTitle>

//           {/* ➕ Add Comment Form */}
//           <Formik
//             initialValues={{ content: "" }}
//             validationSchema={CommentSchema}
//             onSubmit={handleCommentSubmit}
//           >
//             {({ errors, touched }) => (
//               <FormikForm>
//                 <div className="mb-3">
//                   <Field
//                     name="content"
//                     as="textarea"
//                     placeholder="Write a comment..."
//                     className="form-control"
//                     rows={3}
//                   />
//                   {errors.content && touched.content && (
//                     <div className="text-danger">{errors.content}</div>
//                   )}
//                 </div>
//                 <Button type="submit" variant="primary" size="sm">
//                   Submit Comment
//                 </Button>
//               </FormikForm>
//             )}
//           </Formik>

//           {/* 📝 Comment List */}
//           <div className="mt-4">
//             {comments?.data?.length > 0 ? (
//               comments.data.map((comment) => (
//                 <CommentBox key={comment.id}>
//                   <div className="me-4">
//                     <strong>{comment.user?.name || "Unknown"}:</strong>{" "}
//                     {comment.content}
//                   </div>
//                   <div className="mt-2 d-flex gap-2">
//                     <Button
//                       size="sm"
//                       variant="outline-secondary"
//                       onClick={() => {
//                         setEditingComment(comment);
//                         setEditModal(true);
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline-danger"
//                       onClick={() => {
//                         setCommentToDelete(comment);
//                         setDeleteCommentModal(true);
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </CommentBox>
//               ))
//             ) : (
//               <p>No comments yet.</p>
//             )}
//           </div>
//         </Section>

//         <Section>
//           <SectionTitle>Danger Zone</SectionTitle>
//           <button
//             style={{
//               backgroundColor: "#dc3545",
//               color: "white",
//               padding: "10px 15px",
//               borderRadius: "6px",
//               border: "none",
//               cursor: "pointer",
//             }}
//             onClick={() => setShowDeleteModal(true)}
//           >
//             Delete Project
//           </button>
//         </Section>

//         {/* 🧨 Delete Project Modal */}
//         <CustomModal
//           show={showDeleteModal}
//           onHide={() => setShowDeleteModal(false)}
//           title="Confirm Delete"
//           bodyContent={<p>Are you sure you want to delete this project?</p>}
//           footerContent={
//             <Button variant="danger" onClick={handleDelete}>
//               Yes, Delete
//             </Button>
//           }
//           headerBg="#dc3545"
//           headerColor="white"
//           bodyBg="#fff0f0"
//           footerBg="#f8d7da"
//           buttonProps={{
//             bgColor: "#6c757d",
//             textColor: "white",
//             hoverColor: "#5a6268",
//           }}
//         />

//         {/* 🛠️ Edit Comment Modal */}
//         {editingComment && (
//           <CustomModal
//             show={editModal}
//             onHide={() => {
//               setEditModal(false);
//               setEditingComment(null);
//             }}
//             title="Edit Comment"
//             bodyContent={
//               <Formik
//                 initialValues={{ content: editingComment.content }}
//                 validationSchema={CommentSchema}
//                 onSubmit={handleEditSubmit}
//               >
//                 {({ errors, touched }) => (
//                   <FormikForm>
//                     <Field
//                       name="content"
//                       as="textarea"
//                       className="form-control"
//                       rows={4}
//                     />
//                     {errors.content && touched.content && (
//                       <div className="text-danger mt-2">{errors.content}</div>
//                     )}
//                     <div className="mt-3">
//                       <Button type="submit" variant="success">
//                         Update Comment
//                       </Button>
//                     </div>
//                   </FormikForm>
//                 )}
//               </Formik>
//             }
//             footerContent={null}
//             buttonProps={{
//               bgColor: "#6c757d",
//               textColor: "#fff",
//               hoverColor: "#5a6268",
//             }}
//           />
//         )}

//         {/* ❌ Delete Comment Modal */}
//         {commentToDelete && (
//           <CustomModal
//             show={deleteCommentModal}
//             onHide={() => setDeleteCommentModal(false)}
//             title="Delete Comment"
//             bodyContent={
//               <p>
//                 Are you sure you want to delete comment:{" "}
//                 <em>{commentToDelete.content}</em>?
//               </p>
//             }
//             footerContent={
//               <Button variant="danger" onClick={confirmDeleteComment}>
//                 Confirm Delete
//               </Button>
//             }
//             buttonProps={{
//               bgColor: "#6c757d",
//               textColor: "#fff",
//               hoverColor: "#5a6268",
//             }}
//           />
//         )}
//       </ProjectContainer>
//     </AppTemplate>
//   );
// };

// export default ProjectDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Header,
  MetaGrid,
  MetaItem,
  Tag,
  Section,
  SectionTitle,
  Description,
  TeamList,
  CommentBox,
  StyledButton,
} from "./styles";
import AppTemplate from "../../app-template";
import KanbanBoard from "../../KanbanBoard";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectDetails } from "../../../store/projects/projectsSlice";
import {
  getProjectDetails,
  deleteProject,
} from "../../../store/projects/action/projectsActions";
import { getTasks } from "../../../store/tasks/action/tasksActions";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../../store/comments/action/commentsActions";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import Loading from "../../layout/Loading";
import { selectTasks } from "../../../store/tasks/tasksSlice";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: Id } = useParams();
  const projectId = Number(Id);

  const project = useSelector(selectProjectDetails);
  const tasks = useSelector(selectTasks);
  const comments = useSelector((state) => state.comments.comments);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [deleteCommentModal, setDeleteCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    dispatch(getProjectDetails(projectId));
    dispatch(getTasks({ projectId }));
    dispatch(fetchComments(projectId));
  }, [dispatch, projectId]);

  const CommentSchema = Yup.object().shape({
    content: Yup.string().required("Comment cannot be empty"),
  });

  const handleCommentSubmit = (values, { resetForm }) => {
    dispatch(createComment({ projectId: project.id, content: values.content }));
    resetForm();
  };

  const handleEditSubmit = (values) => {
    dispatch(
      updateComment({
        projectId: project.id,
        commentId: editingComment.id,
        content: values.content,
      })
    ).then(() => {
      setEditModal(false);
      setEditingComment(null);
    });
  };

  const confirmDeleteComment = () => {
    dispatch(
      deleteComment({ projectId: project.id, commentId: commentToDelete.id })
    ).then(() => {
      setDeleteCommentModal(false);
      setCommentToDelete(null);
    });
  };

  const handleDelete = () => {
    dispatch(deleteProject(project.id)).then(() => {
      navigate("/projects");
    });
  };

  if (!project) return <Loading />;

  return (
    <AppTemplate
      pageTitle={`Project: ${project.name}`}
      navbar
      sidebar
      SEOPageName={`Project: ${project.name}`}
    >
      <Container>
        <Header>{project.name}</Header>

        <MetaGrid>
          <MetaItem>
            <strong>Status:</strong> <Tag>{project.status}</Tag>
          </MetaItem>
          <MetaItem>
            <strong>Priority:</strong> <Tag>{project.priority}</Tag>
          </MetaItem>
          <MetaItem>
            <strong>Start Date:</strong> {project.start_date}
          </MetaItem>
          <MetaItem>
            <strong>End Date:</strong> {project.end_date}
          </MetaItem>
          {project.attachments && (
            <MetaItem>
              <strong>Attachment:</strong>{" "}
              <a
                href={`/${project.attachments}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            </MetaItem>
          )}
        </MetaGrid>

        <Section>
          <SectionTitle>Description</SectionTitle>
          <Description>{project.description}</Description>
        </Section>

        <Section>
          <SectionTitle>Tasks</SectionTitle>
          <KanbanBoard tasks={tasks} />
        </Section>

        <Section>
          <SectionTitle>Team Members</SectionTitle>
          <TeamList>
            {project.team_members.map((user) => (
              <li key={user.id}>
                {user.name} - <small>{user.email}</small>
              </li>
            ))}
          </TeamList>
        </Section>

        <Section>
          <SectionTitle>Comments</SectionTitle>

          <Formik
            initialValues={{ content: "" }}
            validationSchema={CommentSchema}
            onSubmit={handleCommentSubmit}
          >
            {({ errors, touched }) => (
              <FormikForm>
                <Field
                  name="content"
                  as="textarea"
                  placeholder="Write a comment..."
                  className="form-control mb-2"
                  rows={3}
                />
                {errors.content && touched.content && (
                  <div className="text-danger mb-2">{errors.content}</div>
                )}
                <StyledButton type="submit">Add Comment</StyledButton>
              </FormikForm>
            )}
          </Formik>

          <div className="mt-4">
            {comments?.data?.length > 0 ? (
              comments.data.map((comment) => (
                <CommentBox key={comment.id}>
                  <div>
                    <strong>{comment.user?.name || "User"}:</strong>{" "}
                    {comment.content}
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <StyledButton
                      variant="outline"
                      onClick={() => {
                        setEditingComment(comment);
                        setEditModal(true);
                      }}
                    >
                      Edit
                    </StyledButton>
                    <StyledButton
                      variant="danger"
                      onClick={() => {
                        setCommentToDelete(comment);
                        setDeleteCommentModal(true);
                      }}
                    >
                      Delete
                    </StyledButton>
                  </div>
                </CommentBox>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </Section>

        <Section>
          <SectionTitle>Danger Zone</SectionTitle>
          <StyledButton
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Project
          </StyledButton>
        </Section>

        <CustomModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          title="Confirm Delete"
          bodyContent={<p>Are you sure you want to delete this project?</p>}
          footerContent={
            <StyledButton variant="danger" onClick={handleDelete}>
              Yes, Delete
            </StyledButton>
          }
        />

        {editingComment && (
          <CustomModal
            show={editModal}
            onHide={() => {
              setEditModal(false);
              setEditingComment(null);
            }}
            title="Edit Comment"
            bodyContent={
              <Formik
                initialValues={{ content: editingComment.content }}
                validationSchema={CommentSchema}
                onSubmit={handleEditSubmit}
              >
                {({ errors, touched }) => (
                  <FormikForm>
                    <Field
                      name="content"
                      as="textarea"
                      className="form-control"
                      rows={4}
                    />
                    {errors.content && touched.content && (
                      <div className="text-danger mt-2">{errors.content}</div>
                    )}
                    <div className="mt-3">
                      <StyledButton type="submit">Update</StyledButton>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            }
          />
        )}

        {commentToDelete && (
          <CustomModal
            show={deleteCommentModal}
            onHide={() => setDeleteCommentModal(false)}
            title="Delete Comment"
            bodyContent={<p>Are you sure you want to delete this comment?</p>}
            footerContent={
              <StyledButton variant="danger" onClick={confirmDeleteComment}>
                Confirm Delete
              </StyledButton>
            }
          />
        )}
      </Container>
    </AppTemplate>
  );
};

export default ProjectDetails;
