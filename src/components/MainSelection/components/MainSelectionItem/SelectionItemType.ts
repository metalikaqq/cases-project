import { StaticImageData } from 'next/image';

export type MainSelectionItemProps = {
  linkHref: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  text: string;
  width?: number;
  height?: number;
  animationDelay?: number;
};
