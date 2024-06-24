import React from 'react';
import s from './BlueButton.module.scss';

export type BlueButtonProps = {
  text: string;
  onClick: () => void;
};

export default function BlueButton({ text, onClick }: BlueButtonProps) {
  return (
    <button className={s.button} onClick={onClick}>
      {text}
    </button>
  );
}
