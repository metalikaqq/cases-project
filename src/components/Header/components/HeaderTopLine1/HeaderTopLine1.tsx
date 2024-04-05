import s from "./HeaderTopLine1.module.scss"

export type HeaderTopLine1Props = {
  // props go here
};
export default function HeaderTopLine1(props: HeaderTopLine1Props) {
  return (
    <div className={s.tl1}>
      <h1 className={s.tl1__text}>
        TRUCK-PACK CASES READY TO SHIP FROM LOS ANGELES
      </h1>
    </div>
  );
}
