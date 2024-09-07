"use client"

import { Key, useState } from "react";
import Image from "next/image";
import s from "./page.module.scss";
import { useDraggableScroll } from "@/hooks/useDraggableScroll";
import Modal from "@/UI/Modal";
import EmailForm from "@/components/EmailForm";
import useRoadCasesInfo from "@/api/roadCasesInfo";
import { slugify } from "@/utils/slugify";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Page({ params }: any) {
  const roadCasesInfo = useRoadCasesInfo();
  const formattedProductName = params.product.replace(/-/g, " ");

  const caseKey = Object.keys(roadCasesInfo).find(
    (key) => slugify(roadCasesInfo[key].title) === params.product
  );

  const productInfo = caseKey ? roadCasesInfo[caseKey] : null;

  const [currentImage, setCurrentImage] = useState(productInfo ? productInfo.images[0] : null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollRef = useDraggableScroll();

  if (!productInfo) {
    return <div>Product not found</div>;
  }

  return (
    <div className={s.product}>
      <div className={s.product__images}>
        <div className={s.main_image}>
          {currentImage && (
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              layout="responsive"
              width={800}
              height={600}
              className={s.image}
            />
          )}
        </div>
        <div className={s.thumbnails} ref={scrollRef}>
          {productInfo.images.map((image: { src: string | StaticImport; alt: string; }, index: Key | null | undefined) => (
            <div
              key={index}
              className={s.thumbnail}
              onClick={() => setCurrentImage(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="responsive"
                width={160}
                height={120}
                className={s.image}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={s.productScroll}>
        <div className={s.productContent}>
          <div />

          <div className={s.productTitle}>{productInfo.title}</div>

          <div className={s.divider} />

          <div className={s.productDescription}>
            <p className={s.productParagraph}>
              {productInfo.ProductDescription1}
            </p>

            <p className={s.productParagraph}>
              {productInfo.ProductDescription2}
            </p>

            <p className={s.productParagraph}>
              {productInfo.ProductDescription3}
            </p>

            <ul className={s.productList}>
              <li className={s.productListItem}>
                {productInfo.ProductListItem1}
              </li>
              <li className={s.productListItem}>
                {productInfo.ProductListItem2}
              </li>
            </ul>

            <p className={s.productParagraph}>
              {productInfo.ProductDescription4}
            </p>

            <ul className={s.productList}>
              <li className={s.productListItem}>
                <strong>{productInfo.ProductListItem3}</strong>
              </li>
              <ul className={s.nestedList}>
                <li className={s.nestedListItem}>
                  <span>{productInfo.NestedListItem1}</span>
                </li>
              </ul>
              <li className={s.productListItem}>
                <strong>{productInfo.ProductListItem4}</strong>
              </li>
              <ul className={s.nestedList}>
                <li className={s.nestedListItem}>
                  {productInfo.NestedListItem2}
                </li>
              </ul>
              <li className={s.productListItem}>
                <strong>{productInfo.ProductListItem5}</strong>
              </li>
              <ul className={s.nestedList}>
                <li className={s.nestedListItem}>
                  {productInfo.NestedListItem3}
                </li>
              </ul>
            </ul>
          </div>
        </div>

        <div className={s.productButtons}>
          <a
            href="https://cdn.shopify.com/s/files/1/0664/4275/6332/files/24X30CASEV5.00A4_1.pdf?v=1664743615"
            className={s.link}
          >
            {productInfo.DownloadLinkText}
          </a>

          <button onClick={openModal} className={s.button__blue}>
            {productInfo.ContactUsButton}
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <EmailForm selectedValue={productInfo.title} />
          </Modal>

          <button className={s.accordion}>Specifications</button>
          <button className={s.accordion}>Shipping Info</button>
          <div className={s.social}>
            <a href="#" className={s.share}>
              Share
            </a>
            <a href="#" className={s.pin}>
              Pin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
