function buildSite(siteid) {
  url = '/kpisite/CData/'+siteid; 
  d3.json(url).then(function(data) {
    var tbody = d3.select("tbody");;
    tbody.html("");
    data.forEach((ufos) => {
      var row = tbody.append("tr");
       Object.entries(ufos).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
      }); 
  });
}; 



buildBarPSAccess("MI4465UMTS");
buildBarCSAccess("MI4465UMTS");
buildBubbleSiteRSCP("MI4465UMTS");
buildBubbleSiteThroughput("MI4465UMTS");
buildBubbleSiteUser("MI4465UMTS");
buildBubbleSiteQuality("MI4465UMTS");
buildBubbleSiteRtwp("MI4465UMTS");
buildBubbleSitePropagation("MI4465UMTS");

function optionChangedSITE() {
    
  // Fetch new data each time a new sample is selected
var selectedSite = selDatasetsite.options[selDatasetsite.selectedIndex].value;
  // updateBubbleChart(selectedSite )
  buildSite(selectedSite);
  updatebuildBarPSAccess(selectedSite);
  updatebuildBarCSAccess(selectedSite);
  updateBubbleChartSiteThroughput(selectedSite);
  updatebuildBubbleSiteUser(selectedSite);
  updatebuildBubbleSiteQuality(selectedSite);
  updatebuildBubbleSiteRtwp(selectedSite);
  updatebuildBubbleSitePropagation(selectedSite);
  updatebuildBubbleSiteRSCP(selectedSite);
  MapSiteSheet(selectedSite);
  console.log(selectedSite);
}


function initSite(selectedRNC) {
  var selectorsite=d3.select("#selDatasetsite");
  url = '/kpisite/site/'+ selectedRNC
  selectorsite.html("");  
  d3.json(url).then((samplesite) => {
    samplesite.forEach((site) => {
      selectorsite
        .append("option")
        .text(site)
        .property("value", site);
    });

  });
}


function getbuildBarCSAccess(data){
  BarCharData = [{
  x: data.dates,
  y: data.cs_call_completion,
  text: data.nodebname,
  type: "bar",
  marker: {
    color:'yellow'},
  }];
  
return BarCharData
}
function buildBarCSAccess(siteid){
url='/kpisite/pmdata/'+siteid;

Plotly.d3.json(url, function(data){


  var layout = {
      title: "CS Access",
      width: 500,
      height: 400,
      xaxis:{
        type: 'date',
        valueFormatString: "DD-MMM" ,
        labelAngle: -50
      },
      yaxis: {
        ticktext: data.cs_call_completion,
        title:'CSSR%',
        automargin: true
      },
      xaxis: {
        automargin: true
      }
  }
  var BAR = document.getElementById('csaccess');

  var trace=getbuildBarCSAccess(data);

  Plotly.plot(BAR, trace, layout);
});
}

function updatebuildBarCSAccess(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('csaccess');
      
    var trace=getbuildBarCSAccess(response);


      Plotly.restyle(PLOT, "x", [trace[0].x]);
      Plotly.restyle(PLOT, "y", [trace[0].y]);
      Plotly.restyle(PLOT, "text", [trace[0].text]);
      Plotly.restyle(PLOT, "marker", [trace[0].marker]);

  })
}
function getbuildBarPSAccess(data){
  BarCharData = [{
  x: data.dates,
  y: data.ps_call_completion,
  text: data.nodebname,
  type: "bar",
  marker: {
    color:'green'},
  }];
  
return BarCharData
}
function buildBarPSAccess(siteid){
url='/kpisite/pmdata/'+siteid;

Plotly.d3.json(url, function(data){


  var layout = {
      title: "PS Access",
      width: 500,
      height: 400,
      yaxis: {
        ticktext: data.ps_call_completion,
        title:'PSSR%',
        automargin: true
      },
      xaxis: {
        automargin: true
      }
  }
  var BAR = document.getElementById('psaccess');
  var trace=getbuildBarPSAccess(data);

  Plotly.plot(BAR, trace, layout);
});
}

