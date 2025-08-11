import { IoIosSettings } from "react-icons/io";
import { FaComment, FaUser, FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { TbUsersGroup, TbStack } from "react-icons/tb";
import { FaTasks, FaBell, FaMask } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoAccessibility } from "react-icons/io5";
import { RxActivityLog } from "react-icons/rx";
import { GrAttachment } from "react-icons/gr";
import PathConstants from "../routes/pathConstants";

export const sidebarMenu = [
  // {
  //   name: "For You",
  //   icon: <FaUser />,
  //   link: PathConstants.ForYou,
  //   permission: "",
  // },
  {
    name: "Projects",
    icon: <GrProjects />,
    link: PathConstants.Projects,
    permission: "manage projects",
  },
  {
    name: "Tasks",
    icon: <FaTasks />,
    link: PathConstants.Tasks,
    permission: "manage tasks",
  },
  {
    name: "subTasks",
    icon: <FaTasks />,
    link: PathConstants.SubTasks,
    permission: "manage tasks",
  },
  {
    name: "Attachments",
    icon: <GrAttachment />,
    link: PathConstants.Attachments,
    permission: "submit work", // أو manage tasks إذا كنت تراها خاصة بالمشرف
  },
  {
    name: "Roles",
    icon: <FaMask />,
    link: PathConstants.Roles,
    permission: "manage roles",
  },
  {
    name: "Permissions",
    icon: <IoAccessibility />,
    link: PathConstants.Permissions,
    permission: "manage permissions",
  },
  {
    name: "Activity Logs",
    icon: <RxActivityLog />,
    link: PathConstants.ActivityLogs,
    permission: "review submissions",
  },
  {
    name: "Comments",
    icon: <FaComment />,
    link: PathConstants.Comments,
    permission: "review submissions",
  },
  {
    name: "User Management",
    icon: <FaUsers />,
    link: PathConstants.Users,
    permission: "manage users",
  },
  {
    name: "Notifications",
    icon: <FaBell />,
    link: PathConstants.Notifications,
    permission: "manage users", // أو صلاحية منفصلة إن وجدت
  },
  {
    name: "Submissions",
    icon: <AiOutlineFileSearch />,
    link: PathConstants.Submissions,
    permission: "review submissions",
  },
  // {
  //   name: "Settings",
  //   icon: <IoIosSettings />,
  //   children: [
  //     { name: "Profile", icon: "👤", link: "/profile" },
  //     { name: "Billing", icon: "💳", link: "/billing" },
  //   ],
  // },
  {
    name: "Teams",
    icon: <TbUsersGroup />,
    link: "/dashboard/banners/home-top",
    permission: "manage users", // أو حسب السياق
  },
  {
    name: "Plans",
    icon: <TbStack />,
    link: "/dashboard/categories",
    permission: "manage users", // أو حسب السياق
  },
];
