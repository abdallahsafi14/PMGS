import React, { useEffect, useState } from "react";
import {
  FaFolderOpen,
  FaTasks,
  FaClock,
  FaCheckCircle,
  FaBell,
  FaChevronRight,
  FaStar,
  FaChartLine,
  FaPlay,
  FaChartBar,
} from "react-icons/fa";
import {
  Container,
  Header,
  AddProjectButton,
  SummaryGrid,
  SummaryCard,
  RecentSection,
  ProjectCard,
  StatusBadge,
  RecentItemCard,
  EmptyState,
  LoadingSkeleton,
} from "./styles";
import { GET } from "../../services/http.service";
import AppTemplate from "../../components/app-template";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../routes/pathConstants";

const Home = () => {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GET("api/user/dashboard-summary", true)
      .then((res) => {
        setSummary(res.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "in_progress":
        return "blue";
      case "for_review":
        return "orange";
      default:
        return "gray";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  const summaryCards = [
    {
      label: "Total Projects",
      value: summary?.total_projects_involved ?? 0,
      icon: <FaFolderOpen size={24} />,
    },
    {
      label: "Active Tasks",
      value: summary?.active_tasks_count ?? 0,
      icon: <FaTasks size={24} />,
    },
    {
      label: "Pending Reviews",
      value: summary?.pending_submissions_for_review ?? 0,
      icon: <FaBell size={24} />,
    },
    {
      label: "Upcoming Deadlines",
      value: summary?.upcoming_deadlines_count ?? 0,
      icon: <FaClock size={24} />,
    },
    {
      label: "Completed (30d)",
      value: summary?.completed_tasks_last_30_days_count ?? 0,
      icon: <FaCheckCircle size={24} />,
    },
  ];

  return (
    <AppTemplate
      pageTitle="For You"
      navbar
      sidebar
      // footer
        
    >
      <Container>
        <Header>
          <div>
            <h1>Welcome back 👋</h1>
            <p>Here's what's happening with your projects today</p>
          </div>
          <AddProjectButton
            onClick={() => navigate(PathConstants.CreateProject)}
          >
            <span>+ Add Project</span>
          </AddProjectButton>
        </Header>

        {/* Summary Cards */}
        {loading ? (
          <SummaryGrid>
            {[...Array(5)].map((_, idx) => (
              <LoadingSkeleton key={idx}>
                <div className="skeleton-line title"></div>
                <div className="skeleton-line subtitle"></div>
                <div className="skeleton-line content"></div>
              </LoadingSkeleton>
            ))}
          </SummaryGrid>
        ) : (
          <SummaryGrid>
            {summaryCards.map((card, idx) => (
              <SummaryCard key={idx}>
                <div className="icon">{card.icon}</div>
                <div className="text">
                  <span className="label">{card.label}</span>
                  <span className="value">{card.value}</span>
                </div>
              </SummaryCard>
            ))}
          </SummaryGrid>
        )}

        {/* Recently Worked On Projects */}
        <RecentSection>
          <div className="section-header">
            <h2>
              <FaStar /> Recently Worked On
            </h2>
            <button onClick={() => navigate("/projects")}>
              View All Projects <FaChevronRight size={14} />
            </button>
          </div>

          {summary?.recently_worked_on_projects?.length ? (
            <div className="grid">
              {summary.recently_worked_on_projects.map((p) => (
                <ProjectCard key={p.id}>
                  <div className="header">
                    <span
                      className={`priority ${getPriorityColor(p.priority)}`}
                    >
                      {p.priority}
                    </span>
                    <StatusBadge status={getStatusColor(p.status)}>
                      {p.status}
                    </StatusBadge>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="meta">
                    Tasks: {p.tasks_count} | Subtasks: {p.subtasks_count}
                  </div>
                  <div className="footer">
                    <span>
                      {p.start_date} → {p.end_date}
                    </span>
                    <button onClick={() => navigate(`/projects/${p.id}`)}>
                      <FaPlay size={12} /> View
                    </button>
                  </div>
                </ProjectCard>
              ))}
            </div>
          ) : (
            <EmptyState>No recent projects found</EmptyState>
          )}
        </RecentSection>

        {/* Recent Activity */}
        <RecentSection>
          <div className="section-header">
            <h2>
              <FaChartLine /> Recent Activity
            </h2>
          </div>

          {summary?.recently_updated_items?.length ? (
            <div className="recent-updates">
              {summary.recently_updated_items.map((item) => (
                <RecentItemCard key={`${item.type}-${item.id}`}>
                  <div className="left">
                    <div className="icon">
                      <FaChartBar />
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <small>
                        {item.type} •{" "}
                        <StatusBadge status={getStatusColor(item.status)}>
                          {item.status}
                        </StatusBadge>{" "}
                        • Project #{item.project_id}
                      </small>
                    </div>
                  </div>
                  <div className="right">
                    {new Date(item.updated_at).toLocaleDateString()}
                    <small>
                      {new Date(item.updated_at).toLocaleTimeString()}
                    </small>
                  </div>
                </RecentItemCard>
              ))}
            </div>
          ) : (
            <EmptyState>No recent updates found</EmptyState>
          )}
        </RecentSection>
      </Container>
    </AppTemplate>
  );
};

export default Home;
