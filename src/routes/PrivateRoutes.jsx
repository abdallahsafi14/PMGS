import { Children } from "react";
import PathConstants from "./pathConstants";
import ForYou from "../components/dashboard/for-you";
import PermissionRoute from "./PermissionRoute";
import Projects from "../components/dashboard/projects";
import ProjectDetails from "../components/dashboard/project-details/ProjectDetails";
import Tasks from "../components/dashboard/Tasks";
import TaskDetails from "../components/dashboard/TaskDetails/TaskDetails";
import CreateTask from "../components/dashboard/Tasks/CreateTask/CreateTask";
import CreateProject from "../components/dashboard/projects/CreateProject/CreateProject";
import EditTask from "../components/dashboard/Tasks/UpdateTask";
import EditProject from "../components/dashboard/projects/UpdateProject";
import NotificationsPage from "../components/dashboard/notifications";
import SubmissionsPage from "../components/dashboard/submission";
import UsersPage from "../components/dashboard/user management";
import ViewUser from "../components/dashboard/user management/view-user";
import EditUser from "../components/dashboard/user management/edit-user";
import RolesPage from "../components/dashboard/roles";
import PermissionsPage from "../components/dashboard/permissions";
import ActivityLogPage from "../components/dashboard/activity-logs";
import AttachmentsPage from "../components/dashboard/attachments";
import Subtasks from "../components/dashboard/subTasks";
import ActivityLogDetails from "../components/dashboard/activity-logs/logsDetails";
import CommentsPage from "../components/dashboard/comments";
import SubtaskDetails from "../components/dashboard/subTask-details";

const PrivateRoutes = [
  // Routes that require "manage projects" permission
  {
    element: <PermissionRoute requiredPermissions={["manage projects"]} />,
    children: [
      {
        path: PathConstants.Projects,
        element: <Projects />,
      },
      {
        path: PathConstants.ProjectDetails,
        element: <ProjectDetails />,
      },
      {
        path: PathConstants.CreateProject,
        element: <CreateProject />,
      },
      {
        path: PathConstants.UpdateProject,
        element: <EditProject />,
      },
    ],
  },

  // Routes that require "manage tasks" permission
  {
    element: <PermissionRoute requiredPermissions={["manage tasks"]} />,
    children: [
      {
        path: PathConstants.Tasks,
        element: <Tasks />,
      },
      {
        path: PathConstants.TaskDetails,
        element: <TaskDetails />,
      },
      {
        path: PathConstants.CreateTask,
        element: <CreateTask />,
      },
      {
        path: PathConstants.UpdateTask,
        element: <EditTask />,
      },
      {
        path: PathConstants.SubTasks,
        element: <Subtasks />,
      },
      {
        path: PathConstants.SubTaskDetails,
        element: <SubtaskDetails />,
      },
    ],
  },

  // Routes that require "manage users" permission
  {
    element: <PermissionRoute requiredPermissions={["manage users"]} />,
    children: [
      {
        path: PathConstants.Users,
        element: <UsersPage />,
      },
      {
        path: PathConstants.ViewUsers,
        element: <ViewUser />,
      },
      {
        path: PathConstants.EditUsers,
        element: <EditUser />,
      },
      {
        path: PathConstants.Notifications,
        element: <NotificationsPage />,
      },
    ],
  },

  // Routes that require "manage roles" permission
  {
    element: <PermissionRoute requiredPermissions={["manage roles"]} />,
    children: [
      {
        path: PathConstants.Roles,
        element: <RolesPage />,
      },
    ],
  },

  // Routes that require "manage permissions" permission
  {
    element: <PermissionRoute requiredPermissions={["manage permissions"]} />,
    children: [
      {
        path: PathConstants.Permissions,
        element: <PermissionsPage />,
      },
    ],
  },

  // Routes that require "review submissions" permission
  {
    element: <PermissionRoute requiredPermissions={["review submissions"]} />,
    children: [
      {
        path: PathConstants.Submissions,
        element: <SubmissionsPage />,
      },
      {
        path: PathConstants.ActivityLogs,
        element: <ActivityLogPage />,
      },
      {
        path: PathConstants.ActivityLogsDetails,
        element: <ActivityLogDetails />,
      },
      {
        path: PathConstants.Comments,
        element: <CommentsPage />,
      },
    ],
  },

  // Routes that require "submit work" permission
  {
    element: <PermissionRoute requiredPermissions={["submit work"]} />,
    children: [
      {
        path: PathConstants.Attachments,
        element: <AttachmentsPage />,
      },
    ],
  },

  // Public routes (no permission required)
  {
    path: PathConstants.ForYou,
    element: <ForYou />,
  },
];

export default PrivateRoutes;
