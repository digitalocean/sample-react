import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import {connect,useSelector,useDispatch} from 'react-redux';
import * as credux from './_redux/campRedux';

import {SheduleRepeater} from '../Component/SheduleRepeater';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import BlockUI from '../Component/BlockUI';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const ITEM_HEIGHT = 48;

function CreateSchedule(props) {

	const theme = useTheme();

	const initialValues = {
		business: "",
		name: "",
		branches: "",
		campaign: "",
	};

	const history = useHistory();

	function goBack() {
      history.goBack();
	}
	
	const [loading, setLoading] = useState(false);

  	const BranchSchema = Yup.object().shape({
    	name: Yup.string()
	      	.required("Enter a branch name"),
		campaign: Yup.string()
			.required("Select Campaign"),
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

	const [labelWidth, setLabelWidth] = React.useState(0);
	
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
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
		chips: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		chip: {
			margin: 2,
		},
		noLabel: {
			marginTop: theme.spacing(3),
		},
	}));

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

	function getStyles(name, personName, theme) {
		return {
		  fontWeight:
			personName.indexOf(name) === -1
			  ? theme.typography.fontWeightRegular
			  : theme.typography.fontWeightMedium,
		};
	}

	function handleChangeMultiple(event) {
		const { options } = event.target;
		const value = [];
		for (let i = 0, l = options.length; i < l; i += 1) {
		  if (options[i].selected) {
			value.push(options[i].value);
		  }
		}
		setPersonName(value);
	}

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
      	setValues({ ...values, [name]: event.target.value });
	};

	const [personName, setPersonName] = React.useState([]);
	function handleChangeM(event) {
		setPersonName(event.target.value);
		setState({...state, br_data: event.target.value});
		//console.log("Branches:  "+event.target.value, state.br_data)
	}

	const classes = useStyles();
	const [values, setValues] = React.useState({
		name: '',
		business:'',
		bsid: 0,
		branches:'',
		campaign:''
	});

	const [state, setState] = React.useState({
	    showOption: true,
		name: '',
		business:'',
		branches:'',
		campaign:'',
		option: "",
		condition: "",
		gender: "",
		loader: false,
		br_data: [""],
		bsid:"0"
	});

	const hadleOptionChange = (event) => {
		event.preventDefault();
		setState({
			...state, showOption : true
		});
	 }

	const globalState  = useSelector(state=>state.campaigns)
	const [all_schedule, setdata] = useState([]);
	const [camp_business, setBusiness] = useState([]);
	const [camp_branches, setBranches] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 
	const b_id = null;
	
	useEffect( ()=>{
		setBranches(globalState.schedule_brancehs)
		setBusiness(globalState.schedule_business)
		setdata(globalState.all_broadcasts)
	});

	useEffect( ()=>{
		props.getAllSchedule(user_id)
		props.getScheduleBusiness(user_id)
		props.getAllCampaigns(user_id)
		if(globalState.schedule_business.length>0) {
			//const b_id = globalState.schedule_business[0].id
			//console.log(b_id)
		}
	} , []);

	const businessChange = (event) => {
		setState({ ...state, loader:true})
		setPersonName([]);
		var b_new_id = event.target.value;
		setValues({...values, business:b_new_id});
		state.bsid=b_new_id;
		props.getSceduleBranches(b_new_id)
		//console.log("BID: "+b_new_id)
		setTimeout(() => {
			setState({ ...state, loader:false})
		}, 1000);
	}

	const formik = useFormik({
    	initialValues,
    	validationSchema: BranchSchema,
    	onSubmit: (values, { setStatus, setSubmitting }) => {
			setStatus("Campaign Shedule successfully");
			
			props.addSchedule({
				user_id:user_id,
				name: values.name,
				business_id: state.bsid,
				branch_ids: state.br_data,
				campaign_ids: values.campaign
			});

			// console.log(`
			// 	User_ID: ${user_id}.
    		// 	Schedule Name: ${values.name}. 
    		// 	Business ID: ${state.bsid}. 
    		// 	Branches IDs: ${state.br_data}. 
			// 	Campaign ID: ${values.campaign}
    		// `);
    		setTimeout(() => {
		      	swal({
					  title: "Scheduled Campaign",
					  text: "Campaign Shedule successfully!",
					  icon: "success",
					  button: null,
					  timer: 3000
				});
			}, 100);
			setTimeout(() => {
			  history.push({
			  	pathname: '/campaigns/schedule/all',
			  });
			}, 3500);
	    },
	});

	const cancleScedule =()=> {
		history.push('/campaigns/schedule/all');
	}

	return (<>
		<div className="row">

			{state.loader ? <BlockUI />
			: <></>
			}

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.ADDSCHEDULED.DESC" />
					</span>
			        <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			        </span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 innerBlks schedule-campaign-page">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">Create Scheduled Campaign</h3></div>
				</div>
		        <div className="card-body">
		        	
	        		<div className="row">
		                <div className="col-md-6 ffield">
		                	<form 
				        		autoComplete="off"
						        onSubmit={formik.handleSubmit}
						        className="form fv-plugins-bootstrap fv-plugins-framework"
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
				                        name="name"
				                        label="Shedule Name"
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
										Shedule Name Helping Text
				                    </p>
			                    </div>
								
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
				                        {camp_business.map((option, index) => (
				                          <MenuItem key={option.id || index} value={option.id}>
				                            {option.operating_as}
				                          </MenuItem>
				                        ))}
				                    </TextField>
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Select Business Helping Text
				                    </p>
						        </div>

								{
									state.showOption?
									<div className="form-group">
										<div className="fieldBlk">
											<FormControl variant="outlined" className={classes.textField} margin="normal">
												<InputLabel htmlFor="select-multiple-checkbox">Select Branches</InputLabel>
												<Select
												multiple
												name="branch"
												value={personName || "No Branches"}
												onChange={handleChangeM}
												input={<Input id="select-multiple-checkbox" />}
												renderValue={selected => selected.join(', ')}
												>
												{camp_branches.map(option => (
													<MenuItem key={option.id} value={option.id} data-name={option.name}>
													<Checkbox checked={personName.indexOf(option.id) > -1} />
													<ListItemText primary={option.name || "No Branch"} />
													</MenuItem>
												))}
												</Select>
											</FormControl>
											<p className="MuiFormHelperText-root MuiFormHelperText-contained">
												Select Branches Helping Text
											</p>
										</div>
									</div>
									: <div> </div>
								}
								
								
								
								<div className="fieldBlk">
									<TextField
										select
										name="campaign"
										variant="outlined"
										label="Select Campaign"
										className={`form-control h-auto py-0 px-0  ${getInputClasses("campaign")}`}
										onChange={handleChange("campaign")}
										{...formik.getFieldProps("campaign")}
									>
										{all_schedule.map(option => (
										<MenuItem key={option.id} value={option.id}>
											{option.name}
										</MenuItem>
										))}
									</TextField>
									{formik.touched.campaign && formik.errors.campaign ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.campaign}</div>
							            </div>
							          ) : null}
									<p className="MuiFormHelperText-root MuiFormHelperText-contained">
										Select campaign Helping Text
									</p>
								</div>

								{/* <SheduleRepeater /> */}
								
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
									<Button onClick={cancleScedule} variant="contained" className={`ml-2 `+classes.button}>
										Cancel
									</Button>
								</div>

	  					    </form>
		                </div>
		                <div className="col-md-6 text-center">
		                	<img src="/media/images/schedule.jpg" />
		                </div> 
	                </div>						    
				      
		        </div>
		    </div>    


		</div>
	</>);

}

export default connect(null, credux.actions)(CreateSchedule);