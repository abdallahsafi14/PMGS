import React from 'react'
import {maskEmail, maskPhoneNumber} from "../../helpers/masked"
import { Spinner } from "react-bootstrap";
import { Label, RadioDetails, Button, RadioWrapper } from './Styles';

export default function RadioField({verificationMethod, handleMethodChange,handleModalClose, data, handleResend, isLoading }) {
  function handleSending(){
    handleModalClose()
    handleResend()
  }
  return (
    <RadioWrapper>
              <Label>
                <input
                  type="radio"
                  name="verify"
                  value="Email"
                  checked={verificationMethod === "Email"}
                  onChange={() => handleMethodChange("Email")}
                />
                <RadioDetails>
                  <h2>Send code via email</h2>
                  <p>{maskEmail(data?.email)}</p>
                </RadioDetails>
              </Label>
              <Label>
                <input
                  type="radio"
                  name="verify"
                  value="Number"
                  checked={verificationMethod === "Number"}
                  onChange={() => handleMethodChange("Number")}s
                />
                <RadioDetails>
                  <h2>Send code via number</h2>
                  <p>{maskPhoneNumber(data?.phone)}</p>
                </RadioDetails>
              </Label>
              <Button
                type="button"
                // disabled={!canResend}
                onClick={handleSending}
              >
                {isLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "send"
                )}
              </Button>
            </RadioWrapper>
  )
}
