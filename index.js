const fetchDataSet = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );
  const data = await response.json();
  console.log("yay");
  drawGraph(JSON.stringify(data));
  // console.log(data.id);
};
fetchDataSet();

// const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

const w = 500;
const h = 100;

const drawGraph = async (dataSet) => {
  // console.log("drawGraph!");
  const json = JSON.parse(dataSet);
  console.log(json.data);
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
    .attr("fill", "navy")
    .attr("x", (d, i) => i * 30)
    .attr("y", (d, i) => {
      console.log(d[1]);
      return h - 3 * d[1];
    })
    .attr("width", 25)
    .attr("height", (d, i) => 3 * d);
};
