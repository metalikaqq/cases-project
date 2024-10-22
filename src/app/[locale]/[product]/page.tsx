'use client';

import s from './page.module.scss';

import ProductScroll from './components/ProductScroll/ProductScroll';
import ProductImages from './components/ProductImages/ProductImages';

export default function Page({ params }: any) {
  if (!params.product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={s.product}>
      <ProductImages product={params.product} />
      <ProductScroll product={params.product} />
    </div>
  );
}
