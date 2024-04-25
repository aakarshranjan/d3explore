import React from "react";
    import * as d3 from "d3";

    export default function OrgChart() {
      React.useEffect(() => {
        console.log("hereer");
        var canvas = d3
          .select("#orgChart")
          .append("svg")
          .attr("width", 1100)
          .attr("height", 500)
          .append("g")
          .attr("transform", "translate(0,50)");
        var data = [
          { child: "Ann", parent: "" },
          { child: "B", parent: "Ce" },
          { child: "Ce", parent: "Di" },
          { child: "Di", parent: "Ann" },
          { child: "E", parent: "Di" },
          { child: "F", parent: "Ce" },
          { child: "G", parent: "Ce" },
          { child: "H", parent: "Ce" },
          { child: "I", parent: "E" },
          { child: "J", parent: "E" },
          { child: "K", parent: "E" },
          { child: "L", parent: "E" },
        ];
        var dataStructure = d3
          .stratify()
          .id(function (d) {
            return d.child;
          })
          .parentId(function (d) {
            return d.parent;
          })(data);

        var treeStructure = d3.tree().size([1100, 400]);
        var info = treeStructure(dataStructure);

        var rect = canvas.append("g").selectAll("rect").data(info.descendants());
        console.log(info.descendants());
        rect
          .enter()
          .append("rect")
          .attr("x", (d) => d.x - 40)
          .attr("y", (d) => d.y - 20)
          .attr("width", 100)
          .attr("height", 60);
        //   .attr("fill", "red")
        //   .attr("border", "1px solid white");

        var connections = canvas.append("g").selectAll("path").data(info.links());
        connections
          .enter()
          .append("path")
          //   .attr(
          //     "d",
          //     (d) =>
          //       `M${d.source.x},${d.source.y} C${d.source.x},${
          //         (d.source.y + d.target.y) / 2
          //       } ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${
          //         d.target.y
          //       }`
          //   )
          .attr(
            "d",
            (d) => `M${d.source.x},${d.source.y} v 50 H${d.target.x} V${d.target.y}`
          )
          .attr("fill", "none")
          .attr("stroke", "black");

        var names = canvas.append("g").selectAll("text").data(info.descendants());
        names
          .enter()
          .append("text")
          .text((d) => d.data.child)
          .attr("x", (d) => d.x + 7)
          .attr("y", (d) => d.y + 4);
      }, []);
      return <div id="orgChart"></div>;
    }