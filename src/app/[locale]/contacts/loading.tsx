import React from 'react';
import s from './page.module.scss';

const Loader = () => (
  <div className={s.loader}>
    <div className={s.bouncingDots}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
