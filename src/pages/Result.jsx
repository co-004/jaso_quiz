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
  const suggestions = {
    protein: "．建議多攝取豆製品、堅果等植物性蛋白，補足蛋白質需求。",
    b12: "．純素飲食容易缺乏B12，建議選擇B12補充品。",
    ca: "．建議多吃深綠色蔬菜、黑芝麻等含鈣食物，提升鈣質攝取。",
    iron: "．建議搭配維生素C攝取鐵質，搭配適量C補充品。",
    d: "．建議多曬太陽，搭配適量維生素D補充品。",
    omg: "．建議攝取亞麻仁籽、奇亞籽等富含Omega-3的植物性食材。"
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

  const recommendedProducts = {
    fatigue: [
      {
        name: "鐵了心膠囊",
        desc: "植萃鐵＋B群補給",
        image: "/assets/shop_iron.png",
      },
      {
        name: "維生素 B12",
        desc: "補B不累口含錠",
        image: "/assets/shop_B12.png",
      }
    ],
    headache: [
      {
        name: "OMEG3",
        desc: "油你真好植物膠囊",
        image: "/assets/shop_omg.png",
      }
    ],
    constipation: [
      {
        name: "維生素超群膠囊",
        desc: "植萃綜合維他命配方",
        image: "/assets/shop_protein.png",
      }
    ],
    cramp: [
      {
        name: "鈣心定植物鈣",
        desc: "藻鈣＋D3雙效配方",
        image: "/assets/shop_Ca.png",
      },
      {
        name: "素D速補D",
        desc: "植萃維生素D膠囊",
        image: "/assets/shop_D.png",
      }
    ]
  };


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

        <div className={styles.radarLeft}>

          <div className={styles.radarCharacter}>
            {nutrientKeys.map((key) => (
              <div key={key} className={styles.characterBox}>
                <div className={styles.characterImgWrapper}>
                  {getBubble(radarScores[key])}
                  {/* <img src={`/assets/${key}.svg`} alt={nutrientLabels[key]} /> */}
                  <img
                    src={`${import.meta.env.BASE_URL}assets/${key}.svg`}
                    alt={nutrientLabels[key]}
                  />

                </div>

                <div className={styles.bubbleText}>
                  <span>{nutrientLabels[key]}</span></div>
              </div>

            ))}
          </div>

          <div className={styles.suggestionBox}>
            {nutrientKeys
              .filter((key) => radarScores[key] < 6)
              .map((key) => (
                <p key={key} className={styles.suggestion}>
                  {suggestions[key]}
                </p>
              ))}
          </div>
        </div>



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
          <div className={styles.chartText}>

            <h4 className={styles.chartTitle}><div className={styles.circle}></div>實際攝取量</h4>
            <p className={styles.chartNote}>本圖為六大營養素攝取平衡圖，角落越接近圓心表示該營養素攝取不足。
              建議每日攝取針對性保健食品不足該營養素。</p>
          </div>


        </div>
      </section>

      {/* 攝取計算 */}
      <section className={styles.summary}>
        <h4>根據你的飲食填答，我們整理了以下營養狀況與建議，
          協助你掌握當前狀況並找到適合的改善方式。</h4>
        <h3>營養攝取建議</h3>
        <div className={styles.barGroup}>

          <div className={styles.bar}><div className={styles.fill} style={{ width: `${(tdee / 3000) * 100}%` }}><label>TDEE每日總熱量消耗（千卡）</label></div>{tdee}</div>

          <div className={styles.bar}><div className={styles.fill} style={{ width: `${(bmr / 2000) * 100}%` }}><label>BMR基礎代謝率</label></div>{bmr}</div>

          <div className={styles.bar}><div className={styles.fill} style={{ width: `${(bmi / 30) * 100}%` }}><label>BMI身體質量指數</label></div>{bmi}</div>
        </div>

        <div className={styles.protein}>每日蛋白質需求＝<p><strong>{proteinNeed}g</strong></p></div>
      </section>


      {/* 推薦產品 */}
      <section className={styles.productList}>
        {Object.keys(recommendedProducts).map((symptomKey) => {
          if (!conditions[symptomKey]) return null;

          return recommendedProducts[symptomKey].map((product, idx) => (
            <div className={styles.card} key={`${symptomKey}-${idx}`}>
              <img src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`} alt={product.name} />
              <div className={styles.needWhat}>

                <div className={styles.needLeft}>

                  <h4>Need </h4>
                  <span>補營養！</span>
                </div>
                <div className={styles.needRight}>

                  <span>{product.name}</span>
                  <p>{product.desc}</p>
                </div>
              </div>

            </div>
          ));
        })}
      </section>
      {/* 行動按鈕 */}
      <section className={styles.actions}>
        <button className={styles.share} onClick={handleShare}>分享結果</button>
        <button className={styles.retry} onClick={handleRetry}>再測一次</button>

      </section>
    </div>


  );
};


export default Result;
