import React from "react";
import { useD3 } from "../../../hooks";
import * as d3 from "d3";

const Chart = ({
  data,

  dimensions,
  yAccessor,
  xAccessor,
  xTitle,
  yTitle,
  barWidth,
}) => {
  console.log("data: ", data);
  const { width, height, margin } = dimensions;
  const ref = useD3(
    (svg) => {
      const xScale = d3
        .scalePoint()
        .domain(data.map(xAccessor))
        .range(d3.extent([margin.left, width - margin.right]));

      console.log("x.domain", xScale.domain());
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([height - margin.bottom, margin.top])
        .nice();

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .style("color", "darkgray")
          .call(d3.axisBottom(xScale).ticks(xScale.domain().length));

      svg
        .select(".x-axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .style("fill", "steelblue")
        .attr("class", "bar")
        .style("opacity", 0)
        .attr("x", (d) => xScale(xAccessor(d)) - barWidth / 2)
        .attr("y", (d) => yScale(yAccessor(d)))
        .attr(
          "height",
          (d) =>
            dimensions.height -
            (dimensions.margin.bottom + yScale(yAccessor(d)))
        )
        .attr("width", barWidth)
        .transition()
        .duration(750)
        .ease(d3.easeLinear)
        .style("opacity", 1);

      svg
        .selectAll(".bar-text")
        .data(data)
        .join("text")
        .attr("fill", "black")
        .attr("x", (d) => xScale(xAccessor(d)))
        .attr("y", (d) => yScale(yAccessor(d)) - 10)
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .text((d) => yAccessor(d));

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", (d) => height - 10)
        .style("text-anchor", "middle")
        .style("stroke", "darkgray")
        .text(xTitle + " - " + yTitle);
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
  barWidth: 10,
};
export default Chart;
