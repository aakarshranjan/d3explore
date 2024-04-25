import React from "react";
    import * as d3 from "d3";

    export default function OrgChart1() {
      // function getLeafLevel(obj) {
      //     if(obj[children].length > 1) return obj[children]
      //     if(!obj[children]) return obj;
      //     getLeafLevel()
      // }

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
          {
            id: 1234,
            empId: 3367,
            name: "Aakarsh Sinha",
            avatar: "photo",
            designation: "SE",
            department: "G&A",
            parent: 1134,
          },
          {
            id: 1134,
            empId: 375,
            name: "Vamshi B",
            avatar: "photo",
            designation: "Manager",
            department: "G&A",
            parent: 11345,
          },
          {
            id: 11345,
            empId: 3711,
            name: "Balaji S",
            avatar: "photo",
            designation: "VP",
            department: "G&A",
            parent: null,
          },
          {
            id: 113451,
            empId: 3800,
            name: "R1",
            avatar: "photo",
            designation: "ASE",
            department: "G&A",
            parent: 1234,
          },
          {
            id: 113452,
            empId: 3801,
            name: "R2",
            avatar: "photo",
            designation: "ASE",
            department: "G&A",
            parent: 1234,
          },
          {
            id: 113453,
            empId: 3802,
            name: "R3",
            avatar: "photo",
            designation: "ASE",
            department: "G&A",
            parent: 1234,
          },
          {
            id: 113454,
            empId: 3803,
            name: "R4",
            avatar: "photo",
            designation: "ASE",
            department: "G&A",
            parent: 1234,
          },
          {
            id: 113455,
            empId: 3804,
            name: "R5",
            avatar: "photo",
            designation: "ASE",
            department: "G&A",
            parent: 1234,
          },
          {
            id: 113456,
            empId: 3805,
            name: "R6",
            avatar: "photo",
            designation: "ASE",
            department: "G&A",
            parent: 1234,
          },
        ];
        // var data = [
        //   { child: "Ann", parent: "" },
        //   { child: "Di", parent: "Ann" },
        //   { child: "E", parent: "Di" },
        //   { child: "F", parent: "Di" },
        //   { child: "G", parent: "Di" },
        //   //   { child: "H", parent: "Di" },
        //   //   { child: "I", parent: "Di" },
        //   //   { child: "J", parent: "Di" },
        //   //   { child: "K", parent: "Di" },
        //   //   { child: "L", parent: "Di" },
        // ];
        var dataStructure = d3
          .stratify()
          .id(function (d) {
            return d.id;
          })
          .parentId(function (d) {
            return d.parent;
          })(data);

        var treeStructure = d3.tree().size([1100, 400]);
        var info = treeStructure(dataStructure);

        // var rect = canvas.append("g").selectAll("rect").data(info.descendants());
        var rootLevel = canvas.append("g").selectAll("rect").data(info.ancestors());
        rootLevel
          .enter()
          .append("rect")
          .attr("x", (d) => d.x - 40)
          .attr("y", (d) => d.y - 20)
          .attr("width", 100)
          .attr("height", 60);
        console.log(info.descendants());
        // console.log(rect);
        console.log(info.leaves(), info.ancestors());
        console.log(info.data, info.children);

        var rows = canvas
          .selectAll(".row")
          .data(d3.range(Math.ceil(info.leaves().length / 5)))
          .enter()
          .append("g")
          .attr("class", "row")
          .attr("transform", function (d, i) {
            return "translate(0," + 100 * i + ")";
          });
        var rects = rows
          .selectAll("rect")
          .data(info.leaves())
          .enter()
          .append("rect")
          .attr("x", function (d, i) {
            return 100 * i;
          })
          .attr("height", 100)
          .attr("width", 60);

        /////
        var rectangle = canvas.selectAll("rect").data(d3.range(100));

        rectangle
          .enter()
          .append("rect")
          .style("stroke", "black")
          .style("fill", "none")
          .attr("x", (d, i) => (i % 10) * 45)
          .attr("y", (d, i) => (Math.floor(i / 10) % 10) * 45)
          .attr("width", 100)
          .attr("height", 100);

        rectangle
          .enter()
          .append("text")
          .attr("x", (d, i) => (i % 10) * 45 + 4)
          .attr("y", (d, i) => (Math.floor(i / 10) % 10) * 45 + 16)
          .text((d, i) => d);
        /////

        var leafNodes = canvas.append("g").selectAll("rect").data(info.leaves());
        leafNodes.enter().append("rect");
        // rect
        //   .enter()
        //   .append("rect")
        //   .attr("x", (d) => d.x - 40)
        //   .attr("y", (d) => d.y - 20)
        //   .attr("width", 100)
        //   .attr("height", 60);

        var connections = canvas.append("g").selectAll("path").data(info.links());
        connections
          .enter()
          .append("path")
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