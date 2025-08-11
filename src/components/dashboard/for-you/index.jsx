import React, { useEffect, useState } from "react";
import AppTemplate from "../../app-template";
import { GET } from "../../../services/http.service";
import {
  ForYouContainer,
  SummaryGrid,
  SummaryCard,
  RecentProjects,
  ProjectsCardContainer,
  ForYouTabsSection,
  StyledNavLink,
  EmptyState,
} from "./styles";
import CustomCard from "../../../utils/custom-card";
import LastWeekActivity from "../../lastWeekTask";
import { NavLink } from "react-router-dom";
import PathConstants from "../../../routes/pathConstants";

const ForYou = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("worked-on");

  useEffect(() => {
    setLoading(true);
    GET("api/user/dashboard-summary", true)
      .then((res) => setSummary(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const cardsData = (summary?.recently_worked_on_projects || []).map((p) => ({
    id: p.id,
    title: p.name,
    description1: p.description,
    description2: `Priority: ${p.priority} | Status: ${p.status}`,
    footerText: "View Details",
    link: `${PathConstants.Projects}/${p.id}`,
  }));

  const summaryCards = [
    {
      label: "Projects Involved",
      value: summary?.total_projects_involved ?? 0,
    },
    {
      label: "Active Tasks",
      value: summary?.active_tasks_count ?? 0,
    },
    {
      label: "Pending Reviews",
      value: summary?.pending_submissions_for_review ?? 0,
    },
    {
      label: "Upcoming Deadlines",
      value: summary?.upcoming_deadlines_count ?? 0,
    },
    {
      label: "Completed in 30 Days",
      value: summary?.completed_tasks_last_30_days_count ?? 0,
    },
  ];

  return (
    <AppTemplate
      pageTitle="For You"
      navbar
      sidebar
      footer
      SEOPageName="For You"
    >
      <ForYouContainer>
        <h2>Dashboard Overview</h2>

        {/* 🔢 KPIs */}
        <SummaryGrid>
          {summaryCards.map((card, i) => (
            <SummaryCard key={i}>
              <div className="label">{card.label}</div>
              <div className="value">{card.value}</div>
            </SummaryCard>
          ))}
        </SummaryGrid>

        {/* 🗂️ Recent Projects */}
        <RecentProjects>
          <div className="header">
            <h3>Recently Worked On</h3>
            <StyledNavLink to={PathConstants.Projects}>View All</StyledNavLink>
          </div>

          {loading ? (
            <EmptyState>Loading projects...</EmptyState>
          ) : cardsData.length ? (
            <ProjectsCardContainer>
              <CustomCard cards={cardsData} />
            </ProjectsCardContainer>
          ) : (
            <EmptyState>No recent projects found.</EmptyState>
          )}
        </RecentProjects>

        {/* 🧠 Tabs Section */}
        <ForYouTabsSection>
          <ul className="nav nav-tabs">
            {["worked-on", "viewed", "assigned", "starred", "boards"].map(
              (tab) => (
                <li key={tab} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                </li>
              )
            )}
          </ul>

          <div className="tab-content">
            {activeTab === "worked-on" && (
              <div className="tab-pane active">
                <LastWeekActivity />
              </div>
            )}

            {activeTab === "viewed" && (
              <div className="tab-pane active">
                {(summary?.recently_updated_items.length ?? 0) > 0 ? (
                  <ul className="list-group">
                    {summary.recently_updated_items.map((item) => (
                      <li
                        className="list-group-item"
                        key={`${item.type}-${item.id}`}
                      >
                        <strong>{item.type.toUpperCase()}:</strong> {item.title}{" "}
                        – <small>{item.status}</small> (Project ID:{" "}
                        {item.project_id})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState>No recent updates.</EmptyState>
                )}
              </div>
            )}

            {["assigned", "starred", "boards"].includes(activeTab) && (
              <div className="tab-pane empty">
                <EmptyState>No data available for "{activeTab}".</EmptyState>
              </div>
            )}
          </div>
        </ForYouTabsSection>
      </ForYouContainer>
    </AppTemplate>
  );
};

export default ForYou;
