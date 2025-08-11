import styled from 'styled-components';

export const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  ${document.dir === 'rtl' ? 'left' : 'right'}: 0;
  height: 100vh;
  width: 300px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  box-shadow: ${document.dir === 'rtl' ? '2px 0 5px rgba(0,0,0,0.3)' : '-2px 0 5px rgba(0,0,0,0.3)'};
  transform: translateX(${(props) => (props.open ? '0' : document.dir === 'rtl' ? '-100%' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  ${document.dir === 'rtl' ? 'left' : 'right'}: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;
