const dataSet = fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    // console.log(JSON.stringify(data));
    return JSON.stringify(data);
  });

console.log(dataSet);
