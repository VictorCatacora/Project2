function buildCell(siteid) {
    url = '/kpicell/cellspmdata/'+siteid; 
    d3.json(url).then(function(data) {
      console.log(data);
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



  function getbuildBarCSAccessCell(data){
    BarCharData = [{
    x: data.dates,
    y: data.cs_call_completion,
    text: data.cellname,
    type: "bar",
    marker: {
      color:'yellow'},
    }];
    
  return BarCharData
  }
  function buildBarCSAccessCell(cellid){
  url='/kpicell/pmdata/'+cellid;
  
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
    var BAR = document.getElementById('csaccesscell');
  
    var trace=getbuildBarCSAccessCell(data);
  
    Plotly.plot(BAR, trace, layout);
  });
  }
  
  function updatebuildBarCSAccessCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('csaccesscell');
        
      var trace=getbuildBarCSAccessCell(response);
  
  
        Plotly.restyle(PLOT, "x", [trace[0].x]);
        Plotly.restyle(PLOT, "y", [trace[0].y]);
        Plotly.restyle(PLOT, "text", [trace[0].text]);
        Plotly.restyle(PLOT, "marker", [trace[0].marker]);
  
    })
  }
  function getbuildBarPSAccessCell(data){
    BarCharData = [{
    x: data.dates,
    y: data.ps_call_completion,
    text: data.cellname,
    type: "bar",
    marker: {
      color:'green'},
    }];
    
  return BarCharData
  }
  function buildBarPSAccessCell(cellid){
  url='/kpicell/pmdata/'+cellid;
  
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
    var BAR = document.getElementById('psaccesscell');
    var trace=getbuildBarPSAccessCell(data);
  
    Plotly.plot(BAR, trace, layout);
  });
  }
  
  function updatebuildBarPSAccessCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('psaccesscell');
        
      var trace=getbuildBarPSAccessCell(response);
  
  
        Plotly.restyle(PLOT, "x", [trace[0].x]);
        Plotly.restyle(PLOT, "y", [trace[0].y]);
        Plotly.restyle(PLOT, "text", [trace[0].text]);
  
    })
  }
  function buildBubbleSiteThroughputCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response) {
        var trace1 = {
          x: response.dates,
          y: response.throughput_kbps,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 13,
            colorscale: 'Rainbow',
            color: response.throughput_kbps,
            text: response.cellname,
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
          
        var PLOT = document.getElementById('throughputcell');
        Plotly.newPlot(PLOT, data, layout);
    });
  }
  
  function updateBubbleChartSiteThroughputCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('throughputcell');
        
        var trace = {
          x: response.dates,
          y: response.throughput_kbps,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 10,
            text: response.cellname,
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
  
  
  function buildBubbleSiteUserCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response) {
        var trace1 = {
          x: response.dates,
          y: response.users_total,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 13,
            colorscale: 'Rainbow',
            color: response.users_total,
            text: response.cellname,
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
          
        var PLOT = document.getElementById('userdatacell');
        Plotly.newPlot(PLOT, data, layout);
    });
  }
  
  function updatebuildBubbleSiteUserCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('userdatacell');
        
        var trace = {
          x: response.dates,
          y: response.users_total,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 10,
            text: response.cellname,
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
  
  function buildBubbleSiteQualityCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response) {
        var trace1 = {
          x: response.dates,
          y: response.goodquality,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 13,
            colorscale: 'Rainbow',
            color: response.goodquality,
            text: response.cellname,
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
          
        var PLOT = document.getElementById('qualitycell');
        Plotly.newPlot(PLOT, data, layout);
    });
  }
  
  function updatebuildBubbleSiteQualityCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('qualitycell');
        
        var trace = {
          x: response.dates,
          y: response.goodquality,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 10,
            text: response.cellname,
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
  
  function buildBubbleSiteRtwpCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response) {
        var trace1 = {
          x: response.dates,
          y: response.rtwp,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 13,
            colorscale: 'Rainbow',
            color: response.rtwp,
            text: response.cellname,
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
          
        var PLOT = document.getElementById('rtwpcell');
        Plotly.newPlot(PLOT, data, layout);
    });
  }
  
  function updatebuildBubbleSiteRtwpCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('rtwpcell');
        
        var trace = {
          x: response.dates,
          y: response.rtwp,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 10,
            text: response.cellname,
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
  
  function buildBubbleSitePropagationCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response) {
        var trace1 = {
          x: response.dates,
          y: response.propagation_mts,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 13,
            colorscale: 'Rainbow',
            color: response.propagation_mts,
            text: response.cellname,
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
          
        var PLOT = document.getElementById('propagationcell');
        Plotly.newPlot(PLOT, data, layout);
    });
  }
  
  function updatebuildBubbleSitePropagationCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('propagationcell');
        
        var trace = {
          x: response.dates,
          y: response.propagation_mts,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 10,
            text: response.cellname,
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
  
  function buildBubbleSiteRSCPCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response) {
        var trace1 = {
          x: response.dates,
          y: response.coverage_rscp,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 13,
            colorscale: 'Rainbow',
            color: response.coverage_rscp,
            text: response.cellname,
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
          
        var PLOT = document.getElementById('rscpcell');
        Plotly.newPlot(PLOT, data, layout);
    });
  }
  
  function updatebuildBubbleSiteRSCPCell(cellid) {
    url='/kpicell/pmdata/'+cellid;
    Plotly.d3.json(url, function(response){
        var PLOT = document.getElementById('rscpcell');
        
        var trace = {
          x: response.dates,
          y: response.coverage_rscp,
          text:response.cellname,
          mode: 'markers',
          marker: {
            size: 10,
            text: response.cellname,
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

  function initRNC() {
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
    initSiteCell(selectedRNC);
    //optionChangedSITE(selectedRNC);
    console.log(selectedRNC);
  }

function initSiteCell(selectedRNC) {
    var selectorsite=d3.select("#selDatasetsitecell");
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

function optionChangedSITE() {
    
    // Fetch new data each time a new sample is selected
  var selectedSite = selDatasetsitecell.options[selDatasetsitecell.selectedIndex].value;
    // updateBubbleChart(selectedSite )
    initCell(selectedSite);
    buildCell(selectedSite);
    console.log(selectedSite);
  }

function initCell(SelectedSite){
    var selectorcell=d3.select("#selDatasetcell");
    url = '/kpicell/'+ SelectedSite
    selectorcell.html("");  
    d3.json(url).then((samplesite) => {
      samplesite.forEach((site) => {
        selectorcell
          .append("option")
          .text(site)
          .property("value", site);
      });
  
    });
  }

  function optionChangedCell() {
    
    // Fetch new data each time a new sample is selected
  var selectedCell = selDatasetcell.options[selDatasetcell.selectedIndex].value;
    // updateBubbleChart(selectedSite )
   
    updatebuildBarPSAccessCell(selectedCell);
    updatebuildBarCSAccessCell(selectedCell);
    updateBubbleChartSiteThroughputCell(selectedCell);
    updatebuildBubbleSiteUserCell(selectedCell);
    updatebuildBubbleSiteQualityCell(selectedCell);
    updatebuildBubbleSiteRtwpCell(selectedCell);
    updatebuildBubbleSitePropagationCell(selectedCell);
    updatebuildBubbleSiteRSCPCell(selectedCell);
    console.log(selectedCell);
  }


  initRNC();
  buildBarPSAccessCell("MIU4465");
  buildBarCSAccessCell("MIU4465");
  buildBubbleSiteRSCPCell("MIU4465");
  buildBubbleSiteThroughputCell("MIU4465");
  buildBubbleSiteUserCell("MIU4465");
  buildBubbleSiteQualityCell("MIU4465");
  buildBubbleSiteRtwpCell("MIU4465");
  buildBubbleSitePropagationCell("MIU4465");