import React from "react";
import { useD3 } from "../../../hooks";
import * as d3 from "d3";

const Chart = ({ data, dimensions, yAccessor, xAccessor, xTitle, yTitle }) => {
  const { width, height, margin } = dimensions;
  const ref = useD3(
    (svg) => {
      const x = d3
        .scaleTime()
        .domain(d3.extent(data, xAccessor))
        .rangeRound([margin.left, width - margin.right]);
      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height - margin.bottom, margin.top])
        .nice();

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .style("color", "darkgray")
          .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat("%B %d")));

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "darkgray")
          .call(d3.axisLeft(y1).ticks(null, "s"));
      // .call((g) => g.select(".domain").remove())

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("circle")
        .attr("class", "bar")
        .attr("opacity", 0)
        .attr("cx", (d) => x(xAccessor(d)))
        .attr("cy", (d) => y1(yAccessor(d)))
        .attr("r", 5)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr("opacity", 1);

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", margin.left - 25)
        .style("stroke", "darkgray")
        .style("text-anchor", "middle")
        .text(yTitle);

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height)
        .style("text-anchor", "middle")
        .style("stroke", "darkgray")
        .text(xTitle);

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .attr(
          "d",
          d3
            .line()
            .x((d) => x(xAccessor(d)))
            .y((d) => y1(yAccessor(d)))
        )
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .attr("opacity", 1);
    },
    [data.length]
  );
  return (
    <svg
      ref={ref}
      style={{
        height: height,
        width: width,
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

Chart.defaultProps = {
  data: [],
  dimensions: {
    width: 400,
    height: 200,
    margin: { top: 20, right: 30, bottom: 30, left: 40 },
  },
};
export default Chart;
