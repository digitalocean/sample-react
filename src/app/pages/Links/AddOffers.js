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
import * as ofredux from '../Offers/_redux/offersRedux';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import BlockUI from '../Component/BlockUI';
import Radio from '@material-ui/core/Radio';

function AddOffers(props) {

	var moment = require('moment');
	let now = new Date();
	let years = (d => new Date(d.getFullYear() + 80, d.getMonth(), d.getDate()))(new Date);
	var date = new Date();
	date.setDate(date.getDate() + 30);
	//console.log(date)

	const history = useHistory();
	const location = useLocation();
	var br_id =1;
	var br_name = "Test 123";
	var bs_id = 1;

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
		end_status:0,
		loader: false,
		br_data: [""],
		bsid:"0",
		radio:"a",
		br_show: false,
		allBranches:"",
		emptyBr: {
			id: 0,
			value: "No Branch Added"
		}
	});

	const [switch1, setSwitch1] = useState(0);
	const [startedDate, handleStartDate] = useState(now);
	const [endDate, handleEndDate] = useState(date);
	//console.log(endDate)

	const globalState  = useSelector(state=>state.offers)
	const [offer_business, setdata] = useState([]);
	const [allbranches, setbranches] = useState([]);
	const [brancheStates, setBrancheStates] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 

	useEffect(  ()=>{
		//console.log(globalState.offer_branches)
		setdata(globalState.offer_businesses)
		setbranches(globalState.offer_branches)
		setBrancheStates(globalState.offer_branches)
		const bss_id = globalState.offer_businesses[0];
	});
	useEffect( ()=>{
		props.getBusinesses22(user.id)
	} , []);

	const [selectedValue, setSelectedValue] = React.useState('');

	function handleChangeR(event) {
		setSelectedValue(event.target.value);
		if(event.target.value == "a") {
			if(state.bsid == "0") {
				console.log("2222"+state.bsid)
				setPersonName([]);
				setState({...state, radio:event.target.value, br_show:false, br_data:[]});
			} else {
				console.log("1111"+state.bsid)
				setPersonName([]);
				setState({...state, radio:event.target.value, br_show:false, br_data:["0"]});
			}
		} else {
			setPersonName([]);
			console.log("3333"+state.bsid)
			setState({...state, radio:event.target.value, br_show:true , br_data: []});
		}
	}

	const businessChange = (event) => {
		setPersonName([]);
		var b_new_id = event.target.value;
		state.bsid=b_new_id;
		props.getOfferBranches(b_new_id)
		console.log("BID: "+b_new_id)

		if(state.radio == "a") {
			setState({...state, loader:true, br_data:["0"]});
		} else if(state.radio == "b")  {
			state.br_data = [];
			setState({...state, loader:true, br_data: state.br_data});
		}
		setTimeout(() => {
			setState({ ...state, loader:false})
		}, 1000);
	}

	

	const [personName, setPersonName] = React.useState([]);
	function handleChangeM(event) {
		setPersonName(event.target.value);
		setState({...state, br_data: event.target.value});
		console.log("Branches:  "+event.target.value)
	}

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
      	setValues({ ...values, [name]: event.target.value });
	};
	
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
	  PaperProps: {
	    style: {
	      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
	      width: 250,
	    },
	  },
	};
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
    	onSubmit: (values, { setStatus, resetForm, setSubmitting }) => {

			if(state.bsid == "0") {
				swal({
					title: "Business Not Selected",
					text: "Please select business!",
					icon: "warning",
					button: null,
					timer: 2500
				});
				return false;
			} 
			else if(state.br_data == "") {
				swal({
					title: "Branches Not Selected",
					text: "Please select branch option!",
					icon: "warning",
					button: null,
					timer: 2500
				});
				return false;
			}
			else {
				props.addOffers({ 
					user_id:user.id,
					business_id:state.bsid,
					branches:state.br_data,
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
					User: ${user.id}
					business_id:${state.bsid}.
					Branches: ${state.br_data}. 
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
				resetForm({ name: "",buinsess:"", branches:"", detail:"", uses_limit:""});
				setSelectedValue("a");
				setState({ ...state,limitTxt:true, limitBlk:false,br_show:false, business:"", branches:"", detail:"", uses_limit:""});
			}				
	    },
	});

	return (<>
		<div className="row">
			{state.loader ? <BlockUI />
			: <></>
			}
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
				                        value={values.business}
										onChange={businessChange}
				                    >
										{offer_business.map((option, index) => (
				                          <MenuItem key={option.id || index} value={option.id}>
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
								{state.all_branches_data}
								<div className="fieldBlk">
									<Radio
										checked={selectedValue === 'a'}
										onChange={handleChangeR}
										value="a"
										name="a"
										id="all"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'A' }}
									/> <label className="text-link" htmlFor="all">All Branches </label> 
									<Radio
										checked={selectedValue === 'b'}
										onChange={handleChangeR}
										value="b"
										name="b"
										id="branches"
										name="radio-button-demo"
										inputProps={{ 'aria-label': 'B' }}
									/> <label className="text-link" htmlFor="branches">Select Branches</label>
									<br />
									{state.br_show == false ? 
										<></>
										:<FormControl variant="outlined" className={classes.textField} margin="normal">
											<InputLabel htmlFor="select-multiple-checkbox">Select Branches</InputLabel>
											<Select
											multiple
											name="branch"
											value={personName || "No Branches"}
											onChange={handleChangeM}
											input={<Input id="select-multiple-checkbox" />}
											renderValue={selected => selected.join(', ')}
											MenuProps={MenuProps}
											>
											{allbranches.map(option => (
												<MenuItem key={option.id} value={option.id}>
												<Checkbox checked={personName.indexOf(option.id) > -1} />
												<ListItemText primary={option.name || "No Branch"} />
												</MenuItem>
											))}
											</Select>
										</FormControl>
									}
									
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


export default connect(null, ofredux.actions)(AddOffers);