function updatebuildBarPSAccess(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('psaccess');
      
    var trace=getbuildBarPSAccess(response);


      Plotly.restyle(PLOT, "x", [trace[0].x]);
      Plotly.restyle(PLOT, "y", [trace[0].y]);
      Plotly.restyle(PLOT, "text", [trace[0].text]);

  })
}
function buildBubbleSiteThroughput(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
        x: response.dates,
        y: response.throughput_kbps,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 13,
          colorscale: 'Rainbow',
          color: response.throughput_kbps,
          text: response.nodebname,
        }
      };

      var data = [trace1];
    
      var layout = {
          title: "Throughput (kbps)", 
          height: 500,
          width: 500,
          yaxis: {
            title: {
              text: 'Throughput(kbps)',
              font: {
                size: 18,
                color: '#7f7f7f'
              }
            }
          }
        };
        
      var PLOT = document.getElementById('throughput');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updateBubbleChartSiteThroughput(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('throughput');
      
      var trace = {
        x: response.dates,
        y: response.throughput_kbps,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 10,
          text: response.nodebname,
          color: response.throughput_kbps,
        }
    };

      
      var response = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker", [trace.marker]);
  })
}


function buildBubbleSiteUser(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
        x: response.dates,
        y: response.users_total,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 13,
          colorscale: 'Rainbow',
          color: response.users_total,
          text: response.nodebname,
        }
      };

      var data = [trace1];
    
      var layout = {
          title: "User Total", 
          height: 500,
          width: 500,
          yaxis: {
            title: {
              text: 'Users',
              font: {
                size: 18,
              }
            }
          }
        };
        
      var PLOT = document.getElementById('userdata');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updatebuildBubbleSiteUser(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('userdata');
      
      var trace = {
        x: response.dates,
        y: response.users_total,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 10,
          text: response.nodebname,
          color: response.users_total,
        }
    };

      
      var response = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker", [trace.marker]);
  })
}

function buildBubbleSiteQuality(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
        x: response.dates,
        y: response.goodquality,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 13,
          colorscale: 'Rainbow',
          color: response.goodquality,
          text: response.nodebname,
        }
      };

      var data = [trace1];
    
      var layout = {
          title: "Quality(%)", 
          height: 500,
          width: 500,
          yaxis: {
            title: {
              text: 'Quality(%)',
              font: {
                size: 18,
              }
            }
          }
        };
        
      var PLOT = document.getElementById('quality');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updatebuildBubbleSiteQuality(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('quality');
      
      var trace = {
        x: response.dates,
        y: response.goodquality,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 10,
          text: response.nodebname,
          color: response.goodquality,
        }
    };

      
      var response = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker", [trace.marker]);
  })
}

function buildBubbleSiteRtwp(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
        x: response.dates,
        y: response.rtwp,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 13,
          colorscale: 'Rainbow',
          color: response.rtwp,
          text: response.nodebname,
        }
      };

      var data = [trace1];
    
      var layout = {
          title: "RTWP(dBm)", 
          height: 500,
          width: 500,
          yaxis: {
            title: {
              text: 'RTWP(dBm)',
              font: {
                size: 18,
              }
            }
          }
        };
        
      var PLOT = document.getElementById('rtwp');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updatebuildBubbleSiteRtwp(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('rtwp');
      
      var trace = {
        x: response.dates,
        y: response.rtwp,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 10,
          text: response.nodebname,
          color: response.rtwp,
        }
    };

      
      var response = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker", [trace.marker]);
  })
}

