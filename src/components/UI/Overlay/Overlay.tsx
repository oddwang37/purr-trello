import React, { FC } from 'react';
import styled from 'styled-components';

const Overlay: FC<OverlayProps> = ({ children, isOpened, onClick }) => {
  return (
    <Root onClick={onClick} isOpened={isOpened}>
      {children}
    </Root>
  );
};

export default Overlay;

type OverlayProps = {
  children: JSX.Element;
  isOpened: boolean;
  onClick?: () => void;
};

type RootProps = {
  isOpened: boolean;
};

const Root = styled.div<RootProps>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(p) => (p.isOpened ? 'block' : 'none')};
`;
