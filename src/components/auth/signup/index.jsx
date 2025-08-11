import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import { useNavigate, NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { HiOutlineMailOpen, HiOutlineUser } from "react-icons/hi";
import { PiLockKeyLight } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";

import CustomField from "../../../utils/custom-fields/CustomField";
import ModalPrivacyPolicy from "./ModalPrivacyPolicy";

import { registerUser } from "../../../store/auth/action/registerAction";

import {
  Container,
  FormWrapper,
  FormSection,
  ImageSection,
  Logo,
  Title,
  NameFieldsContainer,
  Button,
  PrivacyLink,
  CheckPrivacy,
  HaveAccount,
  PhoneFieldWrapper,
  PhoneLabel,
  PhoneInputContainer,
  ErrorText,
  FormCard,
  StyledSpinner,
  PageOverlay,
  FormProgress,
  FormProgressBar,
  FormErrorMessage,
  FormContainer,
} from "./Styles";

import logo from "../../../assets/images/abe8cd5a23a669ef39aebf7b66d97266.png";

const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  polices: Yup.boolean().oneOf([true], "You must agree to the privacy policy"),
});

const Register = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [validationState, setValidationState] = useState({
    validateOnBlur: false,
    validateOnChange: false,
  });
  const [privacyError, setPrivacyError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (userData) => {
    const { email, phone } = userData;
    try {
      sessionStorage.setItem("userData", JSON.stringify({ email, phone }));
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const handleRegistrationSubmit = (values, { setSubmitting }) => {
    if (!values.polices) {
      setPrivacyError("You must agree to the privacy policy to continue.");
      setSubmitting(false);
      return;
    }

    setPrivacyError("");
    handleRegister(values);

    dispatch(registerUser(values))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          navigate("/verify");
        }
      })
      .catch((error) => {
        console.error("Registration failed: ", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleSignupClick = () => {
    setValidationState({
      validateOnBlur: true,
      validateOnChange: true,
    });
  };

  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <PageOverlay>
      <Container>
        <FormWrapper>
          <FormSection>
            <FormContainer>
              <Logo src={logo} alt="Logo" />
              <Title>Create Your Account</Title>

              <FormCard>
                <FormProgress>
                  <FormProgressBar width="0%" />
                </FormProgress>

                <Formik
                  initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    password: "",
                    password_confirmation: "",
                    polices: false,
                  }}
                  validationSchema={registerSchema}
                  onSubmit={handleRegistrationSubmit}
                  validateOnBlur={validationState.validateOnBlur}
                  validateOnChange={validationState.validateOnChange}
                >
                  {({
                    isSubmitting,
                    setFieldValue,
                    values,
                    errors,
                    touched,
                  }) => (
                    <Form>
                      <NameFieldsContainer>
                        <CustomField
                          label="First Name"
                          name="first_name"
                          placeholder="Enter your first name"
                          icon={<HiOutlineUser />}
                          error={touched.first_name && errors.first_name}
                        />
                        <CustomField
                          label="Last Name"
                          name="last_name"
                          placeholder="Enter your last name"
                          icon={<HiOutlineUser />}
                          error={touched.last_name && errors.last_name}
                        />
                      </NameFieldsContainer>

                      <CustomField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        icon={<HiOutlineMailOpen />}
                        error={touched.email && errors.email}
                      />

                      <PhoneFieldWrapper>
                        <PhoneLabel htmlFor="phone">Phone Number</PhoneLabel>
                        <PhoneInputContainer
                          hasError={touched.phone && errors.phone}
                        >
                          <span className="phone-icon">
                            <BsTelephone />
                          </span>
                          <PhoneInput
                            defaultCountry="SY"
                            smartCaret={false}
                            limitMaxLength={true}
                            id="phone"
                            placeholder="Enter your phone number"
                            value={values.phone}
                            onChange={(value) => setFieldValue("phone", value)}
                            className="phone-input"
                          />
                        </PhoneInputContainer>
                        {touched.phone && errors.phone && (
                          <ErrorText>{errors.phone}</ErrorText>
                        )}
                      </PhoneFieldWrapper>

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
                        placeholder="Create a password"
                        icon={<PiLockKeyLight />}
                        onClick={togglePasswordVisibility}
                        error={touched.password && errors.password}
                      />

                      <CustomField
                        label="Confirm Password"
                        name="password_confirmation"
                        placeholder="Confirm your password"
                        icon={<PiLockKeyLight />}
                        type={confirmPasswordVisible ? "text" : "password"}
                        eyeIcon={
                          confirmPasswordVisible ? (
                            <AiOutlineEyeInvisible />
                          ) : (
                            <AiOutlineEye />
                          )
                        }
                        onClick={toggleConfirmPasswordVisibility}
                        error={
                          touched.password_confirmation &&
                          errors.password_confirmation
                        }
                      />

                      <CheckPrivacy>
                        <Field
                          type="checkbox"
                          id="polices"
                          name="polices"
                          onChange={(e) => {
                            setFieldValue("polices", e.target.checked);
                            if (e.target.checked) setPrivacyError("");
                          }}
                          checked={values.polices}
                          className="privacy-checkbox"
                        />
                        <label htmlFor="polices">
                          I agree to the{" "}
                          <PrivacyLink onClick={handlePrivacyPolicyClick}>
                            privacy policy
                          </PrivacyLink>
                        </label>
                      </CheckPrivacy>

                      {(privacyError ||
                        (touched.polices && errors.polices)) && (
                        <FormErrorMessage>
                          {privacyError || errors.polices}
                        </FormErrorMessage>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        onClick={handleSignupClick}
                      >
                        {isLoading ? (
                          <StyledSpinner>
                            <Spinner animation="border" size="sm" />
                          </StyledSpinner>
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                      <HaveAccount>
                        Already have an account?{" "}
                        <NavLink to="/sign-in">Sign in</NavLink>
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

      <ModalPrivacyPolicy
        show={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </PageOverlay>
  );
};

export default Register;
