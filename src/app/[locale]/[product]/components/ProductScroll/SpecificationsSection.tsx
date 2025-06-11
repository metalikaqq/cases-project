import React from 'react';
import s from './ProductScroll.module.scss';

interface SpecificationsSectionProps {
  isUkrainian: boolean;
}

export const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({ isUkrainian }) => {
  return (
    <>
      {isUkrainian ? (
        <>
          <table className={s.specificationsTable}>
            <tbody>
              <tr>
                <td>Бокові панелі</td>
                <td>Чорна смола просочена 9/16&quot; березова фанера</td>
              </tr>
              <tr>
                <td>Колісна дошка</td>
                <td>5/8&quot; березова фанера з низькими вирізами для підйому</td>
              </tr>
              <tr>
                <td>Екструзії</td>
                <td>2мм власний сплав 6061-T6</td>
              </tr>
              <tr>
                <td>Обладнання</td>
                <td>Penn Elcom цинкові фітинги</td>
              </tr>
              <tr>
                <td>Колеса</td>
                <td>Penn Elcom 550LB 4&quot; сині авто ролики</td>
              </tr>
              <tr>
                <td>Облицювання</td>
                <td>Міцна пористо-комірчаста піна закритих комірок</td>
              </tr>
              <tr>
                <td>Внутрішня ємність</td>
                <td>7.9 куб.фт [225л]</td>
              </tr>
              <tr>
                <td>Об&apos;єм доставки</td>
                <td>13 куб.фт [0.35cbm]</td>
              </tr>
              <tr>
                <td>Вага</td>
                <td>87 фунтів [39.5 кг]</td>
              </tr>
              <tr>
                <td>Розміри корпусу (Д × Ш × В)</td>
                <td>24 × 30 × 30&quot; [610 × 762 × 762мм]</td>
              </tr>
            </tbody>
          </table>

          <div className={s.highlight}>
            <p>Ідеально підходить для транспортування професійного обладнання</p>
          </div>
        </>
      ) : (
        <>
          <table className={s.specificationsTable}>
            <tbody>
              <tr>
                <td>Sidings</td>
                <td>Black resin impregnated 9/16&quot; Birch Ply</td>
              </tr>
              <tr>
                <td>Wheel-board</td>
                <td>5/8&quot; Birch Ply with low lifting cut-outs</td>
              </tr>
              <tr>
                <td>Extrusions</td>
                <td>2mm proprietary 6061-T6 alloy</td>
              </tr>
              <tr>
                <td>Hardware</td>
                <td>Penn Elcom zinc plated fittings</td>
              </tr>
              <tr>
                <td>Wheels</td>
                <td>Penn Elcom 550LB 4&quot; blue auto castors</td>
              </tr>
              <tr>
                <td>Lining</td>
                <td>Durable closed cell foam</td>
              </tr>
              <tr>
                <td>Internal Capacity</td>
                <td>7.9cu.ft [225L]</td>
              </tr>
              <tr>
                <td>Shipping Volume</td>
                <td>13cu.ft [0.35cbm]</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>87lb [39.5kg]</td>
              </tr>
              <tr>
                <td>Case Dimensions (D × W × H)</td>
                <td>24 × 30 × 30&quot; [610 × 762 × 762mm]</td>
              </tr>
            </tbody>
          </table>

          <div className={s.highlight}>
            <p>Perfect for transporting professional equipment safely</p>
          </div>
        </>
      )}
    </>
  );
};
