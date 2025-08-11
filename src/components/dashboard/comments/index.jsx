import React, { useEffect, useState } from "react";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { selectComments } from "../../../store/comments/commentsSlice";
import {
  deleteComment,
  fetchComments,
} from "../../../store/comments/action/commentsActions";
import Select from "react-select";
import { selectProjects } from "../../../store/projects/projectsSlice";
import { StyledReactSelect } from "../projects/CreateProject/createProject.styles";

const CommentsPage = () => {
  const dispatch = useDispatch();
  const { comments, currentPage, totalPages, perPage, loading, error } =
    useSelector((state) => state.comments);
  const projects = useSelector(selectProjects);
  console.log("comment s", comments.data);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  //   show modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [commentToView, setCommentToView] = useState(null);

  // Fetch comments for selected project
  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchComments(selectedProject.id));
    }
  }, [dispatch, selectedProject]);

  const handleDeleteClick = (row) => {
    setCommentToDelete(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(
      deleteComment({
        projectId: selectedProject.id,
        commentId: commentToDelete.id,
      })
    )
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
      });
  };

  const handlePageChange = ({ selected }) => {
    dispatch(fetchComments(selectedProject.id, { page: selected + 1 }));
  };

  const handlePerPageChange = (value) => {
    dispatch(fetchComments(selectedProject.id, { page: 1, perPage: value }));
  };

  const projectOptions = projects.map((proj) => ({
    label: proj.name,
    value: proj.id,
  }));

  const columns = [
    { name: "ID", selector: (row) => row.id },
    { name: "Comment", selector: (row) => row.content },
    {
      name: "User",
      selector: (row) => row.user?.name || "Unknown",
    },
    {
      name: "Commented On",
      selector: (row) =>
        `${row.commentable_type?.split("\\").pop()} #${row.commentable_id}`,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
    },
  ];

  return (
    <AppTemplate
      pageTitle="Project Comments"
      navbar
      sidebar
      SEOPageName="Project Comments"
    >
      <div className="container mt-4">
        <div className="mb-4" style={{ maxWidth: 300 }}>
          <StyledReactSelect
            options={projectOptions}
            value={
              selectedProject
                ? { label: selectedProject.name, value: selectedProject.id }
                : null
            }
            onChange={(selected) => {
              const proj = projects.find((p) => p.id === selected.value);
              setSelectedProject(proj);
            }}
            placeholder="Select Project..."
          />
        </div>

        {selectedProject ? (
          <CustomDataTable
            title={`Comments for: ${selectedProject.name}`}
            data={comments.data}
            columns={columns}
            isLoading={loading}
            error={error}
            renderActions
            onView={(row) => {
              setCommentToView(row);
              setShowViewModal(true);
            }}
            onDelete={handleDeleteClick}
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        ) : (
          <p>Please select a project to view comments.</p>
        )}

        {commentToView && (
          <CustomModal
            show={showViewModal}
            onHide={() => setShowViewModal(false)}
            title={`Comment #${commentToView.id}`}
            bodyContent={
              <div>
                <p>
                  <strong>Content:</strong> {commentToView.content}
                </p>
                <p>
                  <strong>User:</strong> {commentToView.user?.name || "Unknown"}
                </p>
                <p>
                  <strong>Email:</strong> {commentToView.user?.email || "N/A"}
                </p>

                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(commentToView.created_at).toLocaleString()}
                </p>
              </div>
            }
            footerContent={null}
            buttonProps={{
              bgColor: "#6c757d",
              textColor: "#fff",
              hoverColor: "#5a6268",
            }}
          />
        )}

        {commentToDelete && (
          <CustomModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            title="Delete Comment"
            bodyContent={
              <p>
                Are you sure you want to delete comment:{" "}
                <em>{commentToDelete.content}</em>?
              </p>
            }
            footerContent={
              <button className="btn btn-danger" onClick={confirmDelete}>
                Confirm Delete
              </button>
            }
            buttonProps={{
              bgColor: "#6c757d",
              textColor: "#fff",
              hoverColor: "#5a6268",
            }}
          />
        )}
      </div>
    </AppTemplate>
  );
};

export default CommentsPage;
