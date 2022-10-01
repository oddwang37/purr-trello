import React, { useState } from 'react';
import styled from 'styled-components';

import { Columns, Header, LoginModal, Card } from 'components';

const App = () => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpened(false);
  };

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
