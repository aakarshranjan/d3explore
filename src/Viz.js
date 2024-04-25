import React from "react";
import * as d3 from "d3";
import tempData from './data';

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

export default function Viz() {
    const [bars, setBars] = React.useState([]);
    let xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%b"));
    let yAxis = d3.axisLeft().tickFormat(d => `${d}℉`);
    const xAxisRef = React.useRef(null);
    const yAxisRef = React.useRef(null);

    React.useEffect(()=>{
        const extent = d3.extent(tempData, d => new Date(d.date));
        
        const xScale = d3.scaleLinear().domain(extent).range([margin.left, width - margin.right]);

        const [min, max] = d3.extent(tempData, d => d.high);
        const yScale = d3.scaleLinear().domain([Math.min(min, 0), max]).range([height - margin.bottom, margin.top]);

        const colorExtent = d3.extent(tempData, d => d.avg).reverse();
        const colorScale = d3.scaleSequential().domain(colorExtent).interpolator(d3.interpolateRdYlBu);

        const bars = tempData.map(d => {
            return {
                x: xScale(new Date(d.date)),
                y: yScale(d.high),
                height: yScale(d.low) - yScale(d.high),
                fill: colorScale(d.avg)
            };
        });
        setBars(bars);
        xAxis.scale(xScale);
        d3.select(xAxisRef.current).call(xAxis);
        yAxis.scale(yScale);
        d3.select(yAxisRef.current).call(yAxis);
    },[tempData])

    return(
        <svg width={width} height={height}>
        {bars.map(d => (
            <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill} />
        ))}
        <g ref={xAxisRef} transform={`translate(0, ${height - margin.bottom})`} />
        <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`} />
      </svg>
    )
}
