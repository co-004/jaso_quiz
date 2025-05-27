import React, { useEffect, useState } from 'react';
import styles from "../css/QuizAni.module.scss";

const QuizImg = {
  q1: ['q1_step1.svg', 'q1_step2.svg', 'q1_step3.svg'],
  q2: ['q2_step1.svg', 'q2_step2.svg', 'q2_step3.svg'],
  q3: ['q3_step1.svg', 'q3_step2.svg', 'q3_step3.svg'],
  q4: ['q4_step1.svg', 'q4_step2.svg', 'q4_step3.svg'],
  q5: ['q5_step1.svg', 'q5_step2.svg', 'q5_step3.svg'],
  q6: ['q6_step1.svg', 'q6_step2.svg', 'q6_step3.svg'],
  q7: ['q7_step1.svg', 'q7_step2.svg', 'q7_step3.svg'],
  q8: ['q8_step1.svg', 'q8_step2.svg', 'q8_step3.svg'],
  q9: ['q9_step1.svg', 'q9_step2.svg', 'q9_step3.svg'],
  q10: ['q10_step1.svg', 'q10_step2.svg', 'q10_step3.svg'],
};

const QuizAni = ({ questionKey = 'q1', interval = 200 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = QuizImg [questionKey] || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images, interval]);

  if (!images.length) return null;

  return (
    <div className={styles.imageContainer}>

      <img
  src={`/assets/${images[currentIndex]}`}
  alt={`${questionKey} animation step ${currentIndex + 1}`}
  className={`${styles.animatedImage} ${styles[`scale_${questionKey}`]}`}
/>
    </div>
  );
};

export default QuizAni;
