import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import { Form } from "react-bootstrap";
import { getTasks } from "../../../store/tasks/action/tasksActions";
import { selectProjects } from "../../../store/projects/projectsSlice";
import { getSubTasks } from "../../../store/subtask/action/subTasksActions";
import { selectTasks } from "../../../store/tasks/tasksSlice";
import { fetchProjects } from "../../../store/projects/action/projectsActions";
import { useNavigate } from "react-router-dom";
import { StyledFormSelect } from "../projects/CreateProject/createProject.styles";

const Subtasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector(selectProjects);
  const tasks = useSelector(selectTasks);
  const subtasks = useSelector((state) => state.subTasks.subTasks);
  console.log(subtasks);
  const loading = useSelector((state) => state.subTasks.loading);
  const error = useSelector((state) => state.subTasks.error);
  const { currentPage, perPage, totalPages } = useSelector(
    (state) => state.subTasks
  );
  console.log(currentPage, perPage, totalPages);

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    dispatch(fetchProjects({ page: currentPage, perPage: 10 }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (selectedProject) {
      dispatch(
        getTasks({ projectId: selectedProject, page: currentPage, perPage: 10 })
      );
      setSelectedTask("");
    }
  }, [selectedProject, dispatch, currentPage]);

  useEffect(() => {
    if (selectedTask) {
      dispatch(
        getSubTasks({ taskId: selectedTask, page: currentPage, perPage })
      );
    }
  }, [selectedTask, dispatch, perPage, currentPage]);

  const handlePageChange = ({ selected }) => {
    const page = selected + 1;
    dispatch(getSubTasks({ taskId: selectedTask, page, perPage }));
  };

  const handlePerPageChange = (newPerPage) => {
    dispatch(
      getSubTasks({ taskId: selectedTask, page: 1, perPage: newPerPage })
    );
  };

  const columns = [
    { name: "Title", selector: (row) => row.title },
    { name: "Status", selector: (row) => row.status },
    { name: "Priority", selector: (row) => row.priority },
    { name: "Due Date", selector: (row) => row.due_date },
    {
      name: "Assignee",
      selector: (row) => row.assignee?.name || "N/A",
    },
  ];

  const handleView = (row) => {
    navigate(`/tasks/${row.task_id}/subtasks/${row.id}`);
  };

  return (
    <AppTemplate pageTitle="Subtasks" navbar sidebar>
      <div className="container mt-4">
        <h3 className="mb-4">View Subtasks</h3>

        <Form.Group className="mb-3">
          <StyledFormSelect
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.name}
              </option>
            ))}
          </StyledFormSelect>
        </Form.Group>

        {selectedProject && (
          <Form.Group className="mb-4">
            <Form.Label>Select Task</Form.Label>
            <StyledFormSelect
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              disabled={!selectedProject}
            >
              <option value="">Select Task</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </StyledFormSelect>
          </Form.Group>
        )}

        {selectedTask && (
          <CustomDataTable
            title="Subtasks"
            data={subtasks}
            columns={columns}
            isLoading={loading}
            error={error}
            renderActions={true}
            onView={handleView}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
          />
        )}
      </div>
    </AppTemplate>
  );
};

export default Subtasks;
