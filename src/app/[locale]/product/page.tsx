"use client"
import { useState } from 'react';
import Image from 'next/image';
import s from './page.module.scss';
import mainImage from '@/assets/image/product.webp';
import thumbnail1 from '@/assets/image/thumbnail1.webp';
import thumbnail2 from '@/assets/image/thumbnail2.webp';
import thumbnail3 from '@/assets/image/thumbnail3.webp';
import thumbnail4 from '@/assets/image/thumbnail4.webp';
import thumbnail5 from '@/assets/image/thumbnail5.webp';
import {useDraggableScroll} from '@/hooks/useDraggableScroll';

const images = [
  { src: mainImage, alt: 'Main Image' },
  { src: thumbnail1, alt: 'Thumbnail 1' },
  { src: thumbnail2, alt: 'Thumbnail 2' },
  { src: thumbnail3, alt: 'Thumbnail 3' },
  { src: thumbnail4, alt: 'Thumbnail 4' },
  { src: thumbnail5, alt: 'Thumbnail 5' },
];

function Page() {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const scrollRef = useDraggableScroll();

  return (
    <div className={s.product}>
      <div className={s.product__images}>
        <div className={s.main_image}>
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            layout="responsive"
            width={800}
            height={600}
          />
        </div>
        <div className={s.thumbnails} ref={scrollRef}>
          {images.map((image, index) => (
            <div key={index} className={s.thumbnail} onClick={() => setCurrentImage(image)}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="responsive"
                width={160}
                height={120}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={s.product__scroll}>
        <div className={s.product__content}>
          <div className={s.product__title}>24 X 30 WORKSTATION</div>
          <div className={s.product__description}>
            <p><strong>The all-in-one mobile workstation!</strong></p>
            <p>Fiasco’s mobile production workstation has proven itself on tour over the years, with a design to meet the demands of on-the-go professionals like tour managers, stage managers, or anyone needing a reliable remote office on tour.</p>
            <p>This all-in-one workbox is a versatile solution for any of your traveling office requirements. With a removable door featuring fold-out legs that attach to the side of the drawers, it can quickly transform into an ultra-sturdy desk or tool bench. The case features a mixture of five small and large drawers, which you can view the internal heights of when you download the product spec sheet.</p>
            <p>All drawers lock in unison with a single key, which provides you with a storage solution that’s not only spacious and robust, but also secure. With plenty of room, you can easily store all of your required tools, gaff tape, office supplies, first-aid kits, Clear-Coms, DI boxes, mics, and spare parts - there’s even room to hang your rigging harness! The soft-close-and-hold drawers ensure the case never tips over.</p>
            <p>The option of mounting your screen onto the workstation’s lid allows you to take your workstation from sitting to standing as you need to, which makes it ideal for control offices and front-of-house or side-of-stage setups. The desk is the perfect home for laptops or as a workbench when at the show. Travel your printer on the internal worktop and then quickly move it to the side table when needed.</p>
            <p>The case was designed for Polyproof Cases to travel on the internal worktop - ideal for Polyproof 31L and Polyproof 54L cases.</p>
          </div>
        </div>

        <div className={s.product__buttons}>
          <a href="#" className={s.link}>Download Product Spec Sheet</a>
          <button className={s.button}>Contact Us For A Quote</button>
          <button className={s.accordion}>Specifications</button>
          <button className={s.accordion}>Shipping Information</button>
          <div className={s.social}>
            <a href="#" className={s.Share}>Share</a>
            <a href="#" className={s.pin}>Pin it</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
