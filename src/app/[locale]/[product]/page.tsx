"use client"

import s from "./page.module.scss";

import ProductScroll from "./components/ProductScroll/ProductScroll";
import ProductImages from "./components/ProductImages/ProductImages";

export default function Page({ params }: any) {
  if (!params.product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={s.product}>
      {/* <div className={s.product__img_wrapper}> */}
      <ProductImages product={params.product} />
      {/* </div> */}
      <ProductScroll product={params.product} />
    </div>
  );
}
