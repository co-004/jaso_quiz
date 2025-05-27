import React from 'react';
import styles from "../css/navbar.module.scss";

const Navbar = () => {
  return (
    <header>
      <div className={styles.navHidden}>
        <a className={styles.logo} href="/article-main.html">
          <img src="/assets/nav-logo.svg" alt="logo" />
        </a>
        <div className={styles.navbar}>
          <div className={styles.navCenter}>
            <ul>
              <li><a href="/guide.html">食物庫</a></li>
              <li><a href="/article.html">素食知識</a></li>
              <li><a href="/quiz.html">營養素算</a></li>
            </ul>
          </div>
          <div className={styles.navRight}>
            <div className={styles.member}>會員</div>
            <a className={styles.shopList} href="/shop-list.html">
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
