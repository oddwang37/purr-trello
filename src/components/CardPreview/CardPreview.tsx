import React, { FC } from 'react';
import styled from 'styled-components';

const CardPreview: FC<CardPreviewProps> = ({ title }) => {
  return <Root>{title}</Root>;
};

export default CardPreview;

type CardPreviewProps = {
  title: string;
};

const Root = styled.div`
  height: 32px;
  width: 100%;
  padding: 5px 14px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  &:hover {
    background-color: #e2e2e2;
  }
`;
