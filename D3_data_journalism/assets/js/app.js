
// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 800;

// Define the chart's margins as an object
var chartMargin = {
top: 30,
right: 30,
bottom: 80,
left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Read in data.csv
d3.csv("assets/data/data.csv").then(function(censusData){

    // Print the tvData
    console.log(censusData);

    const [dataValues] = d3.values(censusData)
    const keys = Object.keys(dataValues)
    console.log(keys);
    var valueofX = keys[9];
    var valueofY = keys[7];
    console.log(valueofX);
    console.log(valueofY);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 30])
        .range([ 0, chartWidth ]);
        chartGroup.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, (d3.max(censusData, d => d.income)) * 1.1])
        .range([ chartHeight, 0]);
        chartGroup.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    var gdots = chartGroup
        .selectAll("dot")
        .data(censusData)
        .enter()
        .append('g')

    gdots.append("circle")
    //.attr("class", "dot")
    .attr("cx", function (d) { return x(d.healthcare); } )
    .attr("cy", function (d) { return y(d.income); } )
    .attr("r", 8)
    .style("fill", "#69b3a2");

    gdots.append("text")
    .text(function (d) { return d.abbr; } )
    .attr("x", function (d) { return x(d.healthcare); } )
    .attr("y", function (d) { return y(d.income); } )
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("font-size", "10px");

    chartGroup.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", chartWidth/2 + 50)
    .attr("y", chartHeight + 45)
    .style("font-size", "25px")
    .text(valueofX);

    chartGroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", - 50)
    .attr("x", -300)
    .attr("transform", "rotate(-90)")
    .style("font-size", "25px")
    .text(valueofY);

});
