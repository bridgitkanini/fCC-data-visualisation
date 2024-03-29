let dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let req = new XMLHttpRequest(); //Import JSON data.

let data
let values

let yScale
let xScale
let xAxisScale
let yAxisScale

let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select("svg");

let drawCanvas = () => {
    svg.attr("width", width)
    svg.attr("height", height)
};

let generateScales = () => {

    yScale = d3.scaleLinear()
                .domain([0, d3.max(values, (item) => { //Lowest value obv 0, and funtion to get highest value; GDP.
                    return item[1]
                })])
                .range([0, height - (2*padding)]);
    
    xScale = d3.scaleLinear()
                .domain([0, values.length - 1])
                .range([padding, width - padding]);

    let datesArray = values.map((item) => { //Function to convert dates from strings to numeric dates.
        return new Date(item[0])
    });
    
    console.log(datesArray);
                    
    xAxisScale = d3.scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([padding, width - padding]);

    yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(values, (item) => {
                    return item[1]
                })])
                .range([height-padding, padding])
};

let drawBars = () => {

    let tooltip = d3.select("body")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("visibility", "hidden") 
                    .style("width", "auto")
                    .style("height", "auto");

    svg.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", (width -(2*padding)) / values.length)
        .attr("data-date", (item) => {
            return item[0]
        })
        .attr("data-gdp", (item) => {
            return item[1]
        })
        .attr("height", (item) => { //Plotting bars on chart.
            return yScale(item[1])
        })
        .attr("x", (item, index) => { //Aligning bars with the corresponding value on the x-axis.
            return xScale(index)
        })
        .attr("y", (item) => {
            return (height - padding) - yScale(item[1]) //Inverted, then plotted according to correct height, ie, yScale.
        })
        .on('mouseover', (item) => {
            tooltip.transition()
                .style('visibility', 'visible')

            tooltip.text(item[0])

            document.querySelector('#tooltip').setAttribute('data-date', item[0])
        })
        .on('mouseout', (item) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        }) 
};

let generateAxes = () => {

    let xAxis = d3.axisBottom(xAxisScale); //Automatically includes a class="tick" for each data label.

    svg.append("g") //HTML Create g element
        .call(xAxis)
        .attr("id", "x-axis") //g element with id="x-axis"
        .attr("transform", "translate(0, " + (height - padding) + ")"); //Push x-axis-scale from the top of the page to bottom.

    let yAxis = d3.axisLeft(yAxisScale); //Automatically includes a class="tick" for each data label.

    svg.append("g")
        .call(yAxis)
        .attr("id", "y-axis") 
        .attr("transform", "translate(" + padding + ", 0)"); // 0 comes in last here, not first like x-axis.
};

req.open("GET", dataUrl, true);
req.onload = () => {
    data = JSON.parse(req.responseText)
    values = data.data
    console.log(values)
    drawCanvas()
    generateScales()
    drawBars()
    generateAxes()
};
req.send();