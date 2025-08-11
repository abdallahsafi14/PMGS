// src/utils/custom-modal/FormModal.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: 100%;
`;

const FormModal = ({
  show,
  onHide,
  title,
  initialValues,
  validationSchema,
  formFields = [],
  onSubmit,
  submitText = "Save",
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <FormikForm>
            <Modal.Body>
              {formFields.map((field) => (
                <Form.Group className="mb-3" key={field.name}>
                  <Form.Label>{field.label}</Form.Label>

                  {field.type === "select" && field.options?.[0]?.label ? (
                    <StyledSelect
                      name={field.name}
                      options={field.options}
                      value={field.options.find(
                        (opt) => opt.value === values[field.name]
                      )}
                      onChange={(selected) =>
                        setFieldValue(field.name, selected?.value)
                      }
                    />
                  ) : field.type === "select" ? (
                    <Field
                      as="select"
                      name={field.name}
                      className="form-select"
                    >
                      <option value="">-- Select --</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Field>
                  ) : field.type === "textarea" ? (
                    <Field
                      as="textarea"
                      name={field.name}
                      className="form-control"
                      rows={3}
                    />
                  ) : field.type === "file" ? (
                    <Form.Control
                      type="file"
                      multiple={field.multiple}
                      onChange={(e) =>
                        setFieldValue(field.name, Array.from(e.target.files))
                      }
                    />
                  ) : (
                    <Field
                      type={field.type}
                      name={field.name}
                      className="form-control"
                    />
                  )}

                  {errors[field.name] && touched[field.name] && (
                    <Form.Text className="text-danger">
                      {errors[field.name]}
                    </Form.Text>
                  )}
                </Form.Group>
              ))}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {submitText}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default FormModal;
