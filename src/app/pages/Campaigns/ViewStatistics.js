import React, {useState, useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory, useLocation  } from "react-router-dom";
import { StatsWidget12,  MixedWidget14 } from "../../../_metronic/_partials/widgets";
import CountUp from 'react-countup';

/**  City Chart  **/
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export function CitiesChart(props) {

	am4core.useTheme(am4themes_animated);

	let chart = am4core.create("chartdiv", am4charts.PieChart3D);
	chart.hiddenState.properties.opacity = 0;
	chart.responsive.enabled = true;

	chart.data = [
	{
		country: "Lahore",
		users: 125987
	},
	{
		country: "Islamabad",
		users: 97274	  
	},
	{
		country: "Faisalabad",
		users: 75987
	},
	{
		country: "Multan",
		users: 64876
	},
	{
		country: "Gujrat",
		users: 59876
	}
	];

	chart.innerRadius = am4core.percent(40);
	chart.depth = 120;

	chart.legend = new am4charts.Legend();

	let series = chart.series.push(new am4charts.PieSeries3D());
	series.dataFields.value = "users";
	series.dataFields.depthValue = "users";
	series.dataFields.category = "country";
	series.slices.template.cornerRadius = 5;
	series.colors.step = 3;

	return (
		<>
			<div id="chartdiv" style={{ width: "100%", height: "400px", margin: "0px auto" }}></div>
		</>
	);
}

export function EngagesChart(props) {

	am4core.useTheme(am4themes_animated);

	let chart = am4core.create("engageschart", am4charts.PieChart3D);
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
				<div id="engageschart" style={{ width: "100%", height: "300px", margin: "-10px auto 20px" }}>
				</div>
			</div>
		</div>
	);
}


