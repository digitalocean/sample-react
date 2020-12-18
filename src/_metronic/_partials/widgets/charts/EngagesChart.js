import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

let chart = am4core.create("", am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

chart.data = [
  {
    engags: "Views",
    value: 19765
  },
  {
    engags: "Click",
    value: 8782
  },
  {
    engags: "Unsubscribes",
    value: 1471
  }
];

chart.depth = 16;

let series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "value";
series.dataFields.category = "engags";


export class EngagesChart extends Component {

	render() {
	    return (
	    	<div className={`card card-custom mb-10 engages-chart`}>
			    <div className="card-header border-0 pt-5">
			        <h3 className="card-title font-weight-bolder ">Engagments</h3>
			        <div className="card-toolbar">
                <div className="d-flex flex-column text-right">
                  <span className="text-dark-75 font-weight-bolder total-engags">
                    41800
                  </span>
                  <span className="text-muted font-weight-bold mt-2">Total Engagments</span>
                </div>
			        </div>
			    </div>
			    <div className="card-body d-flex flex-column">
			        <div className="flex-grow-1">
			          <div style={{ width: "100%", height: "300px", margin: "-10px auto 20px" }}>
			          </div>
			        </div>
			    </div>
		    </div>
	    );
	}
}