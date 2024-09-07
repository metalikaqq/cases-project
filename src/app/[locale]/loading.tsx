import s from './page.module.scss';

export default function Loading() {
  return (
    <div className={s.loadingContainer}>
      <div className={s.loader}></div>
    </div>
  );
}
