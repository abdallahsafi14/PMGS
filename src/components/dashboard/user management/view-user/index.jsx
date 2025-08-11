import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import AppTemplate from "../../../app-template";
import { Themes } from "../../../../context/themes/themes";
import { getUserById } from "../../../../store/users/action/usersActions";

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
`;

const InfoGroup = styled.div`
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
`;

const InfoValue = styled.div`
  padding: 10px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  /* border: 1px solid #ccc; */
  border-radius: 6px;
  min-height: 40px;
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ status, theme }) =>
    status === "Active" ? "#28a745" : "#dc3545"};
  color: white;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
  border-radius: 6px;
  margin: 20px 0;
  text-align: center;
`;

function ViewUser() {
  const { state } = useLocation();
  const { id } = useParams(); // Get user ID from URL parameters
  const { theme } = useContext(Themes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store
  const { currentUser, loading, error } = useSelector(
    (state) => state.users || {}
  );

  // Try to get user from location state first, then from Redux store
  const user = state?.user || currentUser;

  useEffect(() => {
    // If no user data in location state and we have an ID, fetch from Redux
    if (!state?.user && id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id, state?.user]);

  console.log(user);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <AppTemplate>
        <StyledCard theme={theme}>
          <LoadingSpinner>Loading user information...</LoadingSpinner>
        </StyledCard>
      </AppTemplate>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <AppTemplate>
        <StyledCard theme={theme}>
          <ErrorMessage>
            Error loading user data: {error}
            <br />
            <Button
              onClick={handleBack}
              style={{
                backgroundColor: theme.secondary,
                border: "none",
                marginTop: "10px",
              }}
            >
              Back to Users
            </Button>
          </ErrorMessage>
        </StyledCard>
      </AppTemplate>
    );
  }

  // Show error if no user data found
  if (!user) {
    return (
      <AppTemplate>
        <StyledCard theme={theme}>
          <ErrorMessage>
            User data not found. Please go back to the user list.
            <br />
            <Button
              onClick={handleBack}
              style={{
                backgroundColor: theme.secondary,
                border: "none",
                marginTop: "10px",
              }}
            >
              Back to Users
            </Button>
          </ErrorMessage>
        </StyledCard>
      </AppTemplate>
    );
  }

  const handleEdit = (user) => {
    navigate(`/users/edit/${user.id}`, { state: { user } });
  };

  const handleBack = () => {
    navigate("/users");
  };

  return (
    <AppTemplate>
      <StyledCard theme={theme}>
        <h2>User Information</h2>

        <InfoGroup>
          <StyledLabel>Name</StyledLabel>
          <InfoValue theme={theme}>{user.name}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <StyledLabel>Email</StyledLabel>
          <InfoValue theme={theme}>{user.email}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <StyledLabel>Role</StyledLabel>
          <InfoValue theme={theme}>
            {user.roles?.map((role, index) => (
              <span key={role.id || index}>
                {role.name}
                {index < user.roles.length - 1 ? ", " : ""}
              </span>
            ))}
          </InfoValue>
        </InfoGroup>

        <div>
          <Button
            onClick={() => handleEdit(user)}
            style={{
              backgroundColor: theme.secondary,
              border: "none",
              marginRight: "10px",
            }}
          >
            Edit User
          </Button>
          <Button onClick={handleBack} variant="secondary">
            Back to Users
          </Button>
        </div>
      </StyledCard>
    </AppTemplate>
  );
}

export default ViewUser;
