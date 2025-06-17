'use client';
import s from './page.module.scss';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from '@/navigation';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import BlueButton from '@/UI/BlueButton/BlueButton';
import { useState, useCallback } from 'react';

function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'settings'>('orders');

  // Animation hooks for different sections
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLElement>({
    animationType: 'fadeInDown',
    delay: 100,
    threshold: 0.1,
  });

  const [contentRef, isContentVisible] = useScrollAnimation<HTMLDivElement>({
    animationType: 'fadeInUp',
    delay: 300,
    threshold: 0.1,
  });

  const [statsRef, isStatsVisible] = useScrollAnimation<HTMLDivElement>({
    animationType: 'scaleIn',
    delay: 500,
    threshold: 0.1,
  });

  // Mock data - in real app this would come from API
  const orders = [
    {
      id: 1001,
      date: '2024-11-15',
      total: '$325.99',
      status: 'Delivered',
      items: 2,
      tracking: 'TRK001234567',
    },
    {
      id: 1002,
      date: '2024-12-01',
      total: '$89.50',
      status: 'Processing',
      items: 1,
      tracking: 'TRK001234568',
    },
    {
      id: 1003,
      date: '2024-12-10',
      total: '$450.75',
      status: 'Shipped',
      items: 3,
      tracking: 'TRK001234569',
    },
  ];

  const userProfile = {
    firstName: 'Саша',
    lastName: 'Маняк',
    email: user?.email || 'sasha@example.com',
    phone: '+380 XX XXX XXXX',
    country: 'Україна',
    city: 'Київ',
    memberSince: '2023-01-15',
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + parseFloat(order.total.replace('$', '')), 0),
    deliveredOrders: orders.filter(order => order.status === 'Delivered').length,
  };

  const handleContinueShopping = useCallback(() => {
    window.location.href = '/cases';
  }, []);

  const handleLogout = useCallback(() => {
    logout?.();
  }, [logout]);

  const handleTabChange = useCallback((tab: 'orders' | 'profile' | 'settings') => {
    setActiveTab(tab);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className={s.account}>
      {/* Hero Banner Section */}
      <header
        ref={headerRef}
        className={`${s.account__hero} ${isHeaderVisible ? s.fadeInDown : ''}`}
      >
        <div className={s.account__hero__content}>
          <div className={s.account__hero__text}>
            <h1 className={s.account__hero__title}>My Account</h1>
            <p className={s.account__hero__subtitle}>
              Welcome back, {userProfile.firstName}! Manage your orders and account settings
            </p>
            {!user?.isEmailVerified && (
              <div className={s.account__hero__notice}>
                <span className={s.notice__icon}>⚠️</span>
                <span>Please verify your email to access all features</span>
                <Link href="/en/verify-email-pending" className={s.notice__link}>
                  Verify Now
                </Link>
              </div>
            )}
          </div>
          <div className={s.account__hero__actions}>
            <BlueButton text="Continue Shopping" onClick={handleContinueShopping} />
            <button onClick={handleLogout} className={s.logout__button}>
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section
        ref={statsRef}
        className={`${s.account__stats} ${isStatsVisible ? s.scaleIn : ''}`}
      >
        <div className={s.stats__card}>
          <div className={s.stats__number}>{userProfile.totalOrders}</div>
          <div className={s.stats__label}>Total Orders</div>
          <div className={s.stats__icon}>📦</div>
        </div>
        <div className={s.stats__card}>
          <div className={s.stats__number}>${userProfile.totalSpent.toFixed(2)}</div>
          <div className={s.stats__label}>Total Spent</div>
          <div className={s.stats__icon}>💰</div>
        </div>
        <div className={s.stats__card}>
          <div className={s.stats__number}>{userProfile.deliveredOrders}</div>
          <div className={s.stats__label}>Delivered</div>
          <div className={s.stats__icon}>✅</div>
        </div>
        <div className={s.stats__card}>
          <div className={s.stats__number}>
            {new Date().getFullYear() - new Date(userProfile.memberSince).getFullYear()}y
          </div>
          <div className={s.stats__label}>Member Since</div>
          <div className={s.stats__icon}>⭐</div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className={s.account__tabs}>
        <button
          className={`${s.tab__button} ${activeTab === 'orders' ? s.tab__active : ''}`}
          onClick={() => handleTabChange('orders')}
        >
          Order History
        </button>
        <button
          className={`${s.tab__button} ${activeTab === 'profile' ? s.tab__active : ''}`}
          onClick={() => handleTabChange('profile')}
        >
          Profile Details
        </button>
        <button
          className={`${s.tab__button} ${activeTab === 'settings' ? s.tab__active : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          Account Settings
        </button>
      </nav>

      {/* Main Content */}
      <main
        ref={contentRef}
        className={`${s.account__content} ${isContentVisible ? s.fadeInUp : ''}`}
      >
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <section className={s.orders__section}>
            <div className={s.section__header}>
              <h2 className={s.section__title}>Recent Orders</h2>
              <p className={s.section__subtitle}>Track and manage your order history</p>
            </div>

            {orders.length === 0 ? (
              <div className={s.empty__state}>
                <div className={s.empty__icon}>🛒</div>
                <h3 className={s.empty__title}>No Orders Yet</h3>
                <p className={s.empty__description}>
                  Start shopping to see your orders here! Browse our premium road cases collection.
                </p>
                <BlueButton text="Start Shopping" onClick={handleContinueShopping} />
              </div>
            ) : (
              <div className={s.orders__grid}>
                {orders.map((order, index) => (
                  <div
                    key={order.id}
                    className={s.order__card}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={s.order__header}>
                      <div className={s.order__id}>Order #{order.id}</div>
                      <div className={`${s.order__status} ${s[`status__${getStatusColor(order.status)}`]}`}>
                        {order.status}
                      </div>
                    </div>

                    <div className={s.order__details}>
                      <div className={s.order__info}>
                        <span className={s.info__label}>Date:</span>
                        <span className={s.info__value}>
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className={s.order__info}>
                        <span className={s.info__label}>Items:</span>
                        <span className={s.info__value}>{order.items}</span>
                      </div>
                      <div className={s.order__info}>
                        <span className={s.info__label}>Total:</span>
                        <span className={s.info__value}>{order.total}</span>
                      </div>
                      <div className={s.order__info}>
                        <span className={s.info__label}>Tracking:</span>
                        <span className={s.info__value}>{order.tracking}</span>
                      </div>
                    </div>

                    <div className={s.order__actions}>
                      <button className={s.order__button__secondary}>Track Order</button>
                      <button className={s.order__button__primary}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section className={s.profile__section}>
            <div className={s.section__header}>
              <h2 className={s.section__title}>Profile Information</h2>
              <p className={s.section__subtitle}>Manage your personal details</p>
            </div>

            <div className={s.profile__grid}>
              <div className={s.profile__card}>
                <h3 className={s.card__title}>Personal Information</h3>
                <div className={s.profile__fields}>
                  <div className={s.profile__field}>
                    <label className={s.field__label}>Full Name</label>
                    <div className={s.field__value}>{userProfile.firstName} {userProfile.lastName}</div>
                  </div>
                  <div className={s.profile__field}>
                    <label className={s.field__label}>Email Address</label>
                    <div className={s.field__value}>{userProfile.email}</div>
                  </div>
                  <div className={s.profile__field}>
                    <label className={s.field__label}>Phone Number</label>
                    <div className={s.field__value}>{userProfile.phone}</div>
                  </div>
                </div>
                <button className={s.card__action}>Edit Information</button>
              </div>

              <div className={s.profile__card}>
                <h3 className={s.card__title}>Address Information</h3>
                <div className={s.profile__fields}>
                  <div className={s.profile__field}>
                    <label className={s.field__label}>Country</label>
                    <div className={s.field__value}>{userProfile.country}</div>
                  </div>
                  <div className={s.profile__field}>
                    <label className={s.field__label}>City</label>
                    <div className={s.field__value}>{userProfile.city}</div>
                  </div>
                </div>
                <button className={s.card__action}>Manage Addresses</button>
              </div>
            </div>
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <section className={s.settings__section}>
            <div className={s.section__header}>
              <h2 className={s.section__title}>Account Settings</h2>
              <p className={s.section__subtitle}>Manage your account preferences and security</p>
            </div>

            <div className={s.settings__grid}>
              <div className={s.settings__card}>
                <h3 className={s.card__title}>Security</h3>
                <div className={s.settings__options}>
                  <button className={s.settings__option}>
                    <span className={s.option__icon}>🔒</span>
                    <span className={s.option__text}>Change Password</span>
                    <span className={s.option__arrow}>→</span>
                  </button>
                  <button className={s.settings__option}>
                    <span className={s.option__icon}>📧</span>
                    <span className={s.option__text}>Email Verification</span>
                    <span className={s.option__arrow}>→</span>
                  </button>
                </div>
              </div>

              <div className={s.settings__card}>
                <h3 className={s.card__title}>Preferences</h3>
                <div className={s.settings__options}>
                  <button className={s.settings__option}>
                    <span className={s.option__icon}>🌐</span>
                    <span className={s.option__text}>Language & Region</span>
                    <span className={s.option__arrow}>→</span>
                  </button>
                  <button className={s.settings__option}>
                    <span className={s.option__icon}>🔔</span>
                    <span className={s.option__text}>Notifications</span>
                    <span className={s.option__arrow}>→</span>
                  </button>
                </div>
              </div>

              <div className={s.settings__card}>
                <h3 className={s.card__title}>Account Management</h3>
                <div className={s.settings__options}>
                  <button className={s.settings__option}>
                    <span className={s.option__icon}>📊</span>
                    <span className={s.option__text}>Download Data</span>
                    <span className={s.option__arrow}>→</span>
                  </button>
                  <button className={`${s.settings__option} ${s.option__danger}`}>
                    <span className={s.option__icon}>🗑️</span>
                    <span className={s.option__text}>Delete Account</span>
                    <span className={s.option__arrow}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AccountPage;
