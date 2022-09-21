import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input: FC<InputProps> = (props) => {
  return <Root {...props} />;
};

export default Input;

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Root = styled.input`
  height: 30px;
  width: 100%;
  display: block;
  border: none;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 2px 10px;
  &:focus {
    outline: 1px solid #000;
  }
`;
