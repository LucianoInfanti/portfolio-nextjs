import React, { useRef, useState, useEffect } from "react";

const ShuffleText = ({ text }) => {
  const [shuffledText, setShuffledText] = useState(text);
  const originalText = useRef(text);

  const shuffle = (o) => {
    for (let i = o.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [o[i], o[j]] = [o[j], o[i]];
    }
    return o;
  };

  const shuffleText = () => {
    const elementTextArray = originalText.current.split("");
    let randomText;

    const totalDuration = 300; // Total duration of the animation in milliseconds
    const numberOfIterations = 5; // Number of iterations for the animation
    const iterationDuration = totalDuration / numberOfIterations;

    const repeatShuffle = (times, index) => {
      if (index === times) {
        setShuffledText(originalText.current);
        return;
      }

      setTimeout(() => {
        randomText = shuffle(elementTextArray.slice(0)); // Use a copy of the array to prevent modifying the original
        setShuffledText(randomText.join(""));
        index++;
        repeatShuffle(times, index);
      }, iterationDuration);
    };
    repeatShuffle(numberOfIterations, 0);
  };

  useEffect(() => {
    originalText.current = text;
    setShuffledText(text);
    shuffleText(); // Shuffle the text when the component mounts
  }, [text]);

  return (
    <span
      className="shuffle"
      onMouseEnter={shuffleText}
      style={{ cursor: "pointer" }}
    >
      {shuffledText}
    </span>
  );
};

export default ShuffleText;
