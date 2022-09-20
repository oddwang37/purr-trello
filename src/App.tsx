import React, { useState } from 'react';
import styled from 'styled-components';

import { ColumnsType } from 'types/columns';
import { Columns, Header } from 'components';

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

  return (
    <Root>
      <Header username="username" />
      <Columns columnsInfo={columnsInfo} />
    </Root>
  );
};

export default App;

const Root = styled.div`
  padding: 30px 60px;
  height: 100vh;
`;
