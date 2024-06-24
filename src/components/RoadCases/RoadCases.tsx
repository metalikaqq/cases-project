import SelectionCasesItem from "../MainSelection/components/MainSelectionItem";
import s from "./RoadCases.module.scss";

export type RoadCasesProps = {
  // props go here
};
export default function RoadCases(props: RoadCasesProps) {
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
