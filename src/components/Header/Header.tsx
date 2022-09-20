import React, { FC } from 'react';
import styled from 'styled-components';

const Header: FC<HeaderProps> = ({ username }) => {
  return (
    <Root>
      <Logo>logoTrello</Logo>
      <Username>{username}</Username>
    </Root>
  );
};

export default Header;

type HeaderProps = {
  username: string;
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-weight: 700;
  margin-bottom: 20px;
  height: 36px;
`;
const Logo = styled.div`
  font-size: 22px;
`;
const Username = styled.div`
  padding: 6px 10px;
  background-color: #7a4ac7;
  border-radius: 5px;
`;
