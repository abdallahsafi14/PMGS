// import React, { useEffect } from "react";
// import { ProjectsContainer } from "./styles";
// import AppTemplate from "../../app-template";
// import CustomDataTable from "../../../utils/custom-data-table";
// import { useDispatch, useSelector } from "react-redux";
// import PathConstants from "../../../routes/pathConstants";
// import { useNavigate } from "react-router-dom";

// import { selectProjects } from "../../../store/projects/projectsSlice";
// import { fetchProjects } from "../../../store/projects/action/projectsActions";

// function Projects() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const projects = useSelector(selectProjects);
//   const isLoading = useSelector((state) => state.projects.loading);
//   const error = useSelector((state) => state.projects.error);
//   const { currentPage, totalPages, perPage } = useSelector(
//     (state) => state.projects
//   );

//   useEffect(() => {
//     dispatch(fetchProjects({ page: 1, perPage }));
//   }, [dispatch, perPage]);

//   const handlePageChange = ({ selected }) => {
//     dispatch(fetchProjects({ page: selected + 1, perPage }));
//     a;
//   };

//   const handlePerPageChange = (value) => {
//     console.log("object", value);
//     dispatch(fetchProjects({ page: 1, perPage: value }));
//   };

//   const handleView = (row) => {
//     navigate(`/projects/${row.id}`);
//   };

//   const handleEdit = (project) => {
//     navigate(`/projects/edit/${project.id}`, { state: { project } });
//   };

//   const columns = [
//     { name: "Name", selector: (row) => row.name, isFilterable: true },
//     { name: "Status", selector: (row) => row.status, isFilterable: true },
//     { name: "Priority", selector: (row) => row.priority, isFilterable: true },
//     { name: "Start Date", selector: (row) => row.start_date },
//     { name: "End Date", selector: (row) => row.end_date },
//     {
//       name: "Team Members",
//       selector: (row) => row.team_members?.map((m) => m.name).join(", ") || "-",
//     },
//   ];

//   return (
//     <AppTemplate pageTitle="Projects" navbar sidebar SEOPageName="Projects">
//       <ProjectsContainer>
//         <CustomDataTable
//           title="Projects"
//           data={projects}
//           columns={columns}
//           isLoading={isLoading}
//           error={error}
//           renderActions={true}
//           onView={handleView}
//           onEdit={handleEdit}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//           onPerPageChange={handlePerPageChange}
//           perPage={perPage}
//           onApplyFilter={() => {}}
//           Add={true}
//           Link={PathConstants.CreateProject}
//           LinkToEdit="/projects/edit"
//         />
//       </ProjectsContainer>
//     </AppTemplate>
//   );
// }

// export default Projects;
// src/pages/projects/Projects.jsx
import React, { useEffect } from "react";
import { ProjectsContainer } from "./styles";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import { useDispatch, useSelector } from "react-redux";
import PathConstants from "../../../routes/pathConstants";
import { useNavigate } from "react-router-dom";

import { selectProjects } from "../../../store/projects/projectsSlice";
import { fetchProjects } from "../../../store/projects/action/projectsActions";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector(selectProjects);
  const isLoading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);
  const { currentPage, totalPages, perPage } = useSelector(
    (state) => state.projects
  );

  // initial fetch + whenever perPage changes
  useEffect(() => {
    dispatch(fetchProjects({ page: 1, perPage }));
  }, [dispatch, perPage]);

  const handlePageChange = ({ selected }) => {
    dispatch(fetchProjects({ page: selected + 1, perPage }));
  };

  const handlePerPageChange = (value) => {
    dispatch(fetchProjects({ page: 1, perPage: value }));
  };

  const handleView = (row) => {
    navigate(`/projects/${row.id}`);
  };

  const handleEdit = (project) => {
    navigate(`/projects/edit/${project.id}`, { state: { project } });
  };

  const handleApplyFilter = (filters) => {
    // filters = { status: "...", priority: "..." }
    console.log(filters);
    dispatch(fetchProjects({ page: 1, perPage, ...filters }));
  };

  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Status", selector: (row) => row.status },
    { name: "Priority", selector: (row) => row.priority },
    { name: "Start Date", selector: (row) => row.start_date },
    { name: "End Date", selector: (row) => row.end_date },
    {
      name: "Team Members",
      selector: (row) => row.team_members?.map((m) => m.name).join(", ") || "-",
    },
  ];

  // define filter fields:
  const filterConfig = [
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "planning", label: "Planning" },
        { value: "active", label: "Active" },
        { value: "on_hold", label: "On Hold" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" },
      ],
    },
  ];

  return (
    <AppTemplate pageTitle="Projects" navbar sidebar SEOPageName="Projects">
      <ProjectsContainer>
        <CustomDataTable
          title="Projects"
          data={projects}
          columns={columns}
          isLoading={isLoading}
          error={error}
          renderActions
          Add
          Link={PathConstants.CreateProject}
          LinkToEdit="/projects/edit"
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          filterEnabled
          filterConfig={filterConfig}
          onApplyFilter={handleApplyFilter}
          onView={handleView}
          onEdit={handleEdit}
        />
      </ProjectsContainer>
    </AppTemplate>
  );
};

export default Projects;
