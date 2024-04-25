import React, { useState, useEffect, useRef } from "react";
    import * as d3 from "d3";

    export default function KpiChart1() {
      const kpiData = [
        {
          actual: 100,
          planned: 90,
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
          planned: 10,
          quarter: "Q4",
        },
        {
          actual: 100,
          planned: 80,
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
          height = 400;
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

        const y = d3.scaleLinear().range([height / 2, 20]);
        const y1 = d3.scaleLinear().range([]);

        const color = d3.scaleOrdinal().range(["#FFD03B", "#0092FF"]);

        const yAxis = d3.axisLeft(y);

        svg.append("g");

        x1.domain(["planned", "actual"])
          .rangeRound([0, x0.bandwidth()])
          .padding(0.2);

        y.domain([0, highestY]);

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
          .attr("fill-opacity", "0.6")
          //   .style("opacity", "0.6")
          .attr("width", x0.bandwidth() / 1.5)
          //   .attr("margin", "0 auto")
          //   .attr("x", (d) => x0(d.name))
          //   .attr("y", (d) => y(d.value))
          .attr("y", (d) => {
            console.log("qw", d.name, y(d.value));
            return d.name == "actual" ? y(d.value) : height / 2;
          })
          .attr("height", (d) => {
            // console.log("as", height - y(d.value), y(d.value));
            // console.log("hei", height / 2 + (height / 2 - y(d.value)));
            return height / 2 - y(d.value);
          })
          .style("fill", (d) => color(d.name));

        quarters
          .selectAll("line")
          .data((d) => d.valArr)
          .enter()
          .append("line")
          .attr("fill", "black")
          //   .attr('x1', (d)=> d.)
          .attr("y1", (d) => {
            console.log("inline2");
            return d.name == "actual" ? y(d.value) : height / 2 + y(d.value);
          })
          .attr("y2", (d) => {
            console.log("inline");
            return d.name == "actual"
              ? y(d.value) - 5
              : height / 2 + y(d.value) + 5;
          });

        quarters
          .selectAll("text")
          .data((d) => d.valArr)
          .enter()
          .append("text")
          .attr("fill", "white")
          .attr("x", 10)
          .attr("y", (d) => {
            return d.name == "actual"
              ? y(d.value + 2)
              : height / 2 + (height / 2 - y(d.value + 10));
          })
          .attr("text-overflow", "clip")
          //   .attr("text-anchor", "middle")
          .attr("font-family", "Open Sans")
          .attr("font-size", "12px")
          .text((d) => d.value);

        const xAxis = d3.axisBottom(x0);
        svg
          .select(".x-axis")
          .attr("transform", `translate(0, ${height / 2})`)
          .call(xAxis);
      }, [data, keys]);

      return (
        <>
          <div ref={wrapperRef} style={{ width: "400px", height: "400px" }}>
            <svg ref={svgRef} style={{ width: "100%", height: "100%" }}>
              <g className="x-axis" />
              <g className="y-axis" />
            </svg>
          </div>
        </>
      );
    }