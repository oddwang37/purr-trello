import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { DescriptionSvg } from 'components/svg';

const Description: FC<DescriptionProps> = ({ description }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const enableEdit = () => setIsEditable(true);
  const disableEdit = () => setIsEditable(false);

  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  return (
    <>
      <FlexWrapper>
        <DescriptionSvg />
        <Title>Description</Title>
      </FlexWrapper>
      {isEditable ? (
        <DescriptionEdit>
          <DescriptionArea autoFocus onChange={handleTextareaChange} value={textareaValue} />
          <ButtonsWrapper>
            <SaveButton>Save</SaveButton>
            <CancelButton onClick={disableEdit}>Cancel</CancelButton>
          </ButtonsWrapper>
        </DescriptionEdit>
      ) : (
        <DescriptionButton onClick={enableEdit}>Add more detailed description...</DescriptionButton>
      )}
    </>
  );
};

export default Description;

type DescriptionProps = {
  description: string;
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const DescriptionButton = styled.div`
  height: 80px;
  margin: 20px 0 20px 30px;
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
const DescriptionEdit = styled.div`
  margin: 20px 0 20px 30px;
`;
const DescriptionArea = styled.textarea`
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
