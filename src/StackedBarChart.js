import React, { useState, useEffect, useRef } from "react";
    import {
      select,
      scaleBand,
      axisBottom,
      axisLeft,
      scaleLinear,
      stack,
      max,
    } from "d3";

    // // const kpiData = [
    // //   {
    // //     kpiInfo: "Resolution of Standard Requests within 3 business days",
    // //     kpiType: "IT Requests Management SLA",
    // //     prorated: "no",
    // //     year: 2022,
    // //     graphtype: "bar",
    // //     id: 1287,
    // //     departments: 111,
    // //     designation: null,
    // //     kpis: [
    // //       {
    // //         actual: 100,
    // //         planned: 100,
    // //         quarter: "Q1",
    // //       },
    // //       {
    // //         actual: 99,
    // //         planned: 100,
    // //         quarter: "Q2",
    // //       },
    // //       {
    // //         actual: 0,
    // //         planned: 0,
    // //         quarter: "Q3",
    // //       },
    // //       {
    // //         actual: 0,
    // //         planned: 0,
    // //         quarter: "Q4",
    // //       },
    // //       {
    // //         actual: 100,
    // //         planned: 100,
    // //         quarter: "2022",
    // //       },
    // //     ],
    // //   },
    // //   {
    // //     kpiInfo:
    // //       "This KPI is going to be used to evaluating New Project initiatives withing BizOps. This includes scoring done for the below parameters,<br>1. Understand the requirement<br>2. Capturing PBR & CSR<br>3. Requirement Design and Process Designing<br>4. Solution Execution and Delivery<br>5. Support for Solution post Go-Live",
    // //     kpiType: "New Project Initiatives",
    // //     prorated: "no",
    // //     year: 2022,
    // //     graphtype: "bar",
    // //     id: 4360,
    // //     departments: 111,
    // //     designation: null,
    // //     kpis: [
    // //       {
    // //         actual: 100,
    // //         planned: 100,
    // //         quarter: "Q1",
    // //       },
    // //       {
    // //         actual: 110,
    // //         planned: 100,
    // //         quarter: "Q2",
    // //       },
    // //       {
    // //         actual: 0,
    // //         planned: 0,
    // //         quarter: "Q3",
    // //       },
    // //       {
    // //         actual: 0,
    // //         planned: 0,
    // //         quarter: "Q4",
    // //       },
    // //       {
    // //         actual: 105,
    // //         planned: 100,
    // //         quarter: "2022",
    // //       },
    // //     ],
    // //   },
    // // ];

    export const StackedBarGraph = () => {
      const datasets = [
        {
          name: "Brand 1",
          type: 1,
          Affiliate: 10,
          Social: 20,
          Media: 30,
        },
        {
          name: "Brand 1",
          type: 2,
          Affiliate: 20,
          Social: 40,
          Media: 60,
        },
        {
          name: "Brand 2",
          type: 1,
          Affiliate: 30,
          Social: 45,
          Media: 80,
        },
        {
          name: "Brand 3",
          type: 1,
          Affiliate: 40,
          Social: 60,
          Media: 100,
        },
        {
          name: "Brand 3",
          type: 2,
          Affiliate: 50,
          Social: 80,
          Media: 120,
        },
      ];

      const keys = ["Affiliate", "Social", "Media"];

      const colors = {
        Affiliate: "rgba(69, 0, 0, 0.8)",
        Social: "rgba(240, 72, 19, 0.8)",
        Media: "rgba(255, 199, 128, 0.8)",
      };
      const [data, setData] = useState(datasets);
      const svgRef = useRef();
      const wrapperRef = useRef();

      useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        const stackGenerator = stack().keys(keys);
        const layers = stackGenerator(data);
        const extent = [
          0,
          max(layers, (layer) => max(layer, (sequence) => sequence[1])),
        ];
        const yScale = scaleLinear().domain(extent).range([height, 0]);

        const x0Scale = scaleBand()
          .domain(data.map((d) => d.name))
          .range([0, width])
          .padding(0.46);
        const x1Scale = scaleBand()
          .domain(data.map((d) => d.type))
          .rangeRound([0, x0Scale.bandwidth()])
          .padding(0.12);

        const xAix = axisBottom(x0Scale);
        const yAix = axisLeft(yScale);

        svg
          .select(".x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAix);
        svg
          .select(".y-axis")
          .attr("transform", `translate(${0 + 25}, 0 )`)
          .call(yAix);

        svg
          .selectAll(".layer")
          .data(layers)
          .join("g")
          .attr("class", "layer")
          .attr("fill", (layer) => colors[layer.key])
          .selectAll("rect")
          .data((layer) => {
            console.log("layer", layer);
            return layer;
          })
          .join("rect")
          .attr("x", (sequence) => {
            // console.log("herw", sequence);
            return x0Scale(sequence.data.name) + x1Scale(sequence.data.type);
          })
          .attr("width", x1Scale.bandwidth())
          .attr("y", (sequence) => {
            console.log("qw", sequence);
            return yScale(sequence[1]);
          })
          .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
        console.log(svg);
        // svg
        //   .select(".x-axis")
        //   .selectAll(".tick")
        //   .on("click", (e) => {
        //     const filteredD = data.map((d) => {
        //       return {
        //         name: d.name,
        //         Affiliate: d.name === e ? 0 : d.Affiliate,
        //         Social: d.name === e ? 0 : d.Social,
        //         Media: d.name === e ? 0 : d.Media,
        //       };
        //     });
        //     setData(filteredD);
        //   });
      }, [data, keys, colors]);

      return (
        <>
          <div
            ref={wrapperRef}
            style={{ width: "400px", height: "400px", marginBottom: "2rem" }}
          >
            <svg ref={svgRef} style={{ width: "100%", height: "110%" }}>
              <g className="x-axis" />
              <g className="y-axis" />
            </svg>
          </div>
        </>
      );
    };