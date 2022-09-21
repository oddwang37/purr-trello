import React, { useState } from 'react';
import styled from 'styled-components';

import { ColumnsType } from 'types/columns';
import { Columns, Header, LoginModal, Card } from 'components';

const App = () => {
  const [columnsInfo, setColumnsInfo] = useState<ColumnsType>([
    {
      id: 0,
      title: 'TODO',
      cards: [
        { title: 'Some title', id: 0 },
        { title: 'Another one title', id: 1 },
      ],
    },
    {
      id: 1,
      title: 'In Progress',
      cards: [
        { title: 'Some second', id: 0 },
        { title: 'Another one title', id: 1 },
        { title: 'And another one', id: 2 },
      ],
    },
    {
      id: 2,
      title: 'Testing',
      cards: [
        { title: 'Some third title', id: 0 },
        { title: 'Another one title', id: 1 },
      ],
    },
    {
      id: 3,
      title: 'Done',
      cards: [
        { title: 'Some fourth title', id: 0 },
        { title: 'Another one title', id: 1 },
      ],
    },
  ]);

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const closeModal = () => {
    setModalOpened(false);
  };

  const [isCardOpened, setCardOpened] = useState<boolean>(true);

  const closeCard = () => {
    setCardOpened(false);
  };

  return (
    <Root>
      <Header username="username" />
      <Columns columnsInfo={columnsInfo} />
      <LoginModal closeModal={closeModal} isOpened={isModalOpened} />
      <Card closeCard={closeCard} isOpened={isCardOpened} />
    </Root>
  );
};

export default App;

const Root = styled.div`
  padding: 30px 60px;
`;
