import React from "react";
    import * as d3 from "d3";

    const PieChart = () => {
      const wrapperRef = React.useRef();
      const svgRef = React.useRef();
      const weightageData = [
        {
          label: "New Project",
          weightage: "30",
        },
        {
          label: "IT Project",
          weightage: "20",
        },
        {
          label: "IT SLA",
          weightage: "10",
        },
        {
          label: "Application Building",
          weightage: "40",
        },
      ];
      React.useEffect(() => {
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        const colors = d3.scaleOrdinal(d3.schemeDark2);
        // console.log(colors);
        const newData = weightageData.map((d, i) => {
          return {
            ...d,
            color: colors(i),
          };
        });
        const svg = d3.select(svgRef.current);
        // svg.attr("background", "pink");

        //////////////////////////////////
        const innerRadius = 0; // inner radius of pie, in pixels (non-zero for donut)
        const outerRadius = 100; // outer radius of pie, in pixels
        const labelRadius = innerRadius * 0.2 + outerRadius * 0.8; // center radius of labels
        const arcs = d3
          .pie()
          .sort(null)
          .value((d) => d.weightage)(newData);
        // const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
        //   const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

        svg
          .append("g")
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .attr("stroke-linejoin", "round")
          .attr("transform", `translate(${width / 2},${height / 2})`)
          .selectAll("path")
          .data(arcs)
          .join("path")
          .attr("fill", (d) => d.data.color)
          .attr("d", arc)
          .append("title")
          .attr("transform", `translate(${width / 2},${height / 2})`)
          .text((d) => d.data.weightage);

        svg
          .append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(arcs)
          .join("text")
          //   .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
          .attr("x", (d) => arcLabel.centroid(d)[0] * 0.75)
          .attr("y", (d) => arcLabel.centroid(d)[1] * 0.75)
          .attr("transform", `translate(${width / 2},${height / 2})`)
          .selectAll("tspan")
          .data((d) => {
            const lines = `${d.data.weightage}`.split(/\n/);
            return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
          })
          .join("tspan")
          //   .attr("x", 0)
          //   .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => (i ? null : "bold"))
          .attr("font-size", "large")
          .attr("fill", "white")
          .text((d) => d);

        const legends = svg
          .append("g")
          .attr("transform", `translate(${width * 0.7}, ${height * 0.1})`)
          .selectAll(".legend")
          .data(arcs);

        const legend = legends
          .enter()
          .append("g")
          .classed("legend", true)
          .attr("transform", (d, i) => `translate(${0},${(i + 1) * 30})`);

        legend
          .append("rect")
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", (d) => d.data.color);

        legend
          .append("text")
          .classed("label", true)
          .text((d) => d.data.label)
          .attr("fill", (d) => d.data.color)
          .attr("x", 30)
          .attr("y", 20)
          .attr("font-size", "15px");

        /**********/
        // const legend1 = svg
        //   .append("foreignObject")
        //   .attr("width", 200)
        //   .attr("height", 200)
        //   .attr("transform", `translate(${width * 0.65}, ${height * 0.1})`)
        //   .selectAll(".label1")
        //   .data(arcs)
        //   .enter()
        //   .append("xhtml:div")
        //   .classed("label1", true)
        //   //   .style("color", "#000")
        //   .style("text-align", "left")
        //   .style("width", 50)
        //   .style("height", 20)
        //   .style("padding", "5px")
        //   .style("font-size", `${12}px`);

        // legend1
        //   .append("xhtml:div")
        //   .style("width", "20%")
        //   .style("height", "20%")
        //   .style("color", (d) => d.data.color);

        // legend1
        //   .append("xhtml:div")
        //   .style("margin-left", 20)
        //   .style("width", "80%")
        //   .style("height", "80%")
        //   .text((d) => d.data.label)
        //   .style("color", (d) => d.data.color);
        /******** */

        ///////////////////////////////////////

        // const data = d3
        //   .pie()
        //   .sort(null)
        //   .value((d) => d.weightage)(newData);
        // console.log(data);
        // const segments = d3
        //   .arc()
        //   .innerRadius(0)
        //   .outerRadius(100)
        //   .padAngle(0.05)
        //   .padRadius(50);

        // const sections = svg
        //   .append("g")
        //   .attr("transform", `translate(${width / 2},${height / 2})`)
        //   .selectAll("path")
        //   .data(data);
        // sections
        //   .enter()
        //   .append("path")
        //   .attr("d", segments)
        //   .attr("fill", (d) => d.data.color);

        // var content = d3.select("g").selectAll("text").data(data);

        // content
        //   .enter()
        //   .append("text")
        //   .classed("pieLabel", true)
        //   .each((d) => {
        //     var center = segments.centroid(d);
        //     // console.log(d);
        //     d3.select(".pieLabel")
        //       .attr("x", center[0])
        //       .attr("y", (d) => {
        //         // console.log("herere", d.data);
        //         return center[1];
        //       })
        //       .text((d) => {
        //         console.log(d.data.weightage);
        //         return d.data.weightage;
        //       })
        //       .attr("fill", "black")
        //       .attr("font-weight", "bold")
        //       .attr("font-size", "12px");
        //   });
      }, []);
      return (
        <>
          <div
            ref={wrapperRef}
            style={{
              margin: "0.5rem auto 2rem auto",
              width: "70vw",
              height: "40vh",
            }}
          >
            <svg ref={svgRef} style={{ width: "100%", height: "100%" }}>
              <g className="x-axis" />
              <g className="y-axis" />
            </svg>
          </div>
        </>
      );
    };

    export default PieChart;