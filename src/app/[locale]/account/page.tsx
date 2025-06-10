'use client';
import s from './page.module.scss';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';

function AccountPage() {
  const { user, isAuthenticated } = useAuth();

  const orders = [
    {
      id: 1,
      date: '2023-09-21',
      total: '$120.00',
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2023-10-01',
      total: '$55.50',
      status: 'Processing',
    },
    {
      id: 3,
      date: '2023-10-15',
      total: '$250.75',
      status: 'Shipped',
    },
  ];

  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total.replace('$', '')), 0);
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

  return (
    <div className={s.account}>
      {/* Welcome message for authenticated users */}
      {isAuthenticated && user && (
        <section className={s.welcomeMessage}>
          <h2>Welcome back, {user.email?.split('@')[0]}!</h2>
          <div className={s.quickActions}>
            <Link href="/profile" className={s.actionLink}>
              View Profile
            </Link>
            {!user.isEmailVerified && (
              <Link href="/en/verify-email-pending" className={s.actionLink}>
                Complete Email Verification
              </Link>
            )}
            <Link href="/cases" className={s.actionLink}>
              Browse Cases
            </Link>
          </div>
        </section>
      )}

      <header className={s.account__header}>
        <div>
          <h1 className={s.account__header__title}>My Account</h1>
          <p className={s.account__header__subtitle}>
            Manage your orders and account settings
          </p>
        </div>
        <div className={s.account__header__actions}>
          <button className={s.account__header__button}>
            Continue Shopping
          </button>
          <button className={s.account__header__button}>
            Log Out
          </button>
        </div>
      </header>

      <main className={s.account__info}>
        <section className={s.account__orders}>
          <h2 className={s.account__info__title}>Order History</h2>

          <div className={s.account__stats}>
            <div className={s.account__stats__item}>
              <span className={s.account__stats__item__number}>{orders.length}</span>
              <span className={s.account__stats__item__label}>Total Orders</span>
            </div>
            <div className={s.account__stats__item}>
              <span className={s.account__stats__item__number}>
                ${totalSpent.toFixed(2)}
              </span>
              <span className={s.account__stats__item__label}>Total Spent</span>
            </div>
            <div className={s.account__stats__item}>
              <span className={s.account__stats__item__number}>
                {deliveredOrders}
              </span>
              <span className={s.account__stats__item__label}>Delivered</span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className={s.account__empty_state}>
              <p>No Orders Yet</p>
              <p>Start shopping to see your orders here!</p>
            </div>
          ) : (
            <div className={s.account__orders__list}>
              {orders.map((order) => (
                <div key={order.id} className={s.account__orders__item}>
                  <span className={s.account__orders__id}>#{order.id}</span>
                  <span className={s.account__orders__date}>{order.date}</span>
                  <span className={s.account__orders__total}>{order.total}</span>
                  <span className={`${s.account__status} ${s[`account__status--${order.status.toLowerCase()}`]}`}>
                    {order.status}
                  </span>
                  <button className={s.account__orders__button}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className={s.account__details}>
          <h3 className={s.account__details__title}>Account Details</h3>
          <span className={s.account__details__subtitle}>Customer Profile</span>

          <div className={s.account__details__info}>
            <div className={s.account__details__row}>
              <span className={s.account__details__label}>Full Name</span>
              <span className={s.account__details__value}>Саша Маняк</span>
            </div>
            <div className={s.account__details__row}>
              <span className={s.account__details__label}>Country</span>
              <span className={s.account__details__value}>Україна</span>
            </div>
            <div className={s.account__details__row}>
              <span className={s.account__details__label}>Email</span>
              <span className={s.account__details__value}>{user?.email || 'sasha@example.com'}</span>
            </div>
            <div className={s.account__details__row}>
              <span className={s.account__details__label}>Phone</span>
              <span className={s.account__details__value}>+380 XX XXX XXXX</span>
            </div>
          </div>

          <div className={s.account__details__buttons}>
            <button className={s.account__details__button}>
              View Address Book
            </button>
            <button className={s.account__details__button}>
              Edit Profile
            </button>
            <button className={s.account__details__button}>
              Change Password
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default AccountPage;
