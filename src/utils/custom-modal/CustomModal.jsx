import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 10px;
    background-color: #f8f9fa;
    border: none;
  }

  .modal-header {
    background-color: ${(props) => props.headerBg || '#007bff'};
    color: ${(props) => props.headerColor || 'white'};
    padding: 15px;
  }

  .modal-body {
    padding: 20px;
    text-align: center;
    background-color: ${(props) => props.bodyBg || '#ffffff'};
  }

  .modal-footer {
    background-color: ${(props) => props.footerBg || '#f1f1f1'};
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: ${(props) => props.textColor || 'white'};
  border: none;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#0056b3'};
  }
`;

const CustomModal = ({
  show,
  onHide,
  title,
  bodyContent,
  footerContent,
  headerBg,
  headerColor,
  bodyBg,
  footerBg,
  buttonProps,
}) => {
  return (
    <StyledModal show={show} onHide={onHide} centered headerBg={headerBg} bodyBg={bodyBg} footerBg={footerBg}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: headerColor }}>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{bodyContent}</Modal.Body>

      <Modal.Footer>
        {footerContent}
        <StyledButton {...buttonProps} onClick={onHide}>
          Close
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default CustomModal;














// buttonProps: خصائص الأزرار مثل اللون والخلفية.


// example

// import React, { useState } from 'react';
// import CustomModal from './CustomModal';
// import { Button } from 'react-bootstrap';
// import styled from 'styled-components';

// // مكونات مخصصة أخرى باستخدام styled-components
// const CustomHeader = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   color: #333;
// `;

// const CustomBody = styled.div`
//   font-size: 16px;
//   padding: 15px;
//   color: #666;
// `;

// const CustomFooter = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
// `;

// const App = () => {
//   const [showModal, setShowModal] = useState(false);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   return (
//     <div className="container">
//       <Button variant="primary" onClick={handleShow}>
//         Open Custom Modal
//       </Button>

//       <CustomModal
//         show={showModal}
//         onHide={handleClose}
//         title="Custom Modal Example"
//         bodyContent={<CustomBody>This is a custom modal with styled-components.</CustomBody>}
//         footerContent={<CustomFooter><Button variant="secondary" onClick={handleClose}>Cancel</Button></CustomFooter>}
//         headerBg="#007bff" 
//         headerColor="white"
//         bodyBg="#f4f4f4"
//         footerBg="#f1f1f1"
//         buttonProps={{ bgColor: "#28a745", textColor: "white", hoverColor: "#218838" }}
//       />
//     </div>
//   );
// };

// export default App;



