/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

function Graph({ expression, root }) {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const xValues = [];
    const yValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
      xValues.push(x);
      yValues.push(eval(expression.replace(/x/g, `(${x})`)));
    }

    const chartConfig = {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: "y = " + expression,
            data: yValues,
            fill: false,
            backgroundColor: "blue",
            borderColor: "blue",
          },
          {
            label: "Raíz",
            data: [{ x: root, y: 0 }],
            backgroundColor: "red",
            borderColor: "red",
            pointRadius: 5,
            pointHoverRadius: 7,
            type: "bubble",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    chartInstance.current = new Chart(
      chartContainer.current.getContext("2d"),
      chartConfig
    );

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expression, root]); // Dependencies of useEffect

  return (
    <div style={{ width: "600px", height: "400px", margin: "auto" }}>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default Graph;
