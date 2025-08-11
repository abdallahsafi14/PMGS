import styled from "styled-components";

export const Container = styled.div`
  padding: 0.5rem 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.background} 0%,
    ${({ theme }) => theme.primary} 100%
  );
  min-height: 100vh;
  color: ${({ theme }) => theme.text};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 2rem 0;
  a div {
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.text} 0%,
        ${({ theme }) => theme.secondary} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    p {
      color: ${({ theme }) => theme.secondaryText};
      font-size: 1.1rem;
      font-weight: 400;
    }
  }
`;

export const AddProjectButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.secondary} 0%,
    #e55100 100%
  );
  color: ${({ theme }) => theme.textOnSecondary};
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadowMedium};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      #e55100 0%,
      ${({ theme }) => theme.secondary} 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLarge};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-bottom: 3rem;
`;

export const SummaryCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: ${({ theme }) => theme.shadowLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.secondary} 0%,
      #e55100 100%
    );
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadowLarge};
    border-color: ${({ theme }) => theme.secondary};

    &::before {
      transform: scaleY(1);
    }

    .icon {
      transform: scale(1.1);
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.secondary} 0%,
        #e55100 100%
      );
      color: ${({ theme }) => theme.textOnSecondary};
    }
  }

  .icon {
    color: ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.primaryLight};
    padding: 12px;
    border-radius: 12px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label {
      font-size: 0.95rem;
      color: ${({ theme }) => theme.secondaryText};
      font-weight: 500;
    }

    .value {
      font-size: 1.75rem;
      font-weight: 700;
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const RecentSection = styled.div`
  margin-bottom: 3rem;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${({ theme }) => theme.borderColor};

    h2 {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;

      svg {
        color: ${({ theme }) => theme.secondary};
      }
    }

    button {
      background: none;
      border: none;
      color: ${({ theme }) => theme.secondary};
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: ${({ theme }) => theme.primaryLight};
        transform: translateX(4px);
      }
    }
  }

  .grid {
    margin-top: 1.5rem;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .recent-updates {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ProjectCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadowLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.secondary} 0%,
      #e55100 100%
    );
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadowLarge};

    &::before {
      transform: scaleX(1);
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
  }

  .priority {
    font-size: 0.75rem;
    padding: 6px 12px;
    border-radius: 20px;
    text-transform: capitalize;
    font-weight: 600;
    letter-spacing: 0.5px;

    &.red {
      background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
      color: #dc2626;
    }
    &.yellow {
      background: linear-gradient(135deg, #fffbeb 0%, #fde68a 100%);
      color: #d97706;
    }
    &.green {
      background: linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%);
      color: #16a34a;
    }
  }

  h3 {
    margin: 0.75rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    line-height: 1.3;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.secondaryText};
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .meta {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.muted};
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 8px;
    border-left: 3px solid ${({ theme }) => theme.secondary};
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.borderColor};
    font-size: 0.85rem;
    color: ${({ theme }) => theme.secondaryText};

    button {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.secondary} 0%,
        #e55100 100%
      );
      color: ${({ theme }) => theme.textOnSecondary};
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadowMedium};
      }
    }
  }
`;

export const StatusBadge = styled.span`
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;

  background: ${({ status }) =>
    status === "green"
      ? "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
      : status === "blue"
      ? "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)"
      : status === "orange"
      ? "linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)"
      : "linear-gradient(135deg, #f3f4f6 0%, #d1d5db 100%)"};

  color: ${({ status }) =>
    status === "green"
      ? "#065f46"
      : status === "blue"
      ? "#1e40af"
      : status === "orange"
      ? "#92400e"
      : "#374151"};
`;

export const RecentItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 16px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.shadowLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.secondary} 0%,
      #e55100 100%
    );
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateX(8px);
    box-shadow: ${({ theme }) => theme.shadowMedium};

    &::before {
      transform: scaleY(1);
    }

    .icon {
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.secondary} 0%,
        #e55100 100%
      );
      color: ${({ theme }) => theme.text};
      transform: scale(1.1);
    }
  }

  .left {
    display: flex;
    gap: 1rem;
    align-items: center;

    .icon {
      background: ${({ theme }) => theme.primaryLight};
      color: ${({ theme }) => theme.secondary};
      padding: 12px;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
  }

  h4 {
    margin: 0 0 0.5rem 0;
    font-weight: 600;
    font-size: 1.1rem;
  }

  small {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.muted};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .right {
    text-align: right;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondaryText};

    small {
      display: block;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: ${({ theme }) => theme.muted};
    }
  }
`;

export const EmptyState = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme.muted};
  background: ${({ theme }) => theme.cardBackground};
  border: 2px dashed ${({ theme }) => theme.borderColor};
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const LoadingSkeleton = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 1.5rem;

  .skeleton-line {
    height: 1rem;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.borderColor} 25%,
      ${({ theme }) => theme.primary} 50%,
      ${({ theme }) => theme.borderColor} 75%
    );
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 0.75rem;

    &.title {
      height: 1.5rem;
      width: 60%;
    }

    &.subtitle {
      height: 1rem;
      width: 40%;
    }

    &.content {
      height: 1rem;
      width: 80%;
    }
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
