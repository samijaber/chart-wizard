// Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
var chart;
var iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
var tickMarks = [];
var data_JSON = '[["2013-11-17T03:00:00-05:00", 16642.724999999999], ["2013-11-17T03:15:00-05:00", 16641.24365234375], ["2013-11-17T03:30:00-05:00", 16773.292675781249], ["2013-11-17T03:45:00-05:00", 16760.090527343749], ["2013-11-17T04:00:00-05:00", 16780.26318359375], ["2013-11-17T04:15:00-05:00", 16783.791601562501], ["2013-11-17T04:30:00-05:00", 16770.326757812501], ["2013-11-17T04:45:00-05:00", 16769.242773437501], ["2013-11-17T05:00:00-05:00", 16865.4755859375], ["2013-11-17T05:15:00-05:00", 16867.572265625], ["2013-11-17T05:30:00-05:00", 16929.1982421875], ["2013-11-17T05:45:00-05:00", 16938.359960937501], ["2013-11-17T06:00:00-05:00", 17010.254296874999], ["2013-11-17T06:15:00-05:00", 17013.3916015625], ["2013-11-17T06:30:00-05:00", 17044.652148437501], ["2013-11-17T06:45:00-05:00", 17060.161523437499], ["2013-11-17T07:00:00-05:00", 17070.4462890625], ["2013-11-17T07:15:00-05:00", 17166.509179687499], ["2013-11-17T07:30:00-05:00", 17367.81640625], ["2013-11-17T07:45:00-05:00", 17378.0810546875], ["2013-11-17T08:00:00-05:00", 17427.070898437501], ["2013-11-17T08:15:00-05:00", 17381.240624999999], ["2013-11-17T08:30:00-05:00", 17500.275195312501], ["2013-11-17T08:45:00-05:00", 17728.635546875001], ["2013-11-17T09:00:00-05:00", 17958.4970703125], ["2013-11-17T09:15:00-05:00", 18055.758984374999], ["2013-11-17T09:30:00-05:00", 18252.425976562499], ["2013-11-17T09:45:00-05:00", 18430.835546875001], ["2013-11-17T10:00:00-05:00", 18745.645703124999], ["2013-11-17T10:15:00-05:00", 18918.191992187501], ["2013-11-17T10:30:00-05:00", 18848.642382812501], ["2013-11-17T10:45:00-05:00", 18840.097460937501], ["2013-11-17T11:00:00-05:00", 18801.112890625001], ["2013-11-17T11:15:00-05:00", 18970.4638671875], ["2013-11-17T11:30:00-05:00", 19046.016992187499], ["2013-11-17T11:45:00-05:00", 18997.381249999999], ["2013-11-17T12:00:00-05:00", 19002.937890624999], ["2013-11-17T12:15:00-05:00", 19158.311718749999], ["2013-11-17T12:30:00-05:00", 19143.008398437501], ["2013-11-17T12:45:00-05:00", 19186.448046875001], ["2013-11-17T13:00:00-05:00", 19193.047070312499], ["2013-11-17T13:15:00-05:00", 19193.047070312499], ["2013-11-17T13:30:00-05:00", 19178.651171875001], ["2013-11-17T13:45:00-05:00", 19140.223437500001], ["2013-11-17T14:00:00-05:00", 19128.704882812501], ["2013-11-17T14:15:00-05:00", 19104.179882812499], ["2013-11-17T14:30:00-05:00", 18904.944726562499], ["2013-11-17T14:45:00-05:00", 18951.682226562501], ["2013-11-17T15:00:00-05:00", 18963.308398437501], ["2013-11-17T15:15:00-05:00", 18995.831249999999], ["2013-11-17T15:30:00-05:00", 18983.709179687499], ["2013-11-17T15:45:00-05:00", 18998.395703124999], ["2013-11-17T16:00:00-05:00", 18814.948046875001], ["2013-11-17T16:15:00-05:00", 18765.986328125], ["2013-11-17T16:30:00-05:00", 18595.759179687499], ["2013-11-17T16:45:00-05:00", 17619.927343750001], ["2013-11-17T17:00:00-05:00", 17341.637500000001], ["2013-11-17T17:15:00-05:00", 17334.045312499999], ["2013-11-17T17:30:00-05:00", 17295.016015624999], ["2013-11-17T17:45:00-05:00", 17268.657031250001], ["2013-11-17T18:00:00-05:00", 17270.0810546875], ["2013-11-17T18:15:00-05:00", 17268.161914062501], ["2013-11-17T18:30:00-05:00", 17263.741601562499], ["2013-11-17T18:45:00-05:00", 17242.695117187501], ["2013-11-17T19:00:00-05:00", 18002.3193359375], ["2013-11-17T19:15:00-05:00", 18002.3193359375], ["2013-11-17T19:30:00-05:00", 17994.8212890625], ["2013-11-17T19:45:00-05:00", 17688.321875000001], ["2013-11-17T20:00:00-05:00", 17495.319921875001], ["2013-11-17T20:15:00-05:00", 17485.2734375], ["2013-11-17T20:30:00-05:00", 17478.0654296875], ["2013-11-17T20:45:00-05:00", 17459.159765625001], ["2013-11-17T21:00:00-05:00", 17317.943164062501], ["2013-11-17T21:15:00-05:00", 17109.694726562499], ["2013-11-17T21:30:00-05:00", 17132.626367187499], ["2013-11-17T21:45:00-05:00", 17196.263085937499], ["2013-11-17T22:00:00-05:00", 17065.213085937499], ["2013-11-17T22:15:00-05:00", 17063.723242187501], ["2013-11-17T22:30:00-05:00", 17053.420703125001], ["2013-11-17T22:45:00-05:00", 17056.326171875], ["2013-11-17T23:00:00-05:00", 16982.840039062499], ["2013-11-17T23:15:00-05:00", 16960.781054687501], ["2013-11-17T23:30:00-05:00", 16947.564843749999], ["2013-11-17T23:45:00-05:00", 16943.302929687499], ["2013-11-18T00:00:00-05:00", 16960.1494140625], ["2013-11-18T00:15:00-05:00", 16952.443164062501], ["2013-11-18T00:30:00-05:00", 16948.493359374999], ["2013-11-18T00:45:00-05:00", 16942.975195312501], ["2013-11-18T01:00:00-05:00", 16927.486718749999], ["2013-11-18T01:15:00-05:00", 16927.486718749999], ["2013-11-18T01:30:00-05:00", 16927.486718749999], ["2013-11-18T01:45:00-05:00", 16927.486718749999], ["2013-11-18T02:00:00-05:00", 16927.486718749999], ["2013-11-18T02:15:00-05:00", 16928.353515625], ["2013-11-18T02:30:00-05:00", 16944.177929687499], ["2013-11-18T02:45:00-05:00", 16952.197851562501], ["2013-11-18T03:00:00-05:00", 16946.015039062499]]';
var data = JSON.parse(data_JSON);

nv.addGraph(function() {
  chart = nv.models.lineChart()
  .options({
    margin: {left: 100, bottom: 100},
    //x: function(d,i) { return i},
    showXAxis: true,
    showYAxis: true,
    transitionDuration: 250
  }).showLegend(false)
  ;

  // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
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

    //.tickFormat(d3.format(',.1f'));
     // .tickFormat(function(d) {
     //   var date = new Date(d);
     //   return date;
     // });

    //.tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); })



  chart.yAxis
    .axisLabel('Voltage (v)')
    .tickFormat(d3.format(',.2f'))
    ;

  d3.select('#chart1 svg')
    .datum(populate())
    .call(chart);

  //TODO: Figure out a good way to do this automatically
  nv.utils.windowResize(chart.update);
  //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});

function populate() {
  var arr = [];
  
  for (var i = 0; i < data.length; i++) {
      arr.push({x: new Date(data[i][0]), y: data[i][1]});
  };

  for (var i = 0; i < arr.length; i+=4) {
    tickMarks.push(arr[i].x);
  };

  return [{
      values: arr,
      key: "Energy Consumption Forecast",
      color: "#667711"
    }];
}
