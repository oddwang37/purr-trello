import React, { FC } from 'react';
import styled from 'styled-components';

import { Overlay, Input, Button, CloseButton } from 'components';

const LoginModal: FC<LoginModalProps> = ({ isOpened, closeModal }) => {
  return (
    <Overlay isOpened={isOpened}>
      <Root>
        <Title>Enter your name</Title>
        <Input />
        <Button>Submit</Button>
        <CloseButton closeModal={closeModal} />
      </Root>
    </Overlay>
  );
};

export default LoginModal;

type LoginModalProps = {
  isOpened: boolean;
  closeModal: () => void;
};

const Root = styled.div`
  width: 30vw;
  height: 30vh;
  background-color: #fff;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