function buildBubbleSitePropagation(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
        x: response.dates,
        y: response.propagation_mts,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 13,
          colorscale: 'Rainbow',
          color: response.propagation_mts,
          text: response.nodebname,
        }
      };

      var data = [trace1];
    
      var layout = {
          title: "Propagation(meters)", 
          height: 500,
          width: 500,
          yaxis: {
            title: {
              text: 'Meters',
              font: {
                size: 18,
              }
            }
          }
        };
        
      var PLOT = document.getElementById('propagation');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updatebuildBubbleSitePropagation(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('propagation');
      
      var trace = {
        x: response.dates,
        y: response.propagation_mts,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 10,
          text: response.nodebname,
          color: response.propagation_mts,
        }
    };

      
      var response = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker", [trace.marker]);
  })
}

function buildBubbleSiteRSCP(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
        x: response.dates,
        y: response.coverage_rscp,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 13,
          colorscale: 'Rainbow',
          color: response.coverage_rscp,
          text: response.nodebname,
        }
      };

      var data = [trace1];
    
      var layout = {
          title: "RSCP(dBm)", 
          height: 500,
          width: 500,
          yaxis: {
            title: {
              text: 'RSCP(dBm)',
              font: {
                size: 18,
              }
            }
          }
        };
        
      var PLOT = document.getElementById('rscp');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updatebuildBubbleSiteRSCP(siteid) {
  url='/kpisite/pmdata/'+siteid;
  Plotly.d3.json(url, function(response){
      var PLOT = document.getElementById('rscp');
      
      var trace = {
        x: response.dates,
        y: response.coverage_rscp,
        text:response.nodebname,
        mode: 'markers',
        marker: {
          size: 10,
          text: response.nodebname,
          color: response.coverage_rscp,
        }
    };

      
      var response = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker", [trace.marker]);
  })
}
function getPieChartDatatrafficmb(data) {
      pieChartData = [{
     "labels": data.rnc,
     "values": data.traffic_mb,
     "type": "pie"}]

 return pieChartData
}

function buildPieTrafficmb() {
  url='/pie';
Plotly.d3.json(url, function(data){

    var layout = {
        title: "Traffic(Mbps) by RNCs",
        height: 500,
        width: 350,
        showlegend:false
      };
    var PIE = document.getElementById('pietraffic_mb');

    var trace=getPieChartDatatrafficmb(data);

    Plotly.plot(PIE, trace, layout);
})
}

function getPieChartDatatrafficuserdata(data) {
      pieChartData = [{
     "labels": data.rnc,
     "values": data.users_data,
     "type": "pie"}]

 return pieChartData
}

function buildPieTrafficuserdata() {
  url='/pie';
Plotly.d3.json(url, function(data){

    var layout = {
        title: "Data Users by RNCs",
        height: 500,
        width: 350,
        showlegend:false
      };
    var PIE = document.getElementById('trafficuserdata');

    var trace=getPieChartDatatrafficuserdata(data);

    Plotly.plot(PIE, trace, layout);
})
}

function getPieChartDatatrafficuser(data) {
      pieChartData = [{
     "labels": data.rnc,
     "values": data.users_total,
     "type": "pie"}]

 return pieChartData
}
function buildPieTrafficuser() {
  url='/pie';
Plotly.d3.json(url, function(data){

    var layout = {
        title: "Total Users by RNCs",
        height: 500,
        width: 400
      };
    var PIE = document.getElementById('trafficuser');

    var trace=getPieChartDatatrafficuser(data);

    Plotly.plot(PIE, trace, layout);
})
}
function getbuildBarThroughput(data){
    BarCharData = [{
    x: data.throughput_kbps,
    y: data.rnc,
    text: data.rnc,
    type: "bar",
    marker: {
      color:'green'},
    orientation: "h"}];
    
  return BarCharData
}
function buildBarThroughput(){
  url='/barrnc';
  Plotly.d3.json(url, function(data){

    var layout = {
        title: "Throughput(kbps) by RNC",
        width: 500,
        height: 400,
        yaxis: {
          ticktext: data.rnc,
        },
        xaxis: {
          title: 'Throughput(kbps)',
          ticktext: data.throughput_kbps,
          automargin: true
        }
    }
    var BAR = document.getElementById('barthroughput');

    var trace=getbuildBarThroughput(data);

    Plotly.plot(BAR, trace, layout);
});
}