export function ViewStatistics() {

	const history = useHistory();
	const location = useLocation();

	const id = location.state.id;
	console.log(id)

	const audience = () => {
		history.push('/business/branch/subscriber');
	}

	const [state , setState] = useState({
		id: id == '' ? '' : id ,
		name: '',
		campaign: '',
		branches: '',
		engage: '',
		created_on: '',
		end_time: '',
		duration: '',
		status: '',
		status_class: '',
		status_label:'',
		ctrcolor: 'ctr100'
	});

	function goBack() {
      history.goBack();
    }

    var loc_status = location.state.status ? location.state.status : 0;

    //console.log(loc_status);

    useEffect(() => {
  		if(loc_status == 1) {
	    	setState({status_class:'badge badge-success', status_label: 'Finish'});
	    }
	    else if(loc_status == 2) {
	    	setState({status_class:'badge badge-info', status_label: 'Running'});
	    }
	    else if(loc_status == 3) {
	    	setState({status_class:'badge badge-primary', status_label: 'Preparing'});
	    }
	    else if(loc_status == 4) {
	    	setState({status_class:'badge badge-warning', status_label: 'System Paused'});
	    }
	    else if(loc_status == 5) {
	    	setState({status_class:'badge badge-danger', status_label: 'Paused'});
	    }
	    else {
	    	setState({status_class:'badge badge-primary', status_label: 'Resumed'});
	    }
	}, []);

	function recentEngages(id, time, color, name, message, link) {
		return { id, time, color, name, message, link };
	}
	  
	const rows = [
		recentEngages('1', '08:42', 'warning', 'Sajid Akhter', 'has been opened email', ''),
		recentEngages('2', '10:00', 'success', 'Aliya Butt', 'has clicked on a Link', ''),
		recentEngages('3', '14:37', 'danger', 'Maida Shahid', 'has been opened email', ''),
		recentEngages('4', '16:50', 'primary', 'Arfan Ali', 'has been opened email', ''),
		recentEngages('5', '21:30', 'warning', 'Naeem Ahmed', 'has been opened email', ''),
		recentEngages('6', '23:07', 'success', 'Shahbaz Mughal', 'has clicked on a Link', ''),
		recentEngages('7', '06:47', 'danger', 'Riaz Anwer', 'has been opened email', ''),
		recentEngages('8', '11:03', 'primary', 'Imjad Haider', 'has been opened email', ''),
	];

	return (<>
		<div className="row">

			<div className="col-md-12">
				<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b page-desc">
					<div className="alert-text">
						<span className="svg-icon menu-icon">
	                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
	                  	</span> 
						<span>
							<FormattedMessage id="PAGE.VIEWSTATISTICS.DESC" />
						</span>
				        <span className="svg-icon menu-icon goBack" onClick={goBack}>
							<i className="fa fa-long-arrow-alt-left"></i>
				        </span>
					</div>
				</div>
			</div>

			<div className="col-md-12">
				<div className="row stats-data">
					<div className="card w20 mb-5">
						<div className="card-body aud-size">
							<div className="symbol symbol-40 symbol-light-primary">
								<span className="symbol-label">
									<span className="stat-icon flaticon2-user"></span>
								</span>
							</div>
							<span className="count"><CountUp start={0} end={21.2} duration={3} separator="," decimals={1} decimal="." prefix="" suffix="K" /></span>
							<span className="sdata-desc">Audience</span>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body reach">
							<div className="symbol symbol-40 symbol-light-success">
								<span className="symbol-label">
									<span className="stat-icon flaticon2-send"></span>
								</span>
							</div>
							<span className="count"><span className="count"><CountUp start={0} end={19.7} duration={3} separator="," decimals={1} decimal="." prefix="" suffix="K" /></span></span>
							<span className="sdata-desc">Reach</span>
							<div className="stats-ratio stats-up">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 87%
							</div>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body views">
							<div className="symbol symbol-40 symbol-light-info">
								<span className="symbol-label">
									<span className="stat-icon flaticon-eye"></span>
								</span>
							</div>
							<span className="count"><span className="count"><CountUp start={0} end={13.4} duration={3} separator="," decimals={1} decimal="." prefix="" suffix="K" /></span></span>
							<span className="sdata-desc">Views</span>
							<div className="stats-ratio stats-up">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 65%
							</div>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body clicks">
							<div className="symbol symbol-40 symbol-light-warning">
								<span className="symbol-label">
									<span className="stat-icon flaticon2-paperplane"></span>
								</span>
							</div>
							<span className="count"><span className="count"><CountUp start={0} end={8.7} duration={3} separator="," decimals={1} decimal="." prefix="" suffix="K" /></span></span>
							<span className="sdata-desc">Clicks</span>
							<div className="stats-ratio stats-up">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 43%
							</div>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body unsub">
							<div className="symbol symbol-40 symbol-light-danger">
								<span className="symbol-label">
									<span className="stat-icon flaticon-close"></span>
								</span>
							</div>
							<span className="count"><span className="count"><CountUp start={0} end={147} duration={3} separator="," decimals={0} decimal="." prefix="" suffix="" /></span></span>
							<span className="sdata-desc">Unsubsucribed</span>
							<div className="stats-ratio stats-down">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 1.51%
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="col-md-6">
				<div className="card mb-10">
					<div className="card-body">
						<div className="stDetailBlk" row-id={location.state.id}>
							<span className={state.status_class}>{state.status_label}</span>
							<div className="row">
								<div className="col-md-12 mb-5">
									<div className="stat-campName font-weight-bolder text-dark">{location.state.name}</div>
									<span className="text-muted font-weight-bold d-block mb-4">Broadcast: {location.state.campaign}</span>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 mb-5">
									<div onClick={audience} className="text-link font-weight-bolder text-primary d-block stats-audi-label">
										Audience
									</div>
									<span className="text-muted font-weight-bold d-block mb-4">{location.state.branches}</span>
								</div>
							</div>
							<div className="row mb-4">
								<div className="col-md-4 stats-time-tracking mb-5">
									<i className="icon-3x text-info flaticon-clock-2 mr-4"></i>
									<span className="timeLabel">
										<label className="text-info">Start Time</label>
										<span className="text-muted font-weight-bold d-block">August 09, 2020</span>
										<span className="text-muted font-weight-bold d-block">09:36AM</span>
									</span>
								</div>
								<div className="col-md-4 stats-time-tracking mb-5">
									<i className="icon-3x text-success flaticon2-crisp-icons-1 mr-4"></i>
									<span className="timeLabel">
										<label className="text-success">End Time</label>
										<span className="text-muted font-weight-bold d-block">August 09, 2020</span>
										<span className="text-muted font-weight-bold d-block">02:47PM</span>
									</span>
								</div>
								<div className="col-md-4 stats-time-tracking mb-5">
									<i className="icon-3x text-primary flaticon2-hourglass-1 mr-4"></i>
									<span className="timeLabel">
										<label className="text-primary">Duration</label>
										<span className="text-muted font-weight-bold d-block">5 Hours 11 Minutes</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<MixedWidget14 className="mb-10" />

				<div className={`card card-custom mb-5`}>
			        {/* Header */}
			        <div className="card-header align-items-center border-0 mt-4">
			          <h3 className="card-title align-items-start flex-column">
			            <span className="font-weight-bolder text-dark">Recent Engagements</span>
			            <span className="text-muted mt-3 font-weight-bold font-size-sm">
			              1,231,432 Engagements
			            </span>
			          </h3>
			        </div>
			        {/* Body */}
			        <div className="card-body pt-4 engagements-body">
			          	<div className="timeline timeline-6 mt-3">

							{rows.map((row) => (
								<div key={row.id} className="timeline-item align-items-start">
									<div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
										{row.time}
									</div>

									<div className="timeline-badge">
										<i className={`fa fa-genderless text-` +row.color+ ` icon-xl`}></i>
									</div>

									<div className="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
										<span className="font-weight-bolder font-size-lg text-dark-75">{row.name}</span> {row.message}
									</div>
								</div>
							))}

			          	</div>
			        </div>
			    </div>
			</div>

			<div className="col-md-6">
				<StatsWidget12 className="mb-10"/>

				{/* <EngagesChart className="mb-10"/> */}
				<EngagesChart />

				<CitiesChart />

				
			</div>

			<div className="card col-md-12 hide">
				<div className="card-body">
					<b>ID:</b> {location.state.id}<br /> 
					<b>Name:</b> {location.state.name}<br /> 
					<b>campaign:</b> {location.state.campaign}<br /> 
					<b>branches:</b> {location.state.branches}<br /> 
					<b>Engage:</b> {location.state.engage}<br /> 
					<b>Start Time:</b> {location.state.created_on}<br /> 
					<b>End Time:</b> {location.state.end_time}<br /> 
					<b>Duration:</b> {location.state.duration}<br /> 
					<b>Status:</b> {location.state.status}<br /> 
				</div>
			</div>

			

		</div>
	</>);

}