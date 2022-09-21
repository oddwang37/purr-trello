import React, { FC } from 'react';
import styled from 'styled-components';

import { AvatarSvg } from 'components/svg';

const Comment: FC<CommentProps> = ({ text, date }) => {
  return (
    <Root>
      <AvatarSvg />
      <div>
        <FlexWrapper>
          <Username>Username</Username>
          <Date>{date}</Date>
          <EditBtn>Edit</EditBtn>
          <DeleteBtn>Delete</DeleteBtn>
        </FlexWrapper>
        <Text>{text}</Text>
      </div>
    </Root>
  );
};

export default Comment;

type CommentProps = {
  text: string;
  date: string;
};
const Root = styled.div`
  display: flex;
  gap: 10px;
`;
const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Date = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;
const Username = styled.div`
  font-weight: 700;
  font-size: 14px;
`;
const Text = styled.div`
  width: 450px;
  padding: 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 5px 0;
  font-size: 14px;
`;
const EditBtn = styled(Date)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const DeleteBtn = styled(EditBtn)``;
