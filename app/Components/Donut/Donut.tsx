"use client";
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import DonutLegend from "./DonutLegend";
interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  width: number;
  height: number;
}

const DonutComponent: React.FC<DonutChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (data.length > 0 && svgRef.current) {
      const svg = d3.select(svgRef.current);
      const radius = Math.min(width, height) / 4;
      const color = d3.scaleOrdinal().range(data.map((d) => d.color));

      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 50);

      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d.value);

      const arcs = svg
        .selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      arcs
        .append("path")
        .attr("d", (d) => arc(d)!)
        .style("fill", (d) => color(d.data.label))
        .on("mouseover", function (event, d) {
          const tooltip = d3.select(".tooltip-container");
          tooltip.style("opacity", 0.9);
          tooltip.style("transition", "0.5s");
          tooltip.html(`<strong>${d.data.label} : ${d.data.value}</strong>`);
          tooltip.style("left", event.pageX - 40 + "px");
          tooltip.style("top", event.pageY - 20 + "px");
        })
        .on("mouseout", () => {
          const tooltip = d3.select(".tooltip-container");
          tooltip.style("opacity", 0);
        });
    }
  }, [data, width, height]);

  return (
    <>
      <div className="card-custom">
        <div className="card-body">
          <h2 className="card-title">Protocol</h2>
          <div className="text-center">
            <svg
              className="m-auto"
              ref={svgRef}
              width={width}
              height={height}
            ></svg>
            {tooltip && <span className="bg-slate-200">{tooltip}</span>}
            <span className="tooltip-container tooltip-custom"></span>
            <DonutLegend data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DonutComponent;