function getbuildGoodQuality(data){
  BarCharData = [{
  x: data.goodquality,
  y: data.rnc,
  text: data.rnc,
  type: "bar",
  marker: {
    color:'orange'},
  orientation: "h"}];
  
return BarCharData
}
function buildBarGoodQuality(){
url='/barrnc';
Plotly.d3.json(url, function(data){

  var layout = {
      title: "Quality by RNC",
      width: 500,
      height: 400,
      yaxis: {
        ticktext: data.rnc,
      },
      xaxis: {
        title: 'Quality(%)',
        ticktext: data.goodquality,
        automargin: true
      }
  }
  var BAR = document.getElementById('barps');

  var trace=getbuildGoodQuality(data);

  Plotly.plot(BAR, trace, layout);
});
}
  
function init() {
    // Grab a reference to the dropdown select element
    
    var selectorRNC=d3.select("#selDatasetrnc");
    d3.json("/RNC").then((sampleRNC) => {
      sampleRNC.forEach((RNC) => {
        selectorRNC
          .append("option")
          .text(RNC)
          .property("value", RNC);
      });
    });
 }



function optionChangedRNC() {
  // Fetch new data each time a new sample is selected
  var selectedRNC = selDatasetrnc.options[selDatasetrnc.selectedIndex].value;
  //var selectedRNC = selDatasetrnc.value;
  initSite(selectedRNC);
  buildBubble(selectedRNC);
  updateBubbleChart(selectedRNC)
  //optionChangedSITE(selectedRNC);
  console.log(selectedRNC);
}



function buildBubble(selectedRNC) {
  url = '/topoffender/'+selectedRNC;
  Plotly.d3.json(url, function(response) {
      var trace1 = {
          x: response.goodquality,
          y: response.throughput_kbps,
          text:response.nodebname,
          mode: 'markers',
          marker: {
              size: response.goodquality,
              colorscale: 'Rainbow',
              color: response.throughput_kbps,
              text: response.nodebname
          }
      };

      var data = [trace1];
    
      var layout = {
          title: "Throughput vs Quality Top Offender by RNC", 
          height: 600,
          width: 1200,
          
        
          xaxis: {
            title: {
              text: 'Quality (%)',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Throughput(kbps)',
              font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
              }
            }
          }
        };
        
      var PLOT = document.getElementById('bubble');
      Plotly.newPlot(PLOT, data, layout);
  });
}

