import React, { FC } from 'react';
import styled from 'styled-components';

const CloseButton: FC<CloseBtnProps> = ({ closeModal }) => {
  return <Root onClick={closeModal}>&times;</Root>;
};

export default CloseButton;

type CloseBtnProps = {
  closeModal: () => void;
};

const Root = styled.div`
  font-size: 26px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
