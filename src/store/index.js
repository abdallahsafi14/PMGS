// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import permissionsReducer from "./permissions/permissionsSlice";
import rolesReducer from "./roles/rolesSlice";
import projectsReducer from "./projects/projectsSlice";
import usersReducer from "./users/usersSlice";
import tasksReducer from "./tasks/tasksSlice";
import subTasksReducer from "./subtask/subTasksSlice";
import ActivityLogsReducer from "./activity-logs/activitySlice";
import submissionSlice from "./submissions/submissionsSlice";
import commentsSlice from "./comments/commentsSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    permissions: permissionsReducer,
    roles: rolesReducer,
    projects: projectsReducer,
    users: usersReducer,
    tasks: tasksReducer,
    subTasks: subTasksReducer,
    ActivityLogs: ActivityLogsReducer,
    submissions: submissionSlice,
    comments: commentsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