function updateBubbleChart(selectedRNC) {
  url='/topoffender/'+selectedRNC;
  Plotly.d3.json(url, function(data){
      var PLOT = document.getElementById('bubble');
      console.log(data);
      
      var trace = {
          x: data.goodquality,
          y: data.response.throughput_kbps,
          text:data.nodebname
          };
      
      var data = [trace];

      Plotly.restyle(PLOT, "x", [trace.x]);
      Plotly.restyle(PLOT, "y", [trace.y]);
      Plotly.restyle(PLOT, "text", [trace.text]);
      Plotly.restyle(PLOT, "marker.color", [trace.x]);
  })
}

  
  function MapSite(){
    //Create a variable to save CMDATA in json format
    var CMData = '/CData';
    var tmap = d3.select("map-Site");;
    tmap.html("");  
    // Perform a GET request to data
    
    // Perform a GET request to data
    var UARFCN4413 = [];
    var UARFCN4437 = [];
    var UARFCN9715 = [];
    var UARFCN9736 = [];
    var UARFCN9862 = [];
    function createMarkers(response) {

      // //d3.json(CMData, createMarkers);


        //Define radio and function radio
        var radio4413=0.001;
        var radio4437=0.0014;
        var radio9715=0.0018;
        var radio9736=0.0022;
        var radio9862=0.0024;

        
      for (var i = 0; i < response.length; i++) {
        var UARFCN=response[i].UARFCN;
        var lat = response[i].Latitude;
        var lng = response[i].Longitude;
        var az = response[i].Azimuth;
        
        if (UARFCN == 9862){    
        var lat1= lat+radio9862*(Math.cos(Math.PI*(az+30)/180));
        var lng1= lng+radio9862*(Math.sin(Math.PI*(az+30)/180));
        var lat2= lat+radio9862*(Math.cos(Math.PI*(az-30)/180));
        var lng2= lng+radio9862*(Math.sin(Math.PI*(az-30)/180));
        UARFCN9862.push(
        L.polygon([
        [lat, lng],
        [lat1, lng1 ],
        [lat2,lng2] 
        ], {
        color: "gray",
        fillColor: "yellowgreen",
        fillOpacity: 0.4}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
        //.addTo(myMap)
        );
        //console.log(UARFCN9862)
        }
        
        else if (UARFCN == 9736){
        var lat1= lat+radio9736*(Math.cos(Math.PI*(az+30)/180));
        var lng1= lng+radio9736*(Math.sin(Math.PI*(az+30)/180));
        var lat2= lat+radio9736*(Math.cos(Math.PI*(az-30)/180));
        var lng2= lng+radio9736*(Math.sin(Math.PI*(az-30)/180));
        UARFCN9736.push(
        L.polygon([
        [lat, lng],
        [lat1, lng1 ],
        [lat2,lng2] 
        ], {
        color: "gray",
        fillColor: "yellowgreen",
        fillOpacity: 0.5}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
        //.addTo(myMap)
        //.bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].CELL + "</p>")
        );
        }
    
        else if (UARFCN == 9715){
        var lat1= lat+radio9715*(Math.cos(Math.PI*(az+30)/180));
        var lng1= lng+radio9715*(Math.sin(Math.PI*(az+30)/180));
        var lat2= lat+radio9715*(Math.cos(Math.PI*(az-30)/180));
        var lng2= lng+radio9715*(Math.sin(Math.PI*(az-30)/180));
        UARFCN9715.push(
        L.polygon([
        [lat, lng],
        [lat1, lng1 ],
        [lat2,lng2] 
        ], {
        color: "gray",
        fillColor: "yellowgreen",
        fillOpacity: 0.6}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
        //.addTo(myMap)
        );
        }
        else if (UARFCN ==4437){
        var lat1= lat+radio4437*(Math.cos(Math.PI*(az+30)/180));
        var lng1= lng+radio4437*(Math.sin(Math.PI*(az+30)/180));
        var lat2= lat+radio4437*(Math.cos(Math.PI*(az-30)/180));
        var lng2= lng+radio4437*(Math.sin(Math.PI*(az-30)/180));
        UARFCN4437.push(
        L.polygon([
        [lat, lng],
        [lat1, lng1 ],
        [lat2,lng2] 
        ], {
        color: "gray",
        fillColor: "blue",
        fillOpacity: 0.7}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
        //.addTo(myMap)
        );
        }
        else  {
        var lat1= lat+radio4413*(Math.cos(Math.PI*(az+30)/180));
        var lng1= lng+radio4413*(Math.sin(Math.PI*(az+30)/180));
        var lat2= lat+radio4413*(Math.cos(Math.PI*(az-30)/180));
        var lng2= lng+radio4413*(Math.sin(Math.PI*(az-30)/180));
        UARFCN4413.push(
        L.polygon([
        [lat, lng],
        [lat1, lng1 ],
        [lat2,lng2] 
        ]).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
        //.addTo(myMap)
        );
        //console.log(lat);
       
        }
    };
    
    
    // Add a tile layer (the background map image) to our map
    // Use the addTo method to add objects to our map
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 20,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
    
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 20,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });
    
    // Create separate layer groups: one 
    var u4413 = L.layerGroup(UARFCN4413);
    var u4437 = L.layerGroup(UARFCN4437);
    var u9715 = L.layerGroup(UARFCN9715);
    var u9736 = L.layerGroup(UARFCN9736);
    var u9862= L.layerGroup(UARFCN9862);
    
    
    //console.log(u4413)
    
    // Create a baseMaps object
    var baseMaps = {
      "Street Map": streetmap,
      "Satellite Map": satellitemap
    };
    
    // Create an overlay object
    var overlayMaps = {
      "UARFNC9862": u9862,
      "UARFNC9736": u9736,
      "UARFNC9715": u9715,
      "UARFNC4437": u4437,
      "UARFNC4413": u4413  
    };
    
    // Define a map object

   
    var myMap = L.map("map-Site", {

      center: [20.73074, -103.450012],
      zoom: 14,
      layers: [satellitemap, u9736, u4413]
    });
    
    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
    }).addTo(myMap);
    
    L.map("map-Site", {

      center: [39.8283, -98.5795],
      zoom: 14,
      layers: [satellitemap, u9736, u4413]
    }).addTo(myMap);

    }
    //d3.json(CMData, createMarkers);
    d3.json(CMData).then(createMarkers);

    }
  
    function MapSiteSheet(siteid){
      //Create a variable to save CMDATA in json format
      var CMData = '/CData';
      var tmap = d3.select("map");;
      tmap.html("");  
      // Perform a GET request to data
      
      // Perform a GET request to data
      var UARFCN4413 = [];
      var UARFCN4437 = [];
      var UARFCN9715 = [];
      var UARFCN9736 = [];
      var UARFCN9862 = [];
      function createMarkers(response) {
  
        // //d3.json(CMData, createMarkers);
  
  
          //Define radio and function radio
          var radio4413=0.003;
          var radio4437=0.0034;
          var radio9715=0.0038;
          var radio9736=0.0042;
          var radio9862=0.0046;
  
          
        for (var i = 0; i < response.length; i++) {
          var UARFCN=response[i].UARFCN;
          var lat = response[i].Latitude;
          var lng = response[i].Longitude;
          var az = response[i].Azimuth;
          
          if (response[i].Site == siteid){
            var latcenter = response[i].Latitude;
            var lngcenter = response[i].Longitude; } ;
          
          if (UARFCN == 9862){    
          var lat1= lat+radio9862*(Math.cos(Math.PI*(az+30)/180));
          var lng1= lng+radio9862*(Math.sin(Math.PI*(az+30)/180));
          var lat2= lat+radio9862*(Math.cos(Math.PI*(az-30)/180));
          var lng2= lng+radio9862*(Math.sin(Math.PI*(az-30)/180));
          UARFCN9862.push(
          L.polygon([
          [lat, lng],
          [lat1, lng1 ],
          [lat2,lng2] 
          ], {
          color: "gray",
          fillColor: "yellowgreen",
          fillOpacity: 0.4}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
          //.addTo(myMap)
          );
          //console.log(UARFCN9862)
          }
          
          else if (UARFCN == 9736){
          var lat1= lat+radio9736*(Math.cos(Math.PI*(az+30)/180));
          var lng1= lng+radio9736*(Math.sin(Math.PI*(az+30)/180));
          var lat2= lat+radio9736*(Math.cos(Math.PI*(az-30)/180));
          var lng2= lng+radio9736*(Math.sin(Math.PI*(az-30)/180));
          UARFCN9736.push(
          L.polygon([
          [lat, lng],
          [lat1, lng1 ],
          [lat2,lng2] 
          ], {
          color: "gray",
          fillColor: "yellowgreen",
          fillOpacity: 0.5}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
          //.addTo(myMap)
          //.bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].CELL + "</p>")
          );
          }
      
          else if (UARFCN == 9715){
          var lat1= lat+radio9715*(Math.cos(Math.PI*(az+30)/180));
          var lng1= lng+radio9715*(Math.sin(Math.PI*(az+30)/180));
          var lat2= lat+radio9715*(Math.cos(Math.PI*(az-30)/180));
          var lng2= lng+radio9715*(Math.sin(Math.PI*(az-30)/180));
          UARFCN9715.push(
          L.polygon([
          [lat, lng],
          [lat1, lng1 ],
          [lat2,lng2] 
          ], {
          color: "gray",
          fillColor: "yellowgreen",
          fillOpacity: 0.6}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
          //.addTo(myMap)
          );
          }
          else if (UARFCN ==4437){
          var lat1= lat+radio4437*(Math.cos(Math.PI*(az+30)/180));
          var lng1= lng+radio4437*(Math.sin(Math.PI*(az+30)/180));
          var lat2= lat+radio4437*(Math.cos(Math.PI*(az-30)/180));
          var lng2= lng+radio4437*(Math.sin(Math.PI*(az-30)/180));
          UARFCN4437.push(
          L.polygon([
          [lat, lng],
          [lat1, lng1 ],
          [lat2,lng2] 
          ], {
          color: "gray",
          fillColor: "blue",
          fillOpacity: 0.7}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
          //.addTo(myMap)
          );
          }
          else  {
          var lat1= lat+radio4413*(Math.cos(Math.PI*(az+30)/180));
          var lng1= lng+radio4413*(Math.sin(Math.PI*(az+30)/180));
          var lat2= lat+radio4413*(Math.cos(Math.PI*(az-30)/180));
          var lng2= lng+radio4413*(Math.sin(Math.PI*(az-30)/180));
          UARFCN4413.push(
          L.polygon([
          [lat, lng],
          [lat1, lng1 ],
          [lat2,lng2] 
          ]).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
          //.addTo(myMap)
          );
          //console.log(lat);
         
          }
      };
      
      
      // Add a tile layer (the background map image) to our map
      // Use the addTo method to add objects to our map
      var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 20,
        id: "mapbox.streets",
        accessToken: API_KEY
      });
      
      var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 20,
          id: "mapbox.satellite",
          accessToken: API_KEY
      });
      
      // Create separate layer groups: one 
      var u4413 = L.layerGroup(UARFCN4413);
      var u4437 = L.layerGroup(UARFCN4437);
      var u9715 = L.layerGroup(UARFCN9715);
      var u9736 = L.layerGroup(UARFCN9736);
      var u9862= L.layerGroup(UARFCN9862);
      
      
      //console.log(u4413)
      
      // Create a baseMaps object
      var baseMaps = {
        "Street Map": streetmap,
        "Satellite Map": satellitemap
      };
      
      // Create an overlay object
      var overlayMaps = {
        "UARFNC9862": u9862,
        "UARFNC9736": u9736,
        "UARFNC9715": u9715,
        "UARFNC4437": u4437,
        "UARFNC4413": u4413  
      };
      
      // Define a map object
  
     
      var myMap = L.map("map-Sitelocated", {
  
        center: [latcenter, lngcenter],
        zoom: 12,
        layers: [satellitemap, u9736, u4413]
      });
      
      // Pass our map layers into our layer control
      // Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
      }).addTo(myMap);
      L.control.ruler().addTo(myMap);
      
      // L.map("map-Sitelocated", {
  
      //   center: [39.8283, -98.5795],
      //   zoom: 14,
      //   layers: [satellitemap, u9736, u4413]
      // }).addTo(myMap);
  
      }

      //d3.json(CMData, createMarkers);
      d3.json(CMData).then(createMarkers);
  
      
      }
  // Initialize the dashboard
  init();
  buildPieTrafficmb();
  buildPieTrafficuser();
  buildPieTrafficuserdata();
  buildBarThroughput();
  buildBarGoodQuality();
  MapSite();
  
 