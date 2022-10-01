import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Overlay, Input, Button } from 'components';
import { useAppDispatch } from 'redux/store';
import { setUsername } from 'redux/features/username/usernameSlice';

const LoginModal: FC<LoginModalProps> = ({ isOpened, closeModal }) => {
  const dispatch = useAppDispatch();
  const [inputVal, setInputVal] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const onSubmitClick = () => {
    dispatch(setUsername(inputVal));
    closeModal();
  };
  return (
    <Overlay isOpened={isOpened}>
      <Root>
        <Title>Enter your name</Title>
        <Input onChange={handleChange} value={inputVal} />
        <Button onClick={onSubmitClick}>Submit</Button>
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
