import React, { FC } from 'react';
import styled from 'styled-components';

import { ColumnsType } from 'types/columns';
import Column from './Column/Column';

const Columns: FC<ColumnsProps> = ({ columnsInfo }) => {
  return (
    <Root>
      {columnsInfo.map((item) => {
        return <Column id={item.id} title={item.title} cards={item.cards} key={item.id} />;
      })}
    </Root>
  );
};

export default Columns;

type ColumnsProps = {
  columnsInfo: ColumnsType;
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
