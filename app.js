// FLASH IT: 

// Data for Bar Chart
var data = [  
   {  
     "grade":"V8",
     "gradeNum":8,
     "flash":0,
     "redpoint":1 
   },
   {  
      "grade":"V7",
      "gradeNum":7,
      "flash":2,
      "redpoint":3 
   },
   {  
      "grade":"V6",
      "gradeNum":6,
      "flash":3,
      "redpoint":5 
   },
   {  
      "grade":"V5",
      "gradeNum":5,
      "flash":8,
      "redpoint":2 
   },
   {  
      "grade":"V4",
      "gradeNum":4,
      "flash":3,
      "redpoint":1 
   },
   {  
      "grade":"V3",
      "gradeNum":3,
      "flash":10,
      "redpoint":0 
   }
];

// TRend Data:
var trendData = [2501, 2488, 1577, 2551, 2602];

var trendData = [  
   {  
      "date":"20140401",
      "points":2501,
   },
   {  
      "date":"20140501",
      "points":2488,
   },
   {  
      "date":"20140601",
      "points":1577,
   },
   {  
      "date":"20140701",
      "points":2551,
   },
   {  
      "date":"20140801",
      "points":2776,
   },
   {  
      "date":"20140901",
      "points":3011,
   }
];

// Data for Ring Chart
totalFlashes = 0;
totalRedpoints = 0;

for(i=0;i<data.length;i++){
  totalFlashes += data[i]['flash'];
  totalRedpoints += data[i]['redpoint'];
}
//console.log('flashes',totalFlashes);
//console.log('redpoints',totalRedpoints);

// Data for points trend:

totalFlashPoints = 0;
totalRedpointPoints = 0;
for(i=0;i<data.length;i++){
  f = data[i]['flash'];
  r = data[i]['redpoint'];
  totalFlashPoints    += Math.pow(2,(f+1));
  totalRedpointPoints += Math.pow(2,r);
}
//console.log('flash points',totalFlashPoints);
//console.log('redpoint points',totalRedpointPoints);

// Make the Bar Chart
var width = 100,
    barHeight = 20,
    leftBuffer = 20,
    barSpacer = 1;

var x = d3.scale.linear()
    .range([0, width]);

var barChart = d3.select(".barChart")
    .attr("width", width);

d3.select('.metrics').append("text")
    .text("Route Data")
    .attr("class",'title');

x.domain([0, d3.max(data, function(d) { return d.flash; })]);

barChart.attr("height", barHeight * data.length);

// one bar per data element
var bar = barChart.selectAll("g")
  .data(data)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
// stacked bar graph - this is the "Flash" element
bar.append("rect")
  .attr("x",leftBuffer)
  .attr("width", function(d) { return x(d.flash); })
  .attr("height", barHeight - barSpacer)
  .attr("class", 'flash');
// this is the "redpoint" element
bar.append("rect")
  .attr("x",function(d) { return (x(d.flash)+leftBuffer); })
  .attr("width", function(d) { return x(d.redpoint); })
  .attr("height", barHeight - barSpacer)
  .attr("class", 'redpoint');
// text in the "Flash" bar - shows the value
bar.append("text")
  .attr("x", function(d) { return x(d.flash) - 3; })
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) { return d.flash; })
  .attr("class",'in');
// text in the "Redpoint" bar - shows the value
bar.append("text")
  .attr("x", function(d) { return (x(d.flash) + x(d.redpoint) - 3 + leftBuffer); })
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) { return d.redpoint; })
  .attr("class",'in');
// text outside the chart - shows the V-grade 
bar.append("text")
  .attr("x", 0)
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) { return d.grade; })
  .attr("class",'out');








// Ring Chart

var w = 300;
var h = 300;

// dataset: 
var dataset = [ totalFlashes,totalRedpoints];
var dataset2 = [
   {  
      "style":"flash",
      "total":totalFlashes,
   },
   {  
      "style":"redpoint",
      "total":totalRedpoints,
   }];
var colorArray = ['#FAAF34','#FD2540'];

var outerRadius = w / 2;
var innerRadius = w / 3;
var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

var pie = d3.layout.pie()
  .startAngle(-.5)
  ;
//console.log("pie(dataset)",pie(dataset));
//console.log("pie function",pie);

//Easy colors accessible via a 10-step ordinal scale
//var color = d3.scale.category10();

//Create SVG element
var ringChart = d3.select(".ringChart")
  .attr("width", w)
  .attr("height", h);

//Set up groups
var arcs = ringChart.selectAll("g.arc")
  .data(pie(dataset))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//Draw arc paths
arcs.append("path")
  .attr("fill", function(d, i) {
    //return color(i);
    return colorArray[i];
  })
  .attr("d", arc);

//Labels
arcs.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d,i) {
      return d.value + ' ' + dataset2[i]['style'];
    })
    .attr("class", "donutchart");


ringChart.append("text")
  .attr("x", w / 2)
  .attr("y", h / 2)
  .attr("dy", ".35em")
  .text(totalFlashPoints)
  .attr("class",'donutcenter');

ringChart.append("text")
  .attr("x", w / 2)
  .attr("y", h / 2+30)
  .attr("dy", ".35em")
  .text(" Flash Points")
  .attr("class",'donutcentersub');


// TREND CHART: 

var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    //.interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.points); });
//console.log('line',line);

var trendChart = d3.select(".trendChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



// inside the tsv loop. 
color.domain(d3.keys(trendData[0]).filter(function(key) { return key !== "date"; }));

//replace date with actual date
trendData.forEach(function(d) {
  d.date = parseDate(d.date);
});

//console.log('trendData',trendData);

var cities = color.domain().map(function(name) {
  return {
    name: name,
    values: trendData.map(function(d) {
      return {date: d.date, points: +d[name]};
    })
  };
});
console.log('cities',cities);

x.domain(d3.extent(trendData, function(d) { return d.date; }));

y.domain([
  d3.min(cities, function(c) { console.log('cValues',c.values); return d3.min(c.values, function(v) { return v.points; }); }),
  d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.points; }); })
]);

trendChart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

trendChart.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("points (ºF)");

var city = trendChart.selectAll(".city")
    .data(cities)
  .enter().append("g")
    .attr("class", "city");

city.append("path")
    .attr("class", "line")
    .attr("d", function(d) { console.log('citiesd',d.values);return line(d.values); })
    .style("stroke", function(d) { return color(d.name); });

city.append("text")
    .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.points) + ")"; })
    .attr("x", 3)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });







