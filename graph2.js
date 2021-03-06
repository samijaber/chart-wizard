// Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
var chart2;
var tickMarks = [];
var arr2 = [];

nv.addGraph(function() {
  chart2 = nv.models.lineChart()
  .options({
    margin: {left: 100, bottom: 100},
    //x: function(d,i) { return i},
    showXAxis: true,
    showYAxis: true,
    transitionDuration: 250
  })
  ;

  // chart2 sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart2, so need to chain separately
    chart2.xAxis
         .axisLabel('Date')
         .rotateLabels(-65)
         .tickValues(tickMarks)
         .tickFormat(function(d) { 
          var date = new Date(d);
          var date2 = new Date(d);

          if(date.getMinutes() == 0) {
            if(date2.getHours == 0) { 
              date2.setHours(23);
            }
            else { 
              date2.setHours(date.getHours() - 1);
            }            
            date2.setMinutes(45);
          }
          else {
            date2.setMinutes(date.getMinutes() - 15);
          }

          return (d3.time.format('%m/%d, ')(date2) +
          d3.time.format('%H:%M')(date2) + 
          "-" + 
          d3.time.format('%H:%M')(date)); 

        });

  chart2.yAxis
    .axisLabel('Energy Consumption (kW/h)')
    .tickFormat(d3.format(',.2f'))
    ;

  d3.select('#chart2 svg')
    .datum(populate2())
    .call(chart2);

  //TODO: Figure out a good way to do this automatically
  nv.utils.windowResize(chart2.update);
  //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart2) });

  chart2.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart2;
});

function populate2() {
  var arr = [];
  
  for (var i = 0; i < data.length; i++) {
      arr.push({x: new Date(data[i][0]), y: data[i][1]});
  };

  for(var i = 0; i < arr.length; i++) {
    arr2[i] = {x: arr[i].x, y: arr[i].y + 500};
  }

  for (var i = 0; i < arr.length; i+=4) {
    tickMarks.push(arr[i].x);
  };

  var now = data[0];
  var last = data[0];
  updateCard2(now, last);

  return [{
      values: arr,
      key: "Energy Consumption Forecast",
      color: "#667711"
    },

    {
      values: arr2,
      key: "Last Year's Consumption",
      color: ""
    }];
}

function updateCard2(now, last) {
  now[1] =  Math.floor(now[1] * 1000) / 1000;
  last[1] =  Math.floor(last[1] * 1000) / 1000;
  $('#card2').text("The estimate closest to last year is during " +  formatCardDate(now[0]) + ": we estimate " + now[1]+ " kWh, while we had " + last[1] +  " kWh last year.");
}
