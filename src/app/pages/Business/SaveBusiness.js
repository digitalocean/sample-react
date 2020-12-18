import React, { Component, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { useHistory, useLocation  } from "react-router-dom";
import {connect,useSelector,useDispatch} from 'react-redux';
import * as bredux from './_redux/businessRedux';


function SaveBusiness(props) {

	const history = useHistory();
	const location = useLocation();
	const globalState  = useSelector(state=>state.business);
	function verifyBusiness() {
		history.push({
			pathname: '/business/verify',
			state: {
				id:globalState.saveBusiness,
				operating: location.state.operating, 
			}
		});
	}
	function goBack() {
		history.goBack();
	}
	function closePage() {
		history.push("/business/all");
	}

	const useStyles = makeStyles(theme => ({
		container: {
		    display: 'flex',
		    flexWrap: 'wrap',
		},
		textField: {
		    marginLeft: theme.spacing(1),
		    marginRight: theme.spacing(1),
		},
		dense: {
		    marginTop: theme.spacing(2),
		},
		menu: {
		    width: 200,
		},
	}));

	const classes = useStyles();
	const [values, setValues] = React.useState({
	    name: '',
	    user:'',
	    showPassword: false,
		zone:'',
		b_id:'',
	    status:['active', 'inactive', 'disable'],
	});

	const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    
	};

	const [registration, setRegistration] = React.useState({
		value: "hide"
	});


	React.useEffect(() =>  {
		console.log('This is new business id: ',globalState.saveBusiness);
		const rgnum = location.state.rgnum;
		if(rgnum !== ""){
			setRegistration({value: "show"})
		} else {
			setRegistration({value: "hide"})
		}
	}, []);


	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.BUSINESSSAVE.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 buss-details">
				<div className="card-header">
					<div className="card-title">
						<h3 className="card-label">Business Saved Successfully</h3>
					</div>
					<Button variant="contained" className="Business-edit" onClick={closePage} > Close </Button>
				</div>
		        <div className="card-body">
		        	<div className="row">
		        		<div className="col-md-12">
			        		<div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
			        			<div className="alert-text font-weight-bold">Business Saved Successfully.</div>
			        		</div>

		                    <div className="symbol  save-verify">
		                        <span className="symbol-label bg-white" onClick={verifyBusiness}>
		                          <span className="svg-icon svg-icon-lg svg-icon-info">
		                            <SVG className="h-75 align-self-end" src={toAbsoluteUrl("/media/svg/icons/Code/Question-circle.svg")} ></SVG>
		                          </span>
		                        </span>
		                        <div className="text-info verify-text" onClick={verifyBusiness}>Verify Business</div>
		                    </div>
		        		</div>
		        	</div>
		        	<div className="row mt-5">
		        		<div className="col-md-6">
		        			<label htmlFor="name">Official Business Name</label>
		        			<div className="detail">{location.state.name}</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Operating as</label>
		        			<div className="detail">{location.state.operating}</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Registration Type</label>
		        			<div className="detail">{location.state.regtype}</div>
		        		</div>
		        		
		        		<div className={`col-md-6 ` + registration["value"]}>
			        			<label htmlFor="name">Registration Number</label>
			        			<div className="detail">{location.state.rgnum}</div>
			        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Status</label>
		        			<div className="detail">Active</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Registered On</label>
		        			<div className="detail">{location.state.regeistered_on}</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Head Office Address</label>
		        			<div className="detail">{location.state.address}, {location.state.area} {location.state.city} {location.state.country}</div>
		        		</div>
		        	</div>
		        </div>
		    </div>  

		</div>
	</>);

}

export default connect(null, bredux.actions)(SaveBusiness);