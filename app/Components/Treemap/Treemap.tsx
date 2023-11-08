"use client";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
interface TreemapChartProps {
  data: {
    label: string;
    value: number;
    color: string;
    children?: any[];
  };
  width: number;
  height: number;
}

const TreeMapComponent: React.FC<TreemapChartProps> = ({
  data,
  width,
  height,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data && data.children && svgRef.current) {
      const svg = d3.select(svgRef.current);
      const root = d3.hierarchy(data).sum((d) => d.value);

      const treemap = d3.treemap().size([width, height]).padding(1);

      treemap(root);

      svg
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", (d) => d.x0!)
        .attr("y", (d) => d.y0!)
        .attr("width", (d) => d.x1! - d.x0!)
        .attr("height", (d) => d.y1! - d.y0!)
        .style("fill", (d) => d.data.color);

      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", (d) => (d.x0! + d.x1!) / 2)
        .attr("y", (d) => (d.y0! + d.y1!) / 2)
        .attr("dy", "0.3em")
        .style("text-anchor", "middle")
        .text((d) => d.data.label)
        .style("fill", "white");
    }
  }, [data, width, height]);

  return (
    <>
      <div className="card-custom">
        <div className="card-body">
          <h2 className="card-title">Total Traffic</h2>
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

export default TreeMapComponent;
