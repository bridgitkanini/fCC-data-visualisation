let dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let req = new XMLHttpRequest(); //Import JSON data.

let data
let values

let yScale
let xScale
let xAxis
let yAxis

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
                    
    xAxis = d3.scaleTime()
                .domain([d3.min(datesArray), d3.max(datesArray)])
                .range([padding, width - padding]);

    yAxis = d3.scaleLinear()
                .domain([0, d.max(values, (item) => {
                    return item[1]
                })])
                .range([height-padding, padding])
};

let drawBars = () => {};

let generateAxes = () => {};

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