import { useState, useEffect } from "react";
import ReactCodeInput from "react-code-input";
import { useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import {
  Container,
  FormWrapper,
  FormSection,
  Logo,
  Title,
  ReactCodeProps,
  ResendText,
  ImageSection,
  VerifyButton,
} from "./Styles";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GET, POST } from "../../../services/http.service";
import RadioField from "../../RadioField";
import CustomModal from "./verifyModal";
import { successToaster } from "../../../helpers/toasterConfiguration";

const VerifyAccount = () => {
  const data = JSON.parse(sessionStorage.getItem("userData"));
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState("Email");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/sign-in");
    }
  }, [data]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  function handleResendModal() {
    handleModalOpen();
    // handleResend()
  }

  const handleResend = async () => {
    // handleModalClose()
    setTimer(60);
    setCanResend(false);
    try {
      const response = await POST(`auth/resend/code`, null, true);
      if (response.status == 200) successToaster(response.data.message);
    } catch (error) {}
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleMethodChange = (method) => {
    setVerificationMethod(method);
  };

  const handleSubmit = async () => {
    const data = {
      code: code,
    };

    try {
      const response = await POST("auth/verify/code", data, true);
      if (response.status === 200) {
        navigate("/");
        sessionStorage.removeItem("userData");
      }
    } catch (error) {}
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <Container>
      <FormWrapper>
        <FormSection>
          {/* <Logo src={logo} alt="logo" /> */}
          <Title>Verification code will be sent to</Title>
          <button type="button">Choose Verification Method</button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <ResendText>
              If you don’t receive the code{" "}
              <button
                type="button"
                disabled={!canResend}
                className="resend"
                onClick={handleResendModal}
              >
                resend
              </button>{" "}
              {!canResend && <span>it during {timer} seconds</span>}
            </ResendText>
            <ReactCodeInput
              type="number"
              {...ReactCodeProps}
              fields={6}
              onChange={handleCodeChange}
            />
            <VerifyButton type="submit" disabled={code.length !== 6}>
              {isLoading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "verify"
              )}
            </VerifyButton>
          </form>
        </FormSection>
        <ImageSection />
      </FormWrapper>

      <CustomModal show={showModal} handleClose={handleModalClose}>
        <RadioField
          handleMethodChange={handleMethodChange}
          verificationMethod={verificationMethod}
          isLoading={isLoading}
          data={data}
          handleResend={handleResend}
          canResend={canResend}
          handleModalClose={handleModalClose}
        />
      </CustomModal>
    </Container>
  );
};

export default VerifyAccount;
