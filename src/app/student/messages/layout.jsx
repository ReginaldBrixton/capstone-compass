'use client';

import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  // min-height: 80vh;
  padding: 0px;
  background-color: #f8f9fa;

  @media (max-width: 770px) {
    min-height: 50vh;
  }
`;

const ContentWrapper = styled.div`
  padding: 10px;
  max-width: 97%;
  margin: 0 auto;
  @media (max-width: 770px) {
    min-height: 50vh;
  }
`;

const MessagesLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default MessagesLayout;
