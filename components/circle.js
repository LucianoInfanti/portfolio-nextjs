import React, { useEffect, useRef, useState } from "react";

function length(st) {
  return Math.sqrt(st.x * st.x + st.y * st.y);
}

const { floor, abs, min } = Math;

const density = " .:░▒▓█Ñ#+-";
const l = density.length;

export const settings = { fps: 60 };

export function main(coord, context, cursor, buffer) {
  const t = context.time * 0.0005;
  const m = min(context.cols, context.rows);
  const a = context.metrics.aspect * 0.1; // Updated aspect ratio
  const st = {
    x: ((4.0 * (coord.x - context.cols / 2)) / m) * a,
    y: (4.0 * (coord.y - context.rows / 2)) / m,
  };
  const i = floor(abs(length(st) - t) * l + (floor(coord.x / 4) % 2) * 2) % l;
  return density[i];
}

const AsciiCircle = () => {
  const preRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    height: null,
    width: null,
  });

  // UseEffect to handle window resize
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    if (typeof window !== "undefined") {
      // Check if window object is available
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const pre = preRef.current;

    if (!pre) return;

    const fontSize = 14; // This is the font size in pixels
    const cols = floor(dimensions.width / fontSize) * 1.3; // Double the number of columns
    const rows = floor(dimensions.height / fontSize);
    const metrics = { aspect: cols / rows };

    const loop = setInterval(() => {
      let frame = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          frame += main(
            { x, y },
            { cols, rows, metrics, time: Date.now() },
            null,
            null
          );
        }
        frame += "\n";
      }
      pre.textContent = frame;
    }, 1000 / settings.fps);

    return () => clearInterval(loop);
  }, [dimensions]);

  return (
    <div>
      <pre
        ref={preRef}
        style={{
          backgroundColor: "white",
          color: "rgba(0, 0, 0, 0.02)",

        }}
      />
    </div>
  );
};

export default AsciiCircle;
