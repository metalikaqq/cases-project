import Image from "next/image";
import s from "./SelectionCases.module.scss";
import caseImage from "../../image/road_cases_collection_1_360x.webp";
import SelectionCasesItem from "../SelectionCasesItem";

export type SelectionCasesProps = {
  // props go here
};

export default function SelectionCases(props: SelectionCasesProps) {
  return (
    <div className={s.selection_cases}>
      <SelectionCasesItem />
      <SelectionCasesItem />
      <SelectionCasesItem />
      <SelectionCasesItem />
      <SelectionCasesItem />
      <SelectionCasesItem />
      <SelectionCasesItem />
      <SelectionCasesItem />
    </div>
  );
}
