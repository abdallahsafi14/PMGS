import React, { useEffect, useState } from "react";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { selectSubmissions } from "../../../store/submissions/submissionsSlice";
import {
  fetchSubmissions,
  deleteSubmission,
} from "../../../store/submissions/action/submissionActions";

const SubmissionsPage = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectSubmissions);
  const submissions = data.submissions.data;
  const currentPage = data.currentPage;
  const totalPages = data.totalPages;
  const perPage = data.perPage;
  const loading = data.loading;
  const error = data.error;
  console.log(submissions);

  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);

  const handleDeleteClick = (row) => {
    setSubmissionToDelete(row);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteSubmission(submissionToDelete.id)).then(() => {
      setShowDeleteModal(false);
      setSubmissionToDelete(null);
    });
  };

  useEffect(() => {
    dispatch(fetchSubmissions({ page: 1, perPage }));
  }, [dispatch, perPage]);

  const handlePageChange = ({ selected }) => {
    dispatch(fetchSubmissions({ page: selected + 1, perPage }));
  };

  const handlePerPageChange = (value) => {
    dispatch(fetchSubmissions({ page: 1, perPage: value }));
  };

  const handleView = (row) => {
    setSelectedSubmission(row);
    setShowModal(true);
  };

  const columns = [
    {
      name: "File",
      selector: (row) => row.file_name,
    },
    {
      name: "Submitter ID",
      selector: (row) => row.custom_properties?.submitter_id || "N/A",
    },
    {
      name: "Comment",
      selector: (row) => row.custom_properties?.comment || "-",
    },
    {
      name: "Size (KB)",
      selector: (row) => (row.size / 1024).toFixed(2),
    },
    {
      name: "Submitted At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
    },
  ];

  return (
    <AppTemplate
      pageTitle="Submissions"
      navbar
      sidebar
      SEOPageName="Submission Review"
    >
      <div className="container mt-4">
        <CustomDataTable
          title="Submission Files"
          data={submissions}
          columns={columns}
          isLoading={loading}
          error={error}
          renderActions
          onView={handleView}
          onDelete={handleDeleteClick} // 🔥 Here it is
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />

        {/* Modal for Viewing Submission Details */}
        {selectedSubmission && (
          <CustomModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title={`Submission #${selectedSubmission.id}`}
            bodyContent={
              <div>
                <p>
                  <strong>File Name:</strong> {selectedSubmission.file_name}
                </p>
                <p>
                  <strong>Submitter ID:</strong>{" "}
                  {selectedSubmission.custom_properties?.submitter_id || "N/A"}
                </p>
                <p>
                  <strong>Comment:</strong>{" "}
                  {selectedSubmission.custom_properties?.comment || "-"}
                </p>
                <p>
                  <strong>MIME Type:</strong> {selectedSubmission.mime_type}
                </p>
                <p>
                  <strong>Size:</strong>{" "}
                  {(selectedSubmission.size / 1024).toFixed(2)} KB
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(selectedSubmission.created_at).toLocaleString()}
                </p>

                <a
                  href={selectedSubmission.original_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-primary mt-2"
                >
                  Download File
                </a>
              </div>
            }
            footerContent={<></>}
            buttonProps={{
              bgColor: "#6c757d",
              textColor: "#fff",
              hoverColor: "#5a6268",
            }}
          />
        )}
        {submissionToDelete && (
          <CustomModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            title="Delete Submission"
            bodyContent={
              <p>
                Are you sure you want to delete submission{" "}
                <strong>{submissionToDelete.file_name}</strong>?
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

export default SubmissionsPage;
