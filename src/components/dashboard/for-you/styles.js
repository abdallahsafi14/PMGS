import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ForYouContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};
    padding-bottom: 0.5rem;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SummaryCard = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  .label {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.secondaryText};
  }
  .value {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const RecentProjects = styled.section`
  margin-bottom: 2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 1.25rem;
      margin: 0;
    }
  }
`;

export const ProjectsCardContainer = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

export const ForYouTabsSection = styled.div`
  .nav-tabs {
    margin-bottom: 1rem;
    border-bottom: none;
  }

  .nav-link {
    color: ${({ theme }) => theme.secondaryText};
    border: none;
    background: none;
    padding: 0.5rem 1rem;
    &.active {
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.active};
      border-radius: 4px;
    }
  }

  .tab-content {
    padding: 1rem 0;
    .empty {
      color: ${({ theme }) => theme.muted};
      text-align: center;
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export const EmptyState = styled.div`
  padding: 1.5rem;
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => theme.muted};
`;
