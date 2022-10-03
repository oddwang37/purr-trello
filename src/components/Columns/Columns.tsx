import React, { FC } from 'react';
import styled from 'styled-components';

import Column from './components/Column/Column';
import { useSelector } from 'react-redux';
import { columnSelectors } from 'redux/ducks/columns';
import { ColumnType } from 'types/columns';

const Columns: FC<ColumnsProps> = ({ openCard }) => {
  const columns = useSelector(columnSelectors.selectColumns);

  return (
    <Root>
      {columns.map((item: ColumnType) => {
        return <Column openCard={openCard} id={item.id} heading={item.heading} key={item.id} />;
      })}
    </Root>
  );
};

export default Columns;

type ColumnsProps = {
  openCard: () => void;
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;
