// src/pages/tasks/Tasks.jsx
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTemplate from "../../app-template";
import { TasksContainer } from "./styles";
import CustomDataTable from "../../../utils/custom-data-table";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../routes/pathConstants";
import { getTasks } from "../../../store/tasks/action/tasksActions";
import { Form } from "react-bootstrap";
import { StyledFormSelect } from "../projects/CreateProject/createProject.styles";
import { Themes } from "../../../context/themes/themes";
import { selectProjects } from "../../../store/projects/projectsSlice";
import { fetchProjects } from "../../../store/projects/action/projectsActions";
import { selectUsers } from "../../../store/users/usersSlice";

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(Themes);

  const projects = useSelector(selectProjects);
  const users = useSelector(selectUsers);
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.isLoading);
  const error = useSelector((state) => state.tasks.error);
  const { currentPage, totalPages, perPage } = useSelector(
    (state) => state.tasks
  );

  const [projectId, setProjectId] = useState("");

  // 1️⃣ load projects
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // 2️⃣ default to first project when ready
  useEffect(() => {
    if (projects.length && !projectId) {
      setProjectId(projects[0].id);
    }
  }, [projects, projectId]);

  // 3️⃣ fetch tasks on project/page/perPage/filter changes
  const [filters, setFilters] = useState({});
  useEffect(() => {
    if (projectId) {
      dispatch(
        getTasks({ projectId, page: currentPage + 1, perPage, ...filters })
      );
    }
  }, [dispatch, projectId, currentPage, perPage, filters]);

  // pagination handlers
  const handlePageChange = ({ selected }) => {
    dispatch(getTasks({ projectId, page: selected + 1, perPage, ...filters }));
  };
  const handlePerPageChange = (newPerPage) => {
    dispatch(getTasks({ projectId, page: 1, perPage: newPerPage, ...filters }));
  };

  // filter form submission
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    dispatch(getTasks({ projectId, page: 1, perPage, ...newFilters }));
  };

  // project `<select>` change
  const handleChangeProject = (e) => {
    setProjectId(Number(e.target.value));
    setFilters({}); // clear filters when switching project
  };

  // build your filter-config
  const filterConfig = [
    { name: "id", label: "Task ID", type: "search" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "not_started", label: "Not Started" },
        { value: "in_progress", label: "In Progress" },
        { value: "for_review", label: "For Review" },
        { value: "completed", label: "Completed" },
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
      ],
    },
    {
      name: "assignee_id",
      label: "Assignee",
      type: "select",
      options: users.map((u) => ({ value: u.id, label: u.name })),
    },
    {
      name: "user_id",
      label: "Created By",
      type: "select",
      options: users.map((u) => ({ value: u.id, label: u.name })),
    },
  ];

  const columns = [
    { name: "ID", selector: (r) => r.id },
    { name: "Title", selector: (r) => r.title },
    { name: "Status", selector: (r) => r.status },
    { name: "Priority", selector: (r) => r.priority },
    { name: "Due Date", selector: (r) => r.due_date },
    { name: "Assignee", selector: (r) => r.assignee?.name || "-" },
  ];

  return (
    <AppTemplate pageTitle="Tasks" navbar sidebar SEOPageName="Tasks">
      <TasksContainer>
        {/* Project selector */}
        <Form className="mb-4">
          <Form.Group>
            <Form.Label>Project</Form.Label>
            <StyledFormSelect
              theme={theme}
              value={projectId}
              onChange={handleChangeProject}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </StyledFormSelect>
          </Form.Group>
        </Form>

        {/* Data table with filtering enabled */}
        <CustomDataTable
          title="Tasks"
          data={tasks}
          columns={columns}
          isLoading={loading}
          error={error}
          renderActions
          Add
          Link={PathConstants.CreateTask.replace(":projectId", projectId)}
          LinkToEdit="/tasks/edit"
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          filterEnabled
          filterConfig={filterConfig}
          onApplyFilter={handleApplyFilter}
        />
      </TasksContainer>
    </AppTemplate>
  );
};

export default Tasks;
