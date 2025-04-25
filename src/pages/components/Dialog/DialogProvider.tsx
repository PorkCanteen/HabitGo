import React from 'react';
import { Dialog } from './index';

const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Dialog.Component />
    </>
  );
};

export default DialogProvider; 