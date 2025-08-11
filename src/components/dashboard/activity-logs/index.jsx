import React, { useEffect } from "react";
import { ActivityContainer } from "./styles";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectActivityLogs } from "../../../store/activity-logs/activitySlice";
import { fetchActivityLogs } from "../../../store/activity-logs/action/activityActions";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ActivityLogs = useSelector(selectActivityLogs);
  console.log(ActivityLogs);
  const isLoading = useSelector((state) => state.ActivityLogs.loading);
  const error = useSelector((state) => state.ActivityLogs.error);
  const { currentPage, totalPages, perPage } = useSelector(
    (state) => state.ActivityLogs
  );

  useEffect(() => {
    dispatch(fetchActivityLogs({ page: 1, perPage }));
  }, [dispatch, perPage]);

  const handlePageChange = ({ selected }) => {
    dispatch(fetchActivityLogs({ page: selected + 1, perPage }));
  };

  const handlePerPageChange = (value) => {
    console.log("value", value);
    dispatch(fetchActivityLogs({ page: 1, perPage: value }));
  };

  const handleView = (row) => {
    navigate(`/activity-logs/${row.id}`);
  };

  const columns = [
    {
      name: "Causer",
      selector: (row) => row.causer?.name || "System",
      isFilterable: true,
    },
    {
      name: "Action",
      selector: (row) => row.description,
      isFilterable: true,
    },
    {
      name: "Model",
      selector: (row) => row.subject_type?.split("\\").pop() || "-",
      isFilterable: true,
    },
    {
      name: "Event",
      selector: (row) => row.event,
      isFilterable: true,
    },
    {
      name: "Target Title",
      selector: (row) => row.subject?.title || "-",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
    },
  ];

  return (
    <AppTemplate
      pageTitle="Activity Logs"
      navbar
      sidebar
      SEOPageName="Activity Logs"
    >
      <ActivityContainer>
        <CustomDataTable
          title="Activity Logs"
          data={ActivityLogs}
          columns={columns}
          isLoading={isLoading}
          error={error}
          renderActions={true}
          onView={handleView}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
          onApplyFilter={() => {}}
        />
      </ActivityContainer>
    </AppTemplate>
  );
}

export default Projects;
