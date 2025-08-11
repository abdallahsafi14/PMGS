import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import AppTemplate from "../../../app-template";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Themes } from "../../../../context/themes/themes";
import {
  getUserById,
  updateUser,
} from "../../../../store/users/action/usersActions";

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
`;

const StyledInput = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const StyledSelect = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.secondary} !important;
  color: ${({ theme }) => theme.textOnSecondary};
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
`;

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  role: Yup.string().required("Role is required."),
});

const EditUser = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store
  const { currentUser } = useSelector((state) => state.users || {});

  // Try to get user from location state first, then from Redux store
  const user = state?.user || currentUser;

  useEffect(() => {
    // If no user data in location state and we have an ID, fetch from Redux
    if (!state?.user && id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id, state?.user]);

  console.log(user);

  const handleSubmit = (values) => {
    console.log("submitted");
    dispatch(updateUser(id, values));
  };

  return (
    <AppTemplate
      pageTitle={`Edit User - ${user.name}`}
      navbar
      sidebar
      SEOPageName="Edit User"
    >
      <div className="container mt-4">
        <StyledCard>
          <h3 className="mb-4">Edit User</h3>

          <Formik
            initialValues={
              user || { name: "", email: "", role: "", status: "" }
            }
            // validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FieldGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <StyledInput name="name" />
                  {errors.name && touched.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="email">Email</Label>
                  <StyledInput name="email" type="email" />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="role">Role</Label>
                  <StyledSelect name="role" as="select">
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Member">Member</option>
                  </StyledSelect>
                  {errors.role && touched.role && (
                    <div className="text-danger">{errors.role}</div>
                  )}
                </FieldGroup>
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#28a745",
                      border: "none",
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </StyledCard>
      </div>
    </AppTemplate>
  );
};

export default EditUser;
