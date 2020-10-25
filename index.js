const fetchDataSet = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );
  const data = await response.json();
  // console.log("yay");
  drawGraph(JSON.stringify(data));
  // console.log(data.id);
};
fetchDataSet();

// const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

const w = 900;
const h = 600;
const padding = 50;

const drawGraph = async (dataSet) => {
  // console.log("drawGraph!");
  const json = JSON.parse(dataSet);
  // console.log(json.data);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(json.data, (d, i) => i)])
    .range([h - padding, padding]);

  const xScale = d3 //
    .scaleLinear()
    .domain([0, d3.max(json.data, (d, i) => d[1])])
    .range([padding, w - padding]);

  const xAxis = d3 //
    .axisBottom(xScale);
  const yAxis = d3 //
    .axisLeft(yScale);

  const svg = d3 //
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg //
    .selectAll("rect")
    .data(json.data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("fill", "navy")
    .attr("x", (d) => xScale(d[1]))
    .attr("y", (d, i) => yScale(i))

    .attr("width", 2)
    .attr("height", (d) => xScale(d[1]));

  // svg // TODO text
  //   .selectAll("text")
  //   .data(json.data)
  //   .enter()
  //   .append("text")
  //   .text((d) => d[1])
  //   .attr("x", (d, i) => xScale(d[1]))
  //   .attr("y", (d, i) => yScale(i));

  svg //
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis);
  svg //
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);
  // console.log(`x= ${xScale(d[1])} y= ${yScale(i)}`);
};
