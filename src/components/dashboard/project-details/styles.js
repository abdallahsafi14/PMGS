// import styled from "styled-components";

// export const ProjectContainer = styled.div`
//   padding: 2rem;
//   background-color: ${({ theme }) => theme.background};
//   color: ${({ theme }) => theme.text};
// `;

// export const ProjectHeader = styled.h1`
//   font-size: 2rem;
//   margin-bottom: 1.5rem;
//   color: ${({ theme }) => theme.secondary};
// `;

// export const ProjectMeta = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// export const MetaItem = styled.div`
//   font-size: 1rem;
//   color: ${({ theme }) => theme.text};
// `;

// export const Tag = styled.span`
//   background-color: ${({ theme }) => theme.secondary};
//   color: ${({ theme }) => theme.textOnSecondary};
//   padding: 0.3rem 0.6rem;
//   margin-left: 0.5rem;
//   border-radius: 6px;
//   font-size: 0.85rem;
//   font-weight: bold;
// `;

// export const Section = styled.section`
//   margin-top: 2.5rem;
// `;

// export const SectionTitle = styled.h2`
//   font-size: 1.3rem;
//   margin-bottom: 1rem;
//   border-bottom: 1px solid ${({ theme }) => theme.hover};
//   padding-bottom: 0.5rem;
// `;

// export const DescriptionBox = styled.p`
//   background-color: ${({ theme }) => theme.primary};
//   padding: 1rem;
//   border-radius: 8px;
//   color: ${({ theme }) => theme.text};
//   line-height: 1.5;
// `;

// export const TeamList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;

//   li {
//     padding: 0.4rem 0;
//     font-size: 0.95rem;
//   }
// `;

// export const TaskBox = styled.div`
//   background-color: ${({ theme }) => theme.primary};
//   padding: 1.2rem;
//   border-radius: 10px;
//   margin-bottom: 1.5rem;
//   border-left: 4px solid ${({ theme }) => theme.secondary};

//   p {
//     margin-top: 0.5rem;
//     font-size: 0.95rem;
//     color: ${({ theme }) => theme.text};
//   }
// `;

// export const SubtaskList = styled.ul`
//   list-style: none;
//   padding: 0.5rem 1rem;
//   margin-top: 1rem;

//   li {
//     background-color: ${({ theme }) => theme.background};
//     border: 1px solid ${({ theme }) => theme.hover};
//     border-radius: 8px;
//     padding: 0.8rem;
//     margin-bottom: 1rem;
//     font-size: 0.9rem;
//     color: ${({ theme }) => theme.text};
//   }
// `;

// export const SubmissionBox = styled.div`
//   margin-top: 0.8rem;
//   padding-left: 1rem;
//   font-size: 0.85rem;

//   a {
//     color: ${({ theme }) => theme.secondary};
//     text-decoration: underline;
//   }
// `;

// export const CommentBox = styled.div`
//   margin-top: 0.6rem;
//   padding-left: 1rem;
//   font-size: 0.85rem;
//   display: flex;
//   align-items: center;

//   div {
//     margin-bottom: 0.3rem;
//   }
// `;

// export const ActivityBox = styled.div`
//   padding-left: 0.5rem;
//   font-size: 0.9rem;

//   div {
//     margin-bottom: 0.4rem;
//   }
// `;

import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.secondary};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.secondary} 0%,
    #e55100 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

export const MetaItem = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowLight};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMedium};
    transform: translateY(-4px);
  }
`;

export const Tag = styled.span`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary};
  padding: 0.3rem 0.6rem;
  margin-left: 0.5rem;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
`;

export const Section = styled.section`
  margin-top: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.hover};
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Description = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.2rem;
  border-radius: 10px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadowLight};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMedium};
  }
`;

export const TeamList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;

  li {
    padding: 0.75rem 1rem;
    background: ${({ theme }) => theme.cardBackground};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 8px;
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
    &:hover {
      background: ${({ theme }) => theme.hover};
      transform: translateY(-2px);
    }
  }
`;

export const CommentBox = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadowLight};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMedium};
    transform: translateY(-2px);
  }
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: ${({ variant, theme }) =>
    variant === "danger"
      ? "#dc3545"
      : variant === "outline"
      ? "transparent"
      : theme.secondary};

  color: ${({ variant, theme }) =>
    variant === "outline" ? theme.secondary : theme.textOnSecondary};

  border: ${({ variant, theme }) =>
    variant === "outline" ? `1px solid ${theme.secondary}` : "none"};

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;
