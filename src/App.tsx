import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { Columns, Header, LoginModal, Card } from 'components';

const App = () => {
  const username = useSelector((state: RootState) => state.user.name);
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpened(false);
  };

  useEffect(() => {
    if (username === '') {
      setModalOpened(true);
    }
  }, [username]);

  const [isCardOpened, setCardOpened] = useState<boolean>(false);

  const openCard = () => setCardOpened(true);
  const closeCard = () => setCardOpened(false);

  return (
    <Root>
      <Header />
      <Columns openCard={openCard} />
      <LoginModal closeModal={closeModal} isOpened={isModalOpened} />
      <Card closeCard={closeCard} isOpened={isCardOpened} />
    </Root>
  );
};

export default App;

const Root = styled.div`
  padding: 30px 60px;
`;
// some release changes
