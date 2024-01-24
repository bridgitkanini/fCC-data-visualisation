let dataUrl ="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
let req = new XMLHttpRequest();

let baseTemp
let values

let xScale
let yScale

let width = 1200;
let height = 600;
let padding = 60;

let canvas = d3.select("#canvas");
canvas.attr("width", width);
canvas.attr("height", height);

let generateScales = () => {};

let drawCells = () => {};

let drawAxes = () => {};

req.open("GET", dataUrl, true); //Req methods to display data on live server console.
req.onload = () => {
    let object = JSON.parse(req.responseText) //Fetching JSON Data.
    baseTemp = object["baseTemperature"] // Reorganise/ pass into defined variables baseTemp & values.
    values = object["monthlyVariance"]
    console.log(baseTemp)
    console.log(values)
    generateScales()
    drawCells()
    drawAxes()
};
req.send();