import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { CommentsSvg, AvatarSvg } from 'components/svg';
import {
  SaveButton,
  CancelButton,
  ButtonsWrapper,
} from 'components/Card/components/Description/Description';
import { Comment } from './components/Comment';

const Comments: FC<CommentsProps> = ({ comments, addComment }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickSend = () => {
    addComment(inputValue);
    disableEdit();
    setInputValue('');
  };

  return (
    <>
      <FlexWrapper>
        <CommentsSvg />
        <Title>Comments</Title>
      </FlexWrapper>
      <InputWrapper>
        <AvatarSvg />
        {isEditable ? (
          <CommentSending>
            <Field
              placeholder="Write a comment..."
              onChange={handleChange}
              value={inputValue}
              autoFocus
            />
            <ButtonsWrapper>
              <SaveButton onClick={onClickSend}>Send</SaveButton>
              <CancelButton onClick={disableEdit}>Cancel</CancelButton>
            </ButtonsWrapper>
          </CommentSending>
        ) : (
          <CommentButton onClick={enableEdit}>Add a comment...</CommentButton>
        )}
      </InputWrapper>
      {comments ? (
        <CommentsSection>
          {comments.reverse().map((item) => (
            <Comment text={item.text} date={item.date} key={item.id} />
          ))}
        </CommentsSection>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Comments;

type CommentsProps = {
  comments?: { text: string; date: string; id: string }[];
  addComment: (commentText: string) => void;
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const CommentSending = styled.div``;
const CommentButton = styled.div`
  width: 450px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
const InputWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`;
const Field = styled.input`
  width: 450px;
  height: 30px;
  padding: 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &:focus {
    outline: 1px solid #000;
  }
`;
const CommentsSection = styled.div`
  margin-top: 15px;
  height: 50%;
  overflow-y: scroll;
`;
