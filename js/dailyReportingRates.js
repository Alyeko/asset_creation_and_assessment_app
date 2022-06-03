graphState = 0;
var device_width;

function showGraph() {
    if (graphState ===0) {
    document.getElementById("graphWrapper").style.top = "300px";
    document.getElementById("graphWrapper").style.top="15%";
    
    var widtha = document.getElementById("graphWrapper").offsetWidth;
    var heighta = document.getElementById("graphWrapper").offsetHeight;

    document.getElementById("graphWrapper").innerHTML='<button type="button" class="close" aria-label="Close" onclick="closePlot();">X</button>';

// keep the existing HTML as there is a button that is needed
document.getElementById("graphWrapper").innerHTML=document.getElementById("graphWrapper").innerHTML+'<h5 style="text-align: center">Daily Reporting Rates Bar Graph</h5>'+'<div class="h-75 w-75 d-none d-lg-block"><svg width="'+widtha+'" height="'+heighta+'" id="svg1"></svg></div>'

const svg = d3.select("#svg1"),
      margin = {top: 20, right: 20, bottom: 80, left: 50},
      width  = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      x0     = d3.scaleBand().rangeRound([0, width]).padding(0.2),
      x1     = d3.scaleBand().padding(0.1),
      y      = d3.scaleLinear().rangeRound([height, 0]),
      g      = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


var URL = document.location.origin + "/api/dailyParticipationRates"
d3.json(URL).then(data => {
  data = data[0]['array_to_json'];

  const map = {'Sunday':1, 'Monday': 2,'Tuesday': 3, 'Wednesday': 4,  //this code block sorts the json according to the days of 
                    'Thursday': 5, 'Friday': 6,'Saturday': 7};       //the week as they occur(adapted from 
                                                                  //https://www.tutorialspoint.com/sorting-objects-according-to-days-name-javascript)
    
      data.sort((a, b) => {
           return map[a.day] - map[b.day];
        });
      data;
  x0.domain(data.map(d => d.day));
  x1.domain(['reports_submitted', 'reports_not_working']).range([0, x0.bandwidth()])
  y.domain([0, d3.max(data, d => d.reports_submitted)]);
  


  var day = svg.selectAll(".day")    //code adapted from https://stackoverflow.com/questions/53518370/d3-bar-chart-add-legend
  .data(data)
  .enter().append("g")
  .attr("class", "day")
  .attr("transform", d => `translate(${x0(d.day)},0)`)

  //Add reports_submitted bars 
  day.selectAll(".bar.reports_submitted")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar reports_submitted")
      .style("fill","#DFCD17")
      .attr("x", 110, d => x1('reports_submitted'))
      .attr("y", d => y(d.reports_submitted))
      .attr("width", x1.bandwidth()+5)
      .attr("height", d => (height) - y(d.reports_submitted))

  // Add reports_not_working bars 
  day.selectAll(".bar.reports_not_working")
  .data(d => [d])
  .enter()
  .append("rect")
  .attr("class", "bar reports_not_working")
  .style("fill","#404080")
  .attr("x", 54, d => x1('reports_not_working'))
  .attr("y", d => y(d.reports_not_working))
  .attr("width", x1.bandwidth()+5)
  .attr("height", d => (height) - y(d.reports_not_working))

  g.append("g")
  .attr("class", "axis axis-x")
  .attr("transform", `translate(0,${height-20})`)
  .call(d3.axisBottom(x0));

  g.append("g")
  .attr("class", "axis axis-y")
  .attr("transform", `translate(0,-20)`)
  .call(d3.axisLeft(y).ticks(10).tickSize(8));
  
  
})


    .catch(err => {
        svg.append("text")
            .attr("y", 20)
            .attr("text-anchor", "left")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text(`Couldn't open the data file: "${err}".`);
    });

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x",(width/2)+80)
    .attr("y", (width/2)+80)
    //.attr("transform", "translate(5, "+height/6+")")
    .text("Days of the week");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")  //this block of code gives a label for the y-axis
    .attr("y", 10)               //it is adapted from https://stackoverflow.com/questions/11189284/d3-axis-labeling
    .attr("x", -20)
    .attr("dy", ".25em")
    .attr("transform", "translate(5, "+height/6+")rotate(-90)")
    .text("Number of condition reports created");

    //this block of code creates legend on the graph. It is adapted from https://d3-graph-gallery.com/graph/custom_legend.html 
    svg.append("circle").attr("cx",800).attr("cy",20).attr("r", 6).style("fill", "#DFCD17")
    svg.append("text").attr("x", 820).attr("y", 25).text("Reports submitted").style("font-size", "15px").attr("alignment-baseline","end")
    
    svg.append("circle").attr("cx",800).attr("cy",33).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 820).attr("y", 38).text("Reports not working").style("font-size", "15px").attr("alignment-baseline","end")

    graphState=1; //this means graph has been loaded on screen
}

else if (graphState===1){ alert('Graph is already loaded and cannot be loaded again')}
}



function closePlot() {
    graphState +=1; //closePlot function has been clicked
    if (graphState === 2) {
    document.getElementById("graphWrapper").style.top = "-9999px";
    graphState=0;}

    
}