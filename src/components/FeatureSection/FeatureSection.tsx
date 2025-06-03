import React, { ReactNode } from 'react';
import s from './FeatureSection.module.scss';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className={s.feature_card}>
      <div className={s.feature_card__icon}>{icon}</div>
      <h3 className={s.feature_card__title}>{title}</h3>
      <p className={s.feature_card__description}>{description}</p>
    </div>
  );
}

interface FeatureSectionProps {
  items: FeatureCardProps[];
}

export default function FeatureSection({ items }: FeatureSectionProps) {
  return (
    <div className={s.feature_section}>
      {items.map((item, index) => (
        <FeatureCard
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
