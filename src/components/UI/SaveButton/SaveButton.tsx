import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const SaveButton: FC<SaveButtonProps> = ({ children, ...rest }) => {
  return <Root {...rest}>{children}</Root>;
};

export default SaveButton;

interface SaveButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Root = styled.button`
  height: 30px;
  background-color: #7dadb0;
  padding: 5px 12px;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  &:hover {
    background-color: #10a6b1;
  }
`;
