import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.css';

import avatarImg from '/src/assets/avatar.png';
import gearImg from '/src/assets/gear.png';

const NavigationMenu = () => {
  return (
    <aside className={`${styles.menu}`}>
      <div className="d-flex flex-column align-items-center">
        <div className={styles.menu__avatar_wrapper}>
          <img
            src={avatarImg}
            alt="User avatar"
            className={styles.menu__avatar}
          />
          <img
            src={gearImg}
            alt="Settings"
            className={styles.menu__settings_icon}
          />
        </div>

        <nav className="w-100">
          {[
            { to: '/orders', label: 'Приход' },
            { to: '/groups', label: 'Группы' },
            { to: '/products', label: 'Продукты' },
            { to: '/users', label: 'Пользователи' },
            { to: '/settings', label: 'Настройки' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `d-block px-3 py-2 text-uppercase fw-medium text-decoration-none ${
                  styles.menu__nav_item
                } ${isActive ? styles['menu__nav_item--active'] : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default NavigationMenu;
