import React from "react";
import styles from "../css/Result.module.scss";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";


const Result = () => {



  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;
  if (!resultData) {
    return <p>請先完成測驗</p>;
  }
  const {
    bmi,
    bmr,
    tdee,
    radarScores,
    conditions
  } = resultData;
  // 六大營養素的紅配綠
  const getLevelClass = (score) => {
    if (score >= 8) return styles.high;
    if (score >= 5) return styles.medium;
    return styles.low;
  };
  const getBubble = (score) => {
    let levelClass = "";
    let text = "";

    if (score >= 8) {
      levelClass = styles.high;
      text = "正常";
    } else if (score >= 5) {
      levelClass = styles.medium;
      text = "偏低";
    } else {
      levelClass = styles.low;
      text = "嚴重偏低";
    }

    return (
      <div className={`${styles.bubble} ${levelClass}`}>
        <span>{text}</span>
      </div>
    );
  };

const nutrientKeys = ["protein", "b12", "iron", "omega3", "ca", "d"];
const nutrientLabels = {
  protein: "蛋白質",
  b12: "B12",
  iron: "鐵",
  omega3: "Omega-3",
  ca: "鈣",
  d: "維生素D"
};

  const radarLabels = {
    protein: "蛋白質",
    b12: "維生素B12",
    iron: "鐵",
    omega3: "Omega-3",
    ca: "鈣",
    d: "維生素D"
  };
  const radarData = Object.keys(radarScores).map((key) => ({
    nutrient: radarLabels[key],
    score: radarScores[key],
  }));
  // 雷達圖格式化成 Recharts 需要的格式
  // const radarData = Object.entries(radarScores).map(([nutrient, score]) => ({
  //   nutrient,
  //   score,
  // }));




  // 蛋白質建議與三大營養素分配（以 TDEE 推算）
  const proteinNeed = Math.round(tdee * 0.15 / 4);
  const nutritionSplit = {
    carb: Math.round(tdee * 0.5 / 4),
    protein: proteinNeed,
    fat: Math.round(tdee * 0.35 / 9),
  };

  // 假設推薦品依症狀挑選
  const recommendedProducts = [];
  if (conditions.fatigue) {
    recommendedProducts.push({
      name: "鐵 + 維生素 B12",
      desc: "幫助你改善疲勞與精神不濟，恢復活力。",
      image: "/images/iron-b12.png",
    });
  }
  if (conditions.headache) {
    recommendedProducts.push({
      name: "鎂 + Omega-3",
      desc: "有助緩解頭痛與情緒不穩。",
      image: "/images/mag-omega3.png",
    });
  }
  if (conditions.constipation) {
    recommendedProducts.push({
      name: "膳食纖維 + 維生素C",
      desc: "幫助排便順暢，促進腸道健康。",
      image: "/images/fiber-c.png",
    });
  }
  if (conditions.cramp) {
    recommendedProducts.push({
      name: "鈣 + 維生素D",
      desc: "強健骨骼與肌肉，減少抽筋發生。",
      image: "/images/calcium-d.png",
    });
  }

  const handleRetry = () => {
    navigate("/quiz"); // 返回測驗頁面
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "營養分析結果",
        text: `我的營養分析結果：TDEE: ${tdee}，BMR: ${bmr}，BMI: ${bmi}`,
        url: window.location.href,
      });
    } else {
      alert("分享功能在此設備上不可用");
    }
  };


  return (

    <div className={styles.result}>
      {/* 1. Header 檢測叮嚀 */}
      <section className={styles.header}>

        <h2 className={styles.title}>檢測完成，專屬你的營養分析已出爐！ </h2>
        <p className={styles.subtitle}>“多曬太陽，常保好心情！“</p>
      </section>

      {/* 2.角色+雷達圖 */}
      <section className={styles.radarSection}>
        {/* 左：六大營養素 */}

        <div className={styles.radarCharacter}>
  {nutrientKeys.map((key) => (
    <div key={key} className={styles.characterBox}>
      <div className={styles.characterImgWrapper}>
        {getBubble(radarScores[key])}
        <img src={`/assets/${key}.svg`} alt={nutrientLabels[key]} />
      </div>
      <div className={styles.bubbleText}>
      <span>{nutrientLabels[key]}</span></div>
    </div>
  ))}
</div>
{/* 
        <div className={styles.radarCharacter}>
          <div className={`${styles.characterBox} ${getLevelClass(radarScores.protein)}`}>
            <div className={styles.characterImg}>
              {getBubble(radarScores.protein)}
              <img src="./assets/protein.svg" alt="蛋白質" />
            </div>
            <span>蛋白質</span>
          </div>
          <div className={`${styles.characterBox} ${getLevelClass(radarScores.b12)}`}>
            <img src="./assets/B12.svg" alt="" />
            <span>B12</span>
          </div>
          <div className={`${styles.characterBox} ${getLevelClass(radarScores.ca)}`}>
            <img src="./assets/ca.svg" alt="" />
            <span>鈣</span>
          </div>
          <div className={`${styles.characterBox} ${getLevelClass(radarScores.iron)}`}>
            <img src="./assets/iron.svg" alt="" />
            <span>鐵</span>
          </div>
          <div className={`${styles.characterBox} ${getLevelClass(radarScores.d)}`}>
            <img src="./assets/D.svg" alt="" />
            <span>維生素D</span>
          </div>
          <div className={`${styles.characterBox} ${getLevelClass(radarScores.omega3)}`}>
            <img src="./assets/omega-3.svg" alt="" />
            <span>Omega-3</span>
          </div>
        </div> */}

        {/* 右：雷達圖 */}


        <div className={styles.radarChart}>
          <ResponsiveContainer width={400} height={360}>
            <RadarChart
              data={radarData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              startAngle={0}
              endAngle={-360}
            >
              <PolarGrid stroke="#AAA6A8" />
              <PolarAngleAxis dataKey="nutrient" tick={{ fontSize: 12 }} />
              <Radar
                name="營養分數"
                dataKey="score"
                stroke="#3DCE94"
                fill="#3DCE94"
                fillOpacity={0.75}
              />
            </RadarChart>
          </ResponsiveContainer>
          {/* 右下：雷達小語 */}

          <h4 className={styles.chartTitle}><div className={styles.circle}></div>實際攝取量</h4>
          <p className={styles.chartNote}>本圖為六大營養素攝取平衡圖，角落越接近圓心表示該營養素攝取不足。
            建議每日攝取針對性保健食品不足該營養素。</p>
        </div>
      </section>

      {/* 攝取計算 */}
      <section className={styles.summary}>
        <h3>營養攝取建議</h3>
        <div className={styles.barGroup}>
          
          <div className={styles.bar}><div className={styles.fill} style={{ width: `${(tdee / 3000) * 100}%` }}><label>TDEE（每日總熱量消耗）</label>{tdee}</div></div>

          <label>BMR（基礎代謝率）</label>
          <div className={styles.bar}><div className={styles.fill} style={{ width: `${(bmr / 2000) * 100}%` }}>{bmr}</div></div>

          <label>BMI（身體質量指數）</label>
          <div className={styles.bar}><div className={styles.fill} style={{ width: `${(bmi / 30) * 100}%` }}>{bmi}</div></div>
        </div>

        <div className={styles.protein}>每日蛋白質需求：<strong>{proteinNeed}g</strong></div>
      </section>

      {/* 營養分配 */}
      <section className={styles.nutritionSplit}>
        <h3>建議營養分配為：</h3>
        <p>碳水 <strong>{nutritionSplit.carb}g</strong>、蛋白質 <strong>{nutritionSplit.protein}g</strong>、脂肪 <strong>{nutritionSplit.fat}g</strong></p>
      </section>

      {/* 推薦產品 */}
      <section className={styles.productList}>
        <h3>推薦補給品</h3>
        {recommendedProducts.map((p, idx) => (
          <div className={styles.card} key={idx}>
            <img src={p.image} alt={p.name} />
            <h4>Need 補營養！</h4>
            <p>{p.name}</p>
            <p>{p.desc}</p>
          </div>
        ))}
      </section>

      {/* <!-- 素清單區塊 -->
    <div class="tab-content active" id="favorites">
      <div class="product-list">

        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="./shop/img/jaso-medicine_Ca.png" alt="產品1" class="product-image" />
          </div>

          <div class="product-meta">
            <div class="product-tags">
              <span class="tag">手腳冰冷</span>
              <span class="tag">手腳冰冷</span>
            </div>
            <div class="product-icon">
              <button class="cart-btn" aria-label="加入購物車"></button>
              <button class="like-btn" aria-label="加入收藏"></button>
            </div>
          </div>

          <div class="product-title">鈣心定植物鈣 <span class="product-subtitle">藻鈣+D3雙效配方</span></div>
          <div class="product-desc">骨質疏鬆症找上門？補鈣不能只靠牛奶？同時也要補維生素D！幫助吸收鈣質也幫助骨骼更...</div>
          <a href="#" class="product-link">
            <span class="arrow">&gt;</span>
            <span class="text">看完整產品內容</span></a>
        </div>

        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="./shop/img/jaso-medicine_Ca.png" alt="產品1" class="product-image" />
          </div>

          <div class="product-meta">
            <div class="product-tags">
              <span class="tag">手腳冰冷</span>
              <span class="tag">手腳冰冷</span>
            </div>
            <div class="product-icon">
              <button class="cart-btn" aria-label="加入購物車"></button>
              <button class="like-btn" aria-label="加入收藏"></button>
            </div>
          </div>

          <div class="product-title">鈣心定植物鈣 <span class="product-subtitle">藻鈣+D3雙效配方</span></div>
          <div class="product-desc">骨質疏鬆症找上門？補鈣不能只靠牛奶？同時也要補維生素D！幫助吸收鈣質也幫助骨骼更...</div>
          <a href="#" class="product-link">
            <span class="arrow">&gt;</span>
            <span class="text">看完整產品內容</span></a>
        </div>

<div class="product-card">
          <div class="product-image-wrapper">
            <img src="./shop/img/jaso-medicine_Ca.png" alt="產品1" class="product-image" />
          </div>

          <div class="product-meta">
            <div class="product-tags">
              <span class="tag">手腳冰冷</span>
              <span class="tag">手腳冰冷</span>
            </div>
            <div class="product-icon">
              <button class="cart-btn" aria-label="加入購物車"></button>
              <button class="like-btn" aria-label="加入收藏"></button>
            </div>
          </div>

          <div class="product-title">鈣心定植物鈣 <span class="product-subtitle">藻鈣+D3雙效配方</span></div>
          <div class="product-desc">骨質疏鬆症找上門？補鈣不能只靠牛奶？同時也要補維生素D！幫助吸收鈣質也幫助骨骼更...</div>
          <a href="#" class="product-link">
            <span class="arrow">&gt;</span>
            <span class="text">看完整產品內容</span></a>
        </div>

<div class="product-card">
          <div class="product-image-wrapper">
            <img src="./shop/img/jaso-medicine_Ca.png" alt="產品1" class="product-image" />
          </div>

          <div class="product-meta">
            <div class="product-tags">
              <span class="tag">手腳冰冷</span>
              <span class="tag">手腳冰冷</span>
            </div>
            <div class="product-icon">
              <button class="cart-btn" aria-label="加入購物車"></button>
              <button class="like-btn" aria-label="加入收藏"></button>
            </div>
          </div>

          <div class="product-title">鈣心定植物鈣 <span class="product-subtitle">藻鈣+D3雙效配方</span></div>
          <div class="product-desc">骨質疏鬆症找上門？補鈣不能只靠牛奶？同時也要補維生素D！幫助吸收鈣質也幫助骨骼更...</div>
          <a href="#" class="product-link">
            <span class="arrow">&gt;</span>
            <span class="text">看完整產品內容</span></a>
        </div>

        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="./shop/img/jaso-medicine_Ca.png" alt="產品1" class="product-image" />
          </div>

          <div class="product-meta">
            <div class="product-tags">
              <span class="tag">手腳冰冷</span>
              <span class="tag">手腳冰冷</span>
            </div>
            <div class="product-icon">
              <button class="cart-btn" aria-label="加入購物車"></button>
              <button class="like-btn" aria-label="加入收藏"></button>
            </div>
          </div>

          <div class="product-title">鈣心定植物鈣 <span class="product-subtitle">藻鈣+D3雙效配方</span></div>
          <div class="product-desc">骨質疏鬆症找上門？補鈣不能只靠牛奶？同時也要補維生素D！幫助吸收鈣質也幫助骨骼更...</div>
          <a href="#" class="product-link">
            <span class="arrow">&gt;</span>
            <span class="text">看完整產品內容</span></a>
        </div>

        
      </div>
    </div> */}


      {/* 行動按鈕 */}
      <section className={styles.actions}>
        <button className={styles.share} onClick={handleShare}>分享結果</button>
        <button className={styles.retry} onClick={handleRetry}>再次測驗</button>

      </section>
    </div>


  );
};


export default Result;
