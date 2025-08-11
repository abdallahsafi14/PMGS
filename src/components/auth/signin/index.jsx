import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { HiOutlineMailOpen } from "react-icons/hi";
import { PiLockKeyLight } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import CustomField from "../../../utils/custom-fields/CustomField";

import { loginUser } from "../../../store/auth/action/loginActions";

import {
  Container,
  FormWrapper,
  FormSection,
  ImageSection,
  Logo,
  Title,
  Button,
  HaveAccount,
  FormCard,
  StyledSpinner,
  PageOverlay,
  FormErrorMessage,
  FormContainer,
} from "./Styles";

import logo from "../../../assets/images/abe8cd5a23a669ef39aebf7b66d97266.png";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
});

const Signin = () => {
  const [validationState, setValidationState] = useState({
    validateOnBlur: false,
    validateOnChange: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { isLoading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (userData) => {
    const { email } = userData;
    try {
      sessionStorage.setItem("userData", JSON.stringify({ email }));
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const handleLoginSubmit = (values, { setSubmitting }) => {
    console.log("Form values before submission:", values);
    handleLogin(values);

    dispatch(loginUser(values))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed: ", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleSigninClick = () => {
    setValidationState({
      validateOnBlur: true,
      validateOnChange: true,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <PageOverlay>
      <Container>
        <FormWrapper>
          <FormSection>
            <FormContainer>
              <Logo src={logo} alt="Logo" />
              <Title>Welcome Back</Title>

              <FormCard>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  // validationSchema={loginSchema}
                  onSubmit={handleLoginSubmit}
                  validateOnBlur={validationState.validateOnBlur}
                  validateOnChange={validationState.validateOnChange}
                >
                  {({
                    isSubmitting,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    values,
                  }) => (
                    <Form>
                      <CustomField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<HiOutlineMailOpen />}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email}
                      />

                      <CustomField
                        label="Password"
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        eyeIcon={
                          passwordVisible ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )
                        }
                        placeholder="Enter your password"
                        icon={<PiLockKeyLight />}
                        onClick={togglePasswordVisibility}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={touched.password && errors.password}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        onClick={handleSigninClick}
                      >
                        {isLoading ? (
                          <StyledSpinner>
                            <Spinner animation="border" size="sm" />
                          </StyledSpinner>
                        ) : (
                          "Login"
                        )}
                      </Button>

                      <HaveAccount>
                        Don't have an account?{" "}
                        <NavLink to="/sign-up">Sign up</NavLink>
                      </HaveAccount>

                      {error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </Form>
                  )}
                </Formik>
              </FormCard>
            </FormContainer>
          </FormSection>
          <ImageSection />
        </FormWrapper>
      </Container>
    </PageOverlay>
  );
};

export default Signin;
