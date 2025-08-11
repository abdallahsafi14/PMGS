import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

// Styled components for the modal
const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .modal-header {
    border-bottom: 1px solid #f0f0f0;
    padding: 1.25rem 1.5rem;
    background-color: ${(props) => props.theme.modalHeaderBg || "#ffffff"};

    .modal-title {
      font-weight: 600;
      font-size: 1.25rem;
      color: ${(props) => props.theme.textPrimary || "#282560"};
    }

    .btn-close {
      opacity: 0.6;
      transition: opacity 0.2s ease, transform 0.2s ease;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  .modal-body {
    padding: 1.5rem;
    max-height: 70vh;
    overflow-y: auto;
    font-size: 14px;
    line-height: 1.6;
    color: ${(props) => props.theme.textSecondary || "#505050"};
  }
`;

const PolicySection = styled.div`
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: ${(props) => props.theme.textPrimary || "#282560"};
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const LastUpdated = styled.div`
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 1rem;
`;

const ModalPrivacyPolicy = ({ show, onClose }) => {
  return (
    <StyledModal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="privacy-policy-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="privacy-policy-modal">Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PolicySection>
          <h4>Introduction</h4>
          <p>
            Welcome to our Privacy Policy. This document explains how we
            collect, use, and handle your personal information when you use our
            services.
          </p>
          <p>
            We are committed to protecting your privacy and ensuring the
            security of your personal information. Please take the time to read
            this Privacy Policy carefully.
          </p>
        </PolicySection>

        <PolicySection>
          <h4>Information We Collect</h4>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and other similar contact details.
            </li>
            <li>
              <strong>Account Information:</strong> Login credentials, password,
              and account preferences.
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              device information, and cookies.
            </li>
            <li>
              <strong>Usage Information:</strong> How you interact with our
              services, features you use, and time spent on our platform.
            </li>
          </ul>
        </PolicySection>

        <PolicySection>
          <h4>How We Use Your Information</h4>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our services
            </li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <h4>Data Security</h4>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </PolicySection>

        <PolicySection>
          <h4>Third-Party Services</h4>
          <p>
            Our services may contain links to third-party websites or services
            that are not owned or controlled by us. We have no control over and
            assume no responsibility for the content, privacy policies, or
            practices of any third-party websites or services.
          </p>
        </PolicySection>

        <PolicySection>
          <h4>Changes to This Policy</h4>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>
        </PolicySection>

        <LastUpdated>Last Updated: May 15, 2025</LastUpdated>
      </Modal.Body>
    </StyledModal>
  );
};

export default ModalPrivacyPolicy;
