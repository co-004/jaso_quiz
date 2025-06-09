import React from 'react';
import styles from "../css/navbar.module.scss";
// import navLogo from '../../public/assets/nav-logo.svg'

const Navbar = () => {
  return (
    <header>
      <div className={styles.navHidden}>
        <a className={styles.logo} href="/jaso_quiz/">
        <img src={`${import.meta.env.BASE_URL}assets/nav-logo.svg`} alt="logo"/>
          {/* <img src={navLogo} alt="logo" /> */}
        </a>
        <div className={styles.navbar}>
          <div className={styles.navCenter}>
            <ul>
              <li><a href="/jaso_quiz/">食物庫</a></li>
              <li><a href="/jaso_quiz/">素食知識</a></li>
              <li><a href="/jaso_quiz/">營養素算</a></li>
            </ul>
          </div>
          <div className={styles.navRight}>
            <div className={styles.member}>會員</div>
            <a className={styles.shopList} href="/jaso_quiz/">
              <img src="/assets/shop-list.svg" alt="" />
            </a>

            <div className={styles.beanShape}>
              <div className={styles.goToShop}>素購</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
