import React, { FC } from 'react';
import styled from 'styled-components';

import { EditSvg } from 'components/svg';

const CardPreview: FC<CardPreviewProps> = ({ title }) => {
  return (
    <Root>
      <div>{title}</div>
      <EditButton>
        <EditSvg />
      </EditButton>
    </Root>
  );
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #e2e2e2;
  }
`;

const EditButton = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #c9c9c9;
  }
`;
