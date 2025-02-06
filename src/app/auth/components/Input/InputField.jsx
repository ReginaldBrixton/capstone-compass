'use client';

import React from 'react';
import { InputWrapper, StyledInput } from '../../styles/AuthStyles';
const InputField = React.forwardRef(({ type = 'text', ...props }, ref) => {
  return (
    <InputWrapper data-oid="lq8u.cn">
      <StyledInput type={type} ref={ref} {...props} data-oid="f4dc3bz" />
    </InputWrapper>
  );
});
InputField.displayName = 'InputField';
export default InputField;
