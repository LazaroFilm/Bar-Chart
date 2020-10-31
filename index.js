const fetchDataSet = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );
  const data = await response.json();
  drawGraph(JSON.stringify(data));
};
fetchDataSet();

// .parse = %Y-m-%d

const w = 500;
const h = 400;
const padding = 50;

const drawGraph = async (dataSet) => {
  const json = JSON.parse(dataSet);
  //! console.log(`${json.data[1][0]}T00:00:00`);
  //! d3.timeParse(`${d[0]}T00:00:00`)
  // const xScale = d3; //
  // .scaleLinear()
  // .domain([0, d3.max(json.data, (d, i) => i)])
  // .range([padding, w - padding]);
  const parseTime = d3.timeParse("%Y-%m-%d");
  const xScale = d3 //
    .scaleTime()
    .domain(d3.extent(json.data, (d) => parseTime(d[0])))
    .range([padding, w - padding]);

  const xAxis = d3 //
    .axisBottom()
    .scale(xScale)
    .ticks(5);
  // .ticks(d3.max(json.data, (d, i) => i));
  // .tickFormat((d, i) => xScale(json.data[i][0]));

  const yScale = d3 //
    .scaleLinear()
    .domain([0, d3.max(json.data, (d, i) => d[1])])
    .range([h - padding, padding]);

  const yAxis = d3 //
    .axisLeft(yScale);

  const svg = d3 // SVG Box
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg // Bars
    .selectAll("rect")
    .data(json.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("fill", "navy")
    .attr("x", (d, i) => xScale(parseTime(d[0])))
    .attr("y", (d, i) => yScale(d[1]))
    .attr("height", (d, i) => h - yScale(d[1]) - padding)
    .attr("width", 1);

  svg // Y Axis
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);
  svg // X Axis
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis);
  // console.log(`x= ${xScale(d[1])} y= ${yScale(i)}`);
};
