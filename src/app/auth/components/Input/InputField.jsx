'use client';

import React from 'react';

import { InputWrapper, StyledInput } from '../../styles/AuthStyles';

const InputField = React.forwardRef(({ type = 'text', ...props }, ref) => {
  return (
    <InputWrapper>
      <StyledInput type={type} ref={ref} {...props} />
    </InputWrapper>
  );
});

InputField.displayName = 'InputField';

export default InputField;
