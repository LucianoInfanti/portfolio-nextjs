import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

const ShuffleText = ({ text }) => {
  const [shuffledText, setShuffledText] = useState(text);
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const originalText = useRef(text);
  const elementRef = useRef(null);
  const density = "[]:.!?*+/|=-@^~∞∏∝∑≅∮∇Δπδ≡e∫φ∞";

  useLayoutEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  const shuffle = (o) => {
    for (let i = o.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [o[i], o[j]] = [o[j], o[i]];
      if (Math.random() < 0.2) {
        o[i] = density[Math.floor(Math.random() * density.length)];
      }
    }
    return o;
  };

  const shuffleText = () => {
    const elementTextArray = originalText.current.split("");
    let randomText;
    const totalDuration = 320;
    const numberOfIterations = 8;
    const iterationDuration = totalDuration / numberOfIterations;

    const repeatShuffle = (times, index) => {
      if (index === times) {
        setShuffledText(originalText.current);
        return;
      }

      setTimeout(() => {
        randomText = shuffle(elementTextArray.slice(0));
        setShuffledText(randomText.join(""));
        index++;
        repeatShuffle(times, index);
      }, iterationDuration);
    };
    repeatShuffle(numberOfIterations, 0);
  };

  return (
    <span 
      ref={elementRef}
      onMouseEnter={shuffleText}
      style={{ 
        display: 'inline-block', 
        width: `${dimensions.width}px`, 
        height: `${dimensions.height}px`, 
        overflow: 'hidden', 
        whiteSpace: 'nowrap',
        lineHeight: '1',
        verticalAlign: 'middle',
      }}
    >
      {shuffledText}
    </span>
  );
};

export default ShuffleText;
