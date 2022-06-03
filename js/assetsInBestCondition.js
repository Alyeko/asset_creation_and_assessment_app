var tableState = 0;

function showTable() {
  if (tableState ===0) {
    document.getElementById("tableWrapper").style.top = "300px";
    document.getElementById("tableWrapper").style.top="15%"; 
    
    var widtha = document.getElementById("tableWrapper").offsetWidth;
    var heighta = document.getElementById("tableWrapper").offsetHeight;

    document.getElementById("tableWrapper").innerHTML='<button type="button" class="close" aria-label="Close" onclick="closeTable();">X</button>';
    
    // keep the existing HTML as there is a button that is needed table
    document.getElementById("tableWrapper").innerHTML=document.getElementById("tableWrapper").innerHTML+'<h5 style="text-align: center">List of Assets in Best Condition</h5>'+'<div class="h-75 w-75 d-none d-lg-block"><table width="'+widtha+'" height="'+heighta+'" id="table"></table></div>'

    const table = d3.select("#table"),
      margin = {top: 20, right: 20, bottom:30, left: 50},
      width  = +table.attr("width") - margin.left - margin.right,
      height = +table.attr("height") - margin.top - margin.bottom,
      thead  = table.append('thead');
      tbody  = table.append('tbody');
      table.style("border-collapse", "collapse");
      table.style("border", "2px blue solid"); //creates a black border around the table

      var URL = document.location.origin + "/api/assetsInGreatCondition"
      d3.json(URL).then(data => {
      data = data[0]['array_to_json'];
            
      function tabulate(data, columns) { //code adapted from http://bl.ocks.org/jfreels/6734025
        //append the header row
        thead.append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
          .text(function (column) { return column; })
          .style("border", "1px blue solid"); //adapted from https://bl.ocks.org/d3noob/5d47df5374d210b6f651

        //create a row for each object in the data
        var rows = tbody.selectAll('tr')
          .data(data)
          .enter()
          .append('tr')
          .style("border", "2px blue solid");

       //create a cell in each row for each column
        var cells = rows.selectAll('td')
          .data(function (row) {
            return columns.map(function (column) {
            return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
          .text(function (d) { return d.value; })
          .style("border", "2px blue solid");

      return table;
    }
    tabulate(data, ['id', 'asset_name', 'installation_date', 'user_id', 'timestamp']);
 })
    

    .catch(err => {
        table.append("text")
             .attr("y", 20)
             .attr("text-anchor", "left")
             .style("font-size", "20px")
             .style("font-weight", "bold")
             .text(`Couldn't open the data file: "${err}".`);})
  tableState=1;}

else if (tableState===1) {
  alert('Table is already loaded and cannot be loaded again')}


}


function closeTable() {
      tableState+=1;
      if (tableState ===2 ){
      document.getElementById("tableWrapper").style.top = "-9999px";}
      tableState=0;
}


