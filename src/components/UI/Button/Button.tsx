import React, { FC, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Root {...rest}>
      <div>{children}</div>
    </Root>
  );
};

export default Button;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Root = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  background-color: #7dadb0;
  border-radius: 8px;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #679598;
  }
`;
