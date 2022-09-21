import React, { FC } from 'react';
import styled from 'styled-components';

import { Overlay, CloseButton } from 'components';
import { Description } from './Description';
import { Comments } from './Comments';
import { CardSvg } from 'components/svg';

const Card: FC<CardProps> = ({ closeCard, isOpened }) => {
  return (
    <Overlay isOpened={isOpened}>
      <Root>
        <FlexWrapper>
          <CardSvg />
          <SectionTitle>Card name</SectionTitle>
        </FlexWrapper>
        <Column>
          In <ColumnTitle>In Progress</ColumnTitle> column
          <br />
          by username
        </Column>
        <Description description="some descr" />
        <Comments
          comments={[
            { text: 'Some comment', date: '12/11/2022', id: 0 },
            { text: 'Nice comment awesome description', date: '11/12/2022', id: 1 },
          ]}
        />
        <CloseButton closeModal={closeCard} />
      </Root>
    </Overlay>
  );
};

export default Card;

type CardProps = {
  closeCard: () => void;
  isOpened: boolean;
};
const Root = styled.div`
  width: 45vw;
  height: 85vh;
  padding: 20px 0 20px 40px;
  background-color: #fff;
  position: relative;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Column = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin: 6px 0 20px 30px;
`;
const ColumnTitle = styled.span`
  text-decoration: underline;
`;
