import React, { FC, useState, useEffect, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';

import { AvatarSvg } from 'components/svg';
import { useAppDispatch } from 'redux/store';
import { editComment, deleteComment } from 'redux/features/cards/cardsSlice';

const Comment: FC<CommentProps> = ({ id, cardId, text, date }) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>('');
  const [inputIsReadOnly, setInputIsReadOnly] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  const onClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current) {
      setInputIsReadOnly(false);
      inputRef.current.focus();
    }
  };

  const onClickDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(deleteComment({ cardId, commentId: id }));
  };

  const onBlurSave = () => {
    dispatch(editComment({ cardId, commentId: id, newText: inputValue }));
    setInputIsReadOnly(true);
  };
  const onEnterPress = (e: KeyboardEvent<HTMLInputElement>): any => {
    if (e.key === 'Enter' && inputRef.current) {
      inputRef.current.blur();
    }
  };
  const forbidFocusOnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <Root>
      <AvatarSvg />
      <div>
        <FlexWrapper>
          <Username>Username</Username>
          <Date>{date}</Date>
          <EditBtn onClick={onClickEdit}>Edit</EditBtn>
          <DeleteBtn onClick={onClickDelete}>Delete</DeleteBtn>
        </FlexWrapper>
        <TextInput
          value={inputValue}
          onChange={onChange}
          onBlur={onBlurSave}
          ref={inputRef}
          readOnly={inputIsReadOnly}
          onClick={forbidFocusOnClick}
          onKeyDown={onEnterPress}
        />
      </div>
    </Root>
  );
};

export default Comment;

type CommentProps = {
  id: string;
  cardId: string;
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
const TextInput = styled.input`
  width: 450px;
  padding: 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 5px 0 12px 0;
  font-size: 14px;
`;
const EditBtn = styled(Date)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const DeleteBtn = styled(EditBtn)``;
