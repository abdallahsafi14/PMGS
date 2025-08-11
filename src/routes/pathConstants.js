import AttachmentsPage from "../components/dashboard/attachments";

const PathConstants = {
  Home: "/",
  // unauthorized
  Unauthorized: "/unauthorized",

  // profile
  ShowProfile: "/show-profile",
  // auth
  Verify: "/verify",
  Register: "/sign-up",
  Login: "/sign-in",
  // admin
  ForYou: "/your-work",
  // Projects
  Projects: "/projects",
  ProjectDetails: "/projects/:id",
  CreateProject: "/projects/create",
  UpdateProject: "/projects/edit/:id",
  // tasks
  Tasks: "/tasks",
  TaskDetails: "/projects/:projectId/tasks/:id",
  CreateTask: "/projects/:projectId/tasks/create",
  UpdateTask: "/projects/:projectId/tasks/edit/:id",
  // subtasks
  SubTasks: "/subtasks",
  SubTaskDetails: "/tasks/:taskId/subtasks/:subtaskId",
  CreateSubtask: "/tasks/:id/subtasks",
  UpdateSubtask: "/tasks/:id/subtasks/:subtaskId",

  ///notifications
  Notifications: "/notifications",
  // Submission
  Submissions: "/submissions",
  // Users
  Users: "/users",
  ViewUsers: "/users/:id",
  EditUsers: "/users/edit/:id",
  // Roles
  Roles: "/roles",
  // permissions
  Permissions: "/permissions",
  // activity logs
  ActivityLogs: "/activity-logs",
  ActivityLogsDetails: "/activity-logs/:id",
  // Attachments Page
  Attachments: "/attachments",
  //Comments
  Comments: "/comments",
};

export default PathConstants;
