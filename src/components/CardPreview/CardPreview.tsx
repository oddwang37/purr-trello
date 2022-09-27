import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import { EditSvg } from 'components/svg';
import { SaveButton } from 'components';

const CardPreview: FC<CardPreviewProps> = ({
  title,
  columnId,
  cardId,
  commentsQ,
  editCardTitle,
  changePopupCardId,
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const [textareaVal, setTextareaVal] = useState<string>(title);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaVal(e.target.value);
  };

  const onClickSave = () => {
    editCardTitle(cardId, textareaVal);
    disableEdit();
  };

  const onClickEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    enableEdit();
  };

  const onClickCard = (e: React.MouseEvent<HTMLElement>) => {
    changePopupCardId(cardId);
  };

  useEffect(() => {
    setTextareaVal(title);
  }, [title]);

  return (
    <>
      {isEditable ? (
        <EditInterface>
          <EditArea onChange={handleChange} value={textareaVal} autoFocus />
          <SaveButton onClick={onClickSave}>Save</SaveButton>
        </EditInterface>
      ) : (
        <Title onClick={onClickCard}>
          {title}
          <EditButton onClick={onClickEdit}>
            <EditSvg />
          </EditButton>
          {commentsQ > 0 ? <Comments>{commentsQ} comments</Comments> : null}
        </Title>
      )}
    </>
  );
};

export default CardPreview;

type CardPreviewProps = {
  title: string;
  columnId: number;
  cardId: number;
  commentsQ: number;
  editCardTitle: (cardId: number, newTitle: string) => void;
  changePopupCardId: (cardId: number) => void;
};

const Title = styled.div`
  min-height: 46px;
  width: 100%;
  padding: 5px 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #e2e2e2;
  }
`;

const EditButton = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 3px;
  right: 5px;
  background-color: #eeeeee;
  &:hover {
    background-color: #c9c9c9;
  }
`;
const EditInterface = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;
const EditArea = styled.textarea`
  resize: none;
  height: 80px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 7px 15px;
  font-family: Arial, Helvetica, sans-serif;
  &:focus {
    outline: 1px solid #000;
  }
`;
const Comments = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
`;
