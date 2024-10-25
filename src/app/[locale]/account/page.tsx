import s from './page.module.scss';

function AccountPage() {
  const orders = [
    {
      id: 1,
      date: '2023-09-21',
      total: '$120.00',
    },
    {
      id: 2,
      date: '2023-10-01',
      total: '$55.50',
    },
    {
      id: 3,
      date: '2023-10-15',
      total: '$250.75',
    },
  ];

  return (
    <div className={s.account}>
      <div className={s.account__header}>
        <h1 className={s.account__header__title}>MY ACCOUNT</h1>
        <button className={s.account__header__button}>log out</button>
      </div>

      <div className={s.account__info}>
        <div className={s.account__orders}>
          <h2 className={s.account__info__title}>ORDER HISTORY</h2>

          {orders.length === 0 ? (
            <p
              className={s.account__info__text}
            >{`You haven't placed any orders yet.`}</p>
          ) : (
            <ul className={s.account__orders__list}>
              {orders.map((order) => (
                <li key={order.id} className={s.account__orders__item}>
                  <span>Order #{order.id}</span>
                  <span>{order.date}</span>
                  <span>{order.total}</span>
                  <button className={s.account__orders__button}>
                    View Order
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={s.account__details}>
          <h3 className={s.account__details__title}>ACCOUNT DETAILS</h3>
          <span className={s.account__details__subtitle}>Маняк Олександр</span>

          <div className={s.account__details__info}>
            <p className={s.account__name}>Саша Маняк</p>
            <p className={s.account__country}>Україна</p>
          </div>

          <button className={s.account__details__button}>
            View address (1)
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
