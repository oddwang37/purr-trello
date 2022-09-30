import React, { FC, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

import { DescriptionSvg } from 'components/svg';

const Description: FC<DescriptionProps> = ({
  description = '',
  editDescription,
  deleteDescription,
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => {
    setTextareaValue(description);
    setIsEditable(true);
  };
  const disableEdit = () => setIsEditable(false);

  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const saveDescription = () => {
    editDescription(textareaValue);
    setTextareaValue('');
    disableEdit();
  };

  const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>): any => {
    if (e.key === 'Enter') {
      saveDescription();
    }
  };

  const onFocusCursorToEnd = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const text = textareaValue;
    e.target.value = '';
    e.target.value = text;
  };

  const StaticDescription = () => {
    return description ? (
      <DescriptionText>{description}</DescriptionText>
    ) : (
      <DescriptionButton onClick={enableEdit}>Add more detailed description...</DescriptionButton>
    );
  };

  return (
    <>
      <FlexWrapper>
        <DescriptionSvg />
        <Title>Description</Title>
        <Edit onClick={enableEdit}>Edit</Edit>
        <Delete onClick={deleteDescription}>Delete</Delete>
      </FlexWrapper>
      {isEditable ? (
        <DescriptionEditAreaWrapper>
          <DescriptionTextArea
            onKeyDown={onEnterPress}
            onChange={handleTextareaChange}
            value={textareaValue}
            onFocus={onFocusCursorToEnd}
            autoFocus
          />
          <ButtonsWrapper>
            <SaveButton onClick={saveDescription}>Save</SaveButton>
            <CancelButton onClick={disableEdit}>Cancel</CancelButton>
          </ButtonsWrapper>
        </DescriptionEditAreaWrapper>
      ) : (
        <StaticDescription />
      )}
    </>
  );
};

export default Description;

type DescriptionProps = {
  description: string;
  editDescription: (newDescr: string) => void;
  deleteDescription: () => void;
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const Edit = styled.div`
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
const Delete = styled(Edit)``;
const DescriptionText = styled.div`
  font-size: 14px;
  padding: 7px 15px;
  margin: 10px 0 20px 30px;
`;
const DescriptionButton = styled.div`
  height: 80px;
  margin: 10px 0 20px 30px;
  border-radius: 5px;
  width: 450px;
  cursor: pointer;
  font-size: 14px;
  padding: 7px 15px;
  background-color: rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
const DescriptionEditAreaWrapper = styled.div`
  margin: 10px 0 20px 30px;
`;
const DescriptionTextArea = styled.textarea`
  resize: none;
  height: 80px;
  width: 450px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 7px 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  &:focus {
    outline: 1px solid #000;
  }
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;
export const SaveButton = styled.div`
  height: 30px;
  background-color: #7dadb0;
  padding: 4px 8px;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
`;
export const CancelButton = styled(SaveButton)`
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
`;
