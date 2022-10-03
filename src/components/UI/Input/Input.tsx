import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { useController, UseControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type TextInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  id?: string;
} & UseControllerProps<TFieldValues, TName> &
  InputHTMLAttributes<HTMLInputElement>;

const Input = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  id,
  control,
  name,
}: TextInputProps<TFieldValues, TName>) => {
  const { field } = useController({ control, name });

  return <Root {...field} placeholder={name} />;
};

export default Input;

const Root = styled.input`
  height: 30px;
  width: 100%;
  display: block;
  border: none;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 2px 10px;
  &:focus {
    outline: 1px solid #000;
  }
`;
