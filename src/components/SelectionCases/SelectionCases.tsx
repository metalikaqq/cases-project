"use client";

import s from "./SelectionCases.module.scss";
import SelectionCasesItem from "../SelectionCasesItem";

export default function SelectionCases() {
  return (
    <div className={s.selection_cases}>
      <SelectionCasesItem />
      <SelectionCasesItem />
    </div>
  );
}
