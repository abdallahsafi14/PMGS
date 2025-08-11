
import React, { useEffect } from 'react';
import { DrawerWrapper, Overlay, CloseButton } from './Styles.js';

const Drawer = ({ open, onClose, children }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('#drawer')) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  return (
    <>
      {open && <Overlay onClick={onClose} />}
      <DrawerWrapper id="drawer" open={open} >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </DrawerWrapper>
    </>
  );
};

export default Drawer;
