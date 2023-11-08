import React from "react";
interface DonutChartLegendProps {
  data: { label: string; value: number; color: string }[];
}

const DonutLegend: React.FC<DonutChartLegendProps> = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <div
              className="w-4 h-4 mr-2 rounded"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DonutLegend;
