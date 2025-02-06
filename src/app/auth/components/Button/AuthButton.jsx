'use client';

import React from 'react';
import { StyledButton } from '../../styles/AuthStyles';
const AuthButton = ({ children, type = 'button', onClick, disabled }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} data-oid="bxbt0-a">
      {children}
    </StyledButton>
  );
};
export default AuthButton;
