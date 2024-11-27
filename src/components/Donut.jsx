import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const parseTime = (time) => {
    const [hourMinute, period] = time.split(' ');
    let [hours, minutes] = hourMinute.split(':').map(Number);

    if (period === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    return { hours, minutes };
};

const calculateDayNight = (sunrise, sunset) => {
    const sunriseTime = parseTime(sunrise);
    const sunsetTime = parseTime(sunset);

    const sunriseMinutes = sunriseTime.hours * 60 + sunriseTime.minutes;
    const sunsetMinutes = sunsetTime.hours * 60 + sunsetTime.minutes;

    const totalMinutes = 24 * 60; // Total minutes in a day
    const dayMinutes = sunsetMinutes - sunriseMinutes;
    const nightMinutes = totalMinutes - dayMinutes;

    return [
        { label: 'Day', value: dayMinutes },
        { label: 'Night', value: nightMinutes },
    ];
};





const DonutChart = ({ sunrise, sunset }) => {
    const svgRef = useRef();

    useEffect(() => {
        const data = calculateDayNight(sunrise, sunset);

        const width = 300;
        const height = 300;
        const innerRadius = 80;
        const outerRadius = 120;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(['#FFD700', '#2C3E50']); // Day (gold) and Night (dark blue)

        const arcGenerator = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        const pieGenerator = d3.pie()
            .value(d => d.value)
            .sort(null);

        const arcs = pieGenerator(data);

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        svg.selectAll('path')
            .data(arcs)
            .join('path')
            .attr('d', arcGenerator)
            .attr('fill', d => color(d.data.label))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

        svg.selectAll('text')
            .data(arcs)
            .join('text')
            .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '12px')
            .text(d => `${d.data.label}`);
    }, [sunrise, sunset]);

    return <svg ref={svgRef}></svg>;
};

export default DonutChart;
