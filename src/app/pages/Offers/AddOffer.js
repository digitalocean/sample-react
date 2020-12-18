import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from "react-router-dom";
import swal from 'sweetalert';

import { useFormik } from "formik";
import * as Yup from "yup";
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Avatar from '@material-ui/core/Avatar';
import { Dropdown, ButtonToolbar, DropdownButton, ButtonGroup } from 'react-bootstrap';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as ofredux from './_redux/offersRedux';


function AddOffer(props) {

	var moment = require('moment');
	let now = new Date();
	let years = (d => new Date(d.getFullYear() + 80, d.getMonth(), d.getDate()))(new Date);
	var date = new Date();
	date.setDate(date.getDate() + 30);
	//console.log(date)

	const history = useHistory();
	const location = useLocation();
	var br_id = location.state.br_id;
	var br_name = location.state.br_name;
	var bs_id = location.state.bs_id;

	const [switch1, setSwitch1] = useState(0);
	const [startedDate, handleStartDate] = useState(now);
	const [endDate, handleEndDate] = useState(date);

	const globalState  = useSelector(state=>state.offers)
	const [offer_business, setdata] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 

	useEffect( ()=>{
		//console.log(globalState.offer_businesses)
		setdata(globalState.offer_businesses)
	});
	useEffect( ()=>{
		props.getBusinesses22(user.id)
	} , []);
	
	function viewBusiness() {
	    history.goBack();
	}
	function goBack() {
	    history.goBack();
	}
	//console.log(location.state);

	const [initialValues, setInitialValues] = useState({ 
		business: bs_id,
		branch:br_id,
		name: "",
		uses_limit:-1
	});

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
		avatar: {
			margin: 10,
			width: 60,
			height: 60,
		},
	}));

	const classes = useStyles();

	const [values, setValues] = React.useState({
		detail:'',
		str_date:startedDate,
		end_date: endDate,
		uses_limit:-1
	});

	const [state, setState] = React.useState({
		usage: false,
		imageName:'general.jpg',
		limitTxt:true,
		limitBlk:false,
		iconcat:'',
		started:false,
		starttxt:true,
		catName:'',
		startoffer:false,
		endnow:false,
		endtxt:true,
		endoffer:false,
		branch:br_id,
		business:bs_id,
		start_status: 0,
		end_status:0
	});

  	const branch = [
    	{
        	value: br_id,
        	label: br_name,
      	}
	];

	
	const handleStartOffer = () => {
		var swStartOffer = state.started;
		switch(state.started) {
			case true:
			  return setState({ ...state, start_status:0,started:!swStartOffer,starttxt:true, startoffer:false});
			default:
			  return setState({ ...state, start_status:1,started:!swStartOffer,starttxt:false, startoffer:true});
		}
	};
	
	const handleEndOffer = () => {
		var swEndOffer = state.endnow;
		switch(state.endnow) {
			case true:
			  return setState({ ...state,end_status:0,endnow:!swEndOffer,endtxt:true, endoffer:false});
			default:
			  return setState({ ...state,end_status:1,endnow:!swEndOffer,endtxt:false, endoffer:true});
		}
	};

	const handleSwitch = (event) => {
		var swStatus = state.usage;
		if(swStatus == true) {
			setState({ ...state, usage: !swStatus,limitTxt:true, limitBlk:false});
		} else {
			setState({ ...state, usage: !swStatus,limitTxt:false, limitBlk:true});
			setValues({uses_limit:-1})
		}
	};

	const [loading, setLoading] = useState(false);

  	const BranchSchema = Yup.object().shape({
    	business: Yup.string()
	      	.required("Select Business"),
    	name: Yup.string()
	      	.required("Enter a branch name"),
		branch: Yup.string()
	      	.required("Enter a branch address"),
	});

	const enableLoading = () => {
    	setLoading(true);
	};

	  const disableLoading = () => {
	    setLoading(false);
	};

	const getInputClasses = (fieldname) => {
	    if (formik.touched[fieldname] && formik.errors[fieldname]) {
	      return "is-invalid";
	    }

	    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
	      return "is-valid";
	    }

	    return "";
	};

	const formik = useFormik({
    	initialValues,
    	validationSchema: BranchSchema,
    	onSubmit: (values, { setStatus, setSubmitting }) => {

			props.addOffer({ 
				user_id:user.id,
				business_id:values.business,
				branch_id :br_id,
				branches:null,
				title :values.name,
				description :values.detail,
				start_date :moment(startedDate).format('YYYY-MM-DD HH:MM:ss') ? moment(startedDate).format('YYYY-MM-DD HH:MM:ss') : moment(now).format('YYYY-MM-DD HH:MM:ss'),
				expire_date :moment(endDate).format('YYYY-MM-DD HH:MM:ss')? moment(endDate).format('YYYY-MM-DD HH:MM:ss') : moment(date).format('YYYY-MM-DD HH:MM:ss'),
				quantity :values.uses_limit,
				start_status:state.start_status,
				end_status:state.end_status, 
			});

    		setStatus("Offer successfully saved.");
    		console.log(`
    			Business ID: ${values.business}. 
    			Branch ID: ${values.branch}. 
				Branches :null,
    			Offer Name: ${values.name}. 
				Offer Detail: ${values.detail}. 
				Image Icon: ${state.imageName}.
				Start Time: ${moment(startedDate).format('YYYY-MM-DD HH:MM:ss') ? moment(startedDate).format('YYYY-MM-DD HH:MM:ss') : moment(now).format('YYYY-MM-DD HH:MM:ss')}.
				End Time: ${moment(endDate).format('YYYY-MM-DD HH:MM:ss')? moment(endDate).format('YYYY-MM-DD HH:MM:ss') : moment(date).format('YYYY-MM-DD HH:MM:ss')}.
				QR Scan Limit: ${values.uses_limit}. 
				Start Status: ${state.start_status}.
				End Status: ${state.end_status}
			`);
			//return false;
    		setTimeout(() => {
		      	swal({
					  title: "Offer Added",
					  text: "Offer saved successfully!",
					  icon: "success",
					  button: null,
					  timer: 3000
				});
			}, 100);
			setTimeout(() => {
			  history.push({
				pathname: '/business/branch/offers',
				state: {
					b_name: br_name,
					bid: br_id,
					bsnid:bs_id
				}
			  });
			}, 3500);
	    },
	});

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Substract.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.ADDOFFERLINK.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
                  	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 innerBlks">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">Add Offer Details</h3></div>
				</div>
		        <div className="card-body">
		        	
	        		<div className="row">
		                <div className="col-md-6 ffield">
		                	<form 
				        		autoComplete="off"
						        onSubmit={formik.handleSubmit}
						        className="form-offer form fv-plugins-bootstrap fv-plugins-framework"
				        	>
				        		{formik.status ? (
						          <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
						            <div className="alert-text font-weight-bold">{formik.status}</div>
						          </div>
						        ) : (
						          <div>
						          </div>
						        )}

								<div className="fieldBlk">
									<TextField
										select
				                        name="business"
				                        variant="outlined"
				                        label="Select Business"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "business"
							            )}`}
				                        value={state.business}
										{...formik.getFieldProps("business")}
										//disabled
										InputProps={{
											readOnly: true,
										}}
				                    >
										{offer_business.map(option => (
				                          <MenuItem key={option.id} value={option.id}>
				                            {option.operating_as}
				                          </MenuItem>
				                        ))}
				                    </TextField>
				                    {formik.touched.business && formik.errors.business ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.business}</div>
							            </div>
							          ) : null}
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Select Business Helping Text
				                    </p>
						        </div>

								<div className="fieldBlk">
									<TextField
				                        select
				                        name="branch"
				                        variant="outlined"
				                        label="Select Branch"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "branch"
							            )}`}
				                        value={state.branch}
				                        {...formik.getFieldProps("branch")}
										//disabled
										InputProps={{
											readOnly: true,
										}}
				                    >
				                        {branch.map(option => (
				                          <MenuItem key={option.value} value={option.value}>
				                            {option.label}
				                          </MenuItem>
				                        ))}
				                    </TextField>
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Select Branch Helping Text
				                    </p>
						        </div>

								<div className="fieldBlk">
				                    <TextField
				                        name="name"
				                        label="Offer Name"
				                        type="text"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "name"
							            )}`}
				                        variant="outlined"
				                        value={values.name}
	        							{...formik.getFieldProps("name")}
				                    />
				                    {formik.touched.name && formik.errors.name ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.name}</div>
							            </div>
							          ) : null}
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Offer Name Helping Text
				                    </p>
			                    </div> 

								<div className="fieldBlk">
									<TextField
										id="detail"
										label="Offer Detail"
										rows="4"
										multiline
										name="detail"
										variant="outlined"
										className={`form-control h-auto py-0 px-0  ${getInputClasses(
										"detail"
										)}`}
										value={values.detail}
										{...formik.getFieldProps("detail")}
									/>
									{formik.touched.detail && formik.errors.detail ? (
										<div className="fv-plugins-message-container">
										<div name="fv-help-block">{formik.errors.detail}</div>
										</div>
									) : null}
									<p className="MuiFormHelperText-root MuiFormHelperText-contained">
										Offer Detail Helping Text
									</p>
								</div>

								

								<div className="fieldBlk">
									<label htmlFor="startnow" className="offer-label text-dark-75 text-link font-weight-bold font-size-lg">
										Offer Start Time
									</label>
									<Switch
										name="startnow"
										id="startnow"
										color="primary"
										checked={state.started}
        								onChange={handleStartOffer}
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
									{
										state.starttxt?
										<span className="usageLmtTxt">Offer start right now!</span>
										:<span></span>
									}
								</div>

								{
									state.startoffer &&
									<div className="fieldBlk mt-0">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<div className="pickers row p-2">
												<div className="col-md-6">
												<DatePicker 
													name="str_date"
													variant="outlined" 
													value={startedDate} 
													onChange={handleStartDate} 
												/>
												</div>
												<div className="col-md-6">
													<TimePicker 
														name="str_time"
														variant="outlined" 
														value={startedDate} 
														onChange={handleStartDate} 
													/>
												</div>
											</div>
										</MuiPickersUtilsProvider>
										<p className="MuiFormHelperText-root MuiFormHelperText-contained">
											Select Offer Start Date Helping Text
										</p>
									</div>
								}

								<div className="fieldBlk">
									<label htmlFor="endnow" className="offer-label text-dark-75 text-link font-weight-bold font-size-lg">
										Offer End Time
									</label>
									<Switch
										name="endnow"
										id="endnow"
										color="primary"
										checked={state.endnow}
        								onChange={handleEndOffer}
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
									{
										state.endtxt?
										<span className="usageLmtTxt">Offer Continuously run!</span>
										:<span></span>
									}
								</div>

								{
									state.endoffer &&
									<div className="fieldBlk mt-0">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<div className="pickers row p-2">
												<div className="col-md-6">
												<DatePicker 
													name="end_date"
													variant="outlined" 
													value={endDate} 
													onChange={handleEndDate} 
												/>
												</div>
												<div className="col-md-6">
													<TimePicker 
														name="end_time"
														variant="outlined" 
														value={endDate} 
														onChange={handleEndDate} 
													/>
												</div>
											</div>
										</MuiPickersUtilsProvider>
										<p className="MuiFormHelperText-root MuiFormHelperText-contained">
											Select Offer End Date Helping Text
										</p>
									</div>
								}								

								<div className="fieldBlk">
									<label htmlFor="usage" className="offer-label text-dark-75 text-link font-weight-bold font-size-lg">QR Scan Limit</label>
									<Switch
										name="usage"
										id="usage"
										color="primary"
										checked={state.usage}
        								onChange={handleSwitch}
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>
									{
										state.limitTxt?
										<span className="usageLmtTxt">Unlimited Scans</span>
										:<span></span>
									}
								</div>

								{
									state.limitBlk &&
									<div className="fieldBlk mt-0">
										<TextField
											name="uses_limit"
											variant="outlined"
											label="QR Scan Limit"
											type="number"
											className={`form-control h-auto py-0 px-0  ${getInputClasses(
											"uses_limit"
											)}`}
											value={values.uses_limit}
											{...formik.getFieldProps("uses_limit")}
										/>
										{formik.touched.uses_limit && formik.errors.uses_limit ? (
											<div className="fv-plugins-message-container">
											<div className="fv-help-block">{formik.errors.uses_limit}</div>
											</div>
										) : null}
										<p className="MuiFormHelperText-root MuiFormHelperText-contained">
											QR Scan Limit Helping Text
										</p>
									</div>
								}
								
			                    <div className="class-submit clear">
		  					    	<Button 
							            type="submit"
							            disabled={formik.isSubmitting}
		  					    		variant="contained" 
		  					    		color="primary" 
		  					    		className={classes.button}
		  					    	>
			  					        Save 
			  					        {loading && <span className="ml-3 spinner spinner-white"></span>}
			  					    </Button>
			  					    <Button variant="contained" className={classes.button} onClick={viewBusiness}>
			  					        Cancel
			  					    </Button>
		  					    </div>
	  					    </form>
		                </div>
		                <div className="col-md-6 ">
		                	<img src="/media/images/offer.jpg" />
		                </div> 
	                </div>						    
				      
		        </div>
		    </div> 

		</div>
	</>);

}


export default connect(null, ofredux.actions)(AddOffer);