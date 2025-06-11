import React from 'react';
import s from './ProductScroll.module.scss';

interface SocialShareProps {
  isUkrainian: boolean;
}

export const SocialShare: React.FC<SocialShareProps> = ({ isUkrainian }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault();
    // Pinterest share logic could be implemented here
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={s.social}>
      <a href="#" className="share" onClick={handleShare}>
        {isUkrainian ? 'Поширити' : 'Share'}
      </a>
      <a href="#" className="pin" onClick={handlePin}>
        {isUkrainian ? 'Закріпити' : 'Pin It'}
      </a>
    </div>
  );
};
