import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { EditSvg } from 'components/svg';
import { SaveButton } from 'components';

const CardPreview: FC<CardPreviewProps> = ({ title }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const [textareaVal, setTextareaVal] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaVal(e.target.value);
  };

  return (
    <>
      {isEditable ? (
        <EditInterface>
          <EditArea onChange={handleChange} value={textareaVal} />
          <SaveButton>Save</SaveButton>
        </EditInterface>
      ) : (
        <Title>
          <div>{title}</div>
          <EditButton onClick={enableEdit}>
            <EditSvg />
          </EditButton>
        </Title>
      )}
    </>
  );
};

export default CardPreview;

type CardPreviewProps = {
  title: string;
};

const Title = styled.div`
  height: 32px;
  width: 100%;
  padding: 5px 14px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 14px;
  &:focus {
    outline: 1px solid #000;
  }
`;
