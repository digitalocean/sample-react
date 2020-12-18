import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

let chart = am4core.create("citychart", am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

chart.data = [
  {
    country: "Lithuania",
    litres: 501.9
  },
  {
    country: "Czech Republic",
    litres: 301.9
  },
  {
    country: "Ireland",
    litres: 201.1
  },
  {
    country: "Germany",
    litres: 165.8
  },
  {
    country: "Australia",
    litres: 139.9
  },
  {
    country: "Austria",
    litres: 128.3
  },
  {
    country: "UK",
    litres: 99
  },
  {
    country: "Belgium",
    litres: 60
  },
  {
    country: "The Netherlands",
    litres: 50
  }
];

chart.innerRadius = 100;

let series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "litres";
series.dataFields.category = "country";

export class TopCitiesStates extends Component {

	render() {
	    return (
	    	<div className={`card card-custom mb-10 top-cities`}>
			    <div className="card-header border-0 pt-5">
			        <h3 className="card-title font-weight-bolder ">Top 5 Cities</h3>
			        <div className="card-toolbar">
			          </div>
			    </div>
			    <div className="card-body d-flex flex-column">
			        <div className="flex-grow-1">
			          <div id="citychart" style={{ width: "100%", height: "400px", margin: "50px auto -70px" }}>
			          </div>
			        </div>
			    </div>
		    </div>
	    );
	}
}