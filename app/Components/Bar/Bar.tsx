"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: { label: string; value: number; color: string }[];
  width: number;
  height: number;
  xTicks?: number;
  yTicks?: number;
}

const BarComponent: React.FC<BarChartProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data.length > 0 && svgRef.current) {
      const svg = d3.select(svgRef.current);
      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, width])
        .padding(0.1);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)!])
        .nice()
        .range([height, 0]);

      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.label)!)
        .attr("y", (d) => yScale(d.value)!)
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.value)!)
        .attr("fill", (d) => d.color);

      svg
        .selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "text")
        .text((d) => d.value)
        .attr("x", (d) => xScale(d.label)! + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.value)! - 5)
        .style("text-anchor", "middle");
    }
  }, [data, width, height]);
  return (
    <>
      <div className="card-custom">
        <div className="card-body">
          <h2 className="card-title">Traffic Changes</h2>
          <svg
            className="m-auto"
            ref={svgRef}
            width={width}
            height={height}
          ></svg>
        </div>
      </div>
    </>
  );
};

export default BarComponent;
