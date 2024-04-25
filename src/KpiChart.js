import React, { useState, useEffect, useRef } from "react";
    import * as d3 from "d3";

    export default function KpiChart() {
      const kpiData = [
        {
          actual: 100,
          planned: 100,
          quarter: "Q1",
        },
        {
          actual: 90,
          planned: 100,
          quarter: "Q2",
        },
        {
          actual: 0,
          planned: 0,
          quarter: "Q3",
        },
        {
          actual: 0,
          planned: 0,
          quarter: "Q4",
        },
        {
          actual: 10000,
          planned: 10000,
          quarter: "2022",
        },
      ];

      const keys = ["actual", "planned"];

      const [data, setData] = useState(kpiData);
      const svgRef = useRef();
      const wrapperRef = useRef();

      useEffect(() => {
        const svg = d3.select(svgRef.current);
        // const { width, height } = wrapperRef.current.getBoundingClientRect();
        const width = 400,
          height = 150;
        console.log("checl", width, height);

        const xAxisLabels = data.map((d) => d.quarter);
        const highestY = d3.max([
          ...data.map((d) => d.actual),
          ...data.map((d) => d.planned),
        ]);
        const newData = data.map((d) => {
          return {
            ...d,
            valArr: ["planned", "actual"].map((n) => {
              return { name: n, value: d[n] };
            }),
          };
        });
        const x0 = d3
          .scaleBand()
          .domain(xAxisLabels)
          .rangeRound([0, width])
          .padding(0.2);
        const x1 = d3.scaleBand();
        const y = d3.scaleLinear().range([height, 0]);
        const color = d3.scaleOrdinal().range(["#FC7500", "#0971f1"]);
        const xAxis = d3.axisBottom(x0);
        const yAxis = d3.axisLeft(y);
        svg.append("g");
        svg
          .select(".x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);

        x1.domain(["planned", "actual"])
          .rangeRound([0, x0.bandwidth()])
          .padding(0.2);
        y.domain([0, highestY]);
        // svg
        //   .select(".y-axis")
        //   .attr("transform", `translate(${0 + 25}, 0 )`)
        //   .call(yAxis);

        const quarters = svg
          .selectAll(".quarters")
          .data(newData)
          .enter()
          .append("g")
          .attr("class", "quarters")
          .attr("transform", (d) => `translate(${x0(d.quarter)}, 0)`);

        quarters
          .selectAll("rect")
          .data((d) => d.valArr)
          .enter()
          .append("rect")
          .attr("width", x1.bandwidth())
          .attr("x", (d) => x1(d.name) + 5)
          .attr("y", (d) => y(d.value))
          .attr("height", (d) => height - y(d.value))
          .style("fill", (d) => color(d.name));

        quarters
          .selectAll("text")
          .data((d) => d.valArr)
          .enter()
          .append("text")
          .attr("fill", "white")
          .attr("x", (d) => x1(d.name))
          .attr("y", (d) => y(d.value + 2))
          .attr("text-overflow", "clip")
          //   .attr("text-anchor", "middle")
          .attr("font-family", "Open Sans")
          .attr("font-size", "12px")
          .text((d) => d.value);
      }, [data, keys]);

      return (
        <>
          <div ref={wrapperRef} style={{ width: "400px", height: "200px" }}>
            <svg ref={svgRef} style={{ width: "100%", height: "100%" }}>
              <g className="x-axis" />
              <g className="y-axis" />
            </svg>
          </div>
        </>
      );
    }