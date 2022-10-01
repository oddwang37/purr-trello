import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const Header: FC<HeaderProps> = () => {
  const username = useSelector((state: RootState) => state.username);
  return (
    <Root>
      <Logo>logoTrello</Logo>
      {username ? <Username>{username}</Username> : null}
    </Root>
  );
};

export default Header;

type HeaderProps = {};

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
