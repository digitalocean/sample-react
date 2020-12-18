import React, { useState } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

import { useFormik } from "formik";
import * as Yup from "yup";
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Avatar from '@material-ui/core/Avatar';
import { Dropdown, ButtonToolbar, DropdownButton } from 'react-bootstrap';

const initialValues = {
	business: "",
	branch:'',
	name: "",
	detail:"",
	uses_limit:''
  };

export function AddOffer() {

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
    		setStatus("Offer successfully saved.");
    		console.log(`
    			Business Name: ${values.business}. 
    			Branch Name: ${values.branch}. 
    			Offer Name: ${values.name}. 
				Offer Detail: ${values.detail}. 
				Image Icon: ${values.imageName}.
				Start Time: ${startedDate}.
				End Time: ${endDate}.
    			QR Scan Limit: ${values.uses_limit}. 
    		`);
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
			  });
			}, 3500);
	    },
	});

	const history = useHistory();
	function viewBusiness() {
	    history.goBack();
	}
	function goBack() {
	    history.goBack();
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
		avatar: {
			margin: 10,
			width: 60,
			height: 60,
		},
	}));

	const classes = useStyles();
	const [values, setValues] = React.useState({
		name: '',
		imageName: ''
	});
	const [state, setState] = React.useState({
		name: '',
		usage: false,
		limitTxt:true,
		limitBlk:false,
		started:false,
		starttxt:true,
		startoffer:false,
		endnow:false,
		endtxt:true,
		endoffer:false
	});

	const business = [
    {
        value: 'Khaadi',
        label: 'Khaadi',
      },
      {
        value: 'Sapphire',
        label: 'Sapphire',
      },
      {
        value: 'McDownlad',
        label: 'McDownlad',
      }
  	];

  	const branch = [
    {
        value: 'Mall Road',
        label: 'Mall Road',
      },
      {
        value: 'Jail Road',
        label: 'Jail Road',
      },
      {
        value: 'Y Block DHA',
        label: 'Y Block DHA',
      },
      {
        value: 'Wapda Town',
        label: 'Wapda Town',
      }
	];

	const [startedDate, handleStartDate] = useState();
	const [endDate, handleEndDate] = useState();
	
	const handleStartOffer = (event) => {
		var swStartOffer = state.started;
		if(swStartOffer == true) {
			setState({ ...state,started:!swStartOffer,starttxt:true, startoffer:false});
		} else {
			setState({ ...state,started:!swStartOffer,starttxt:false, startoffer:true});
		}
	};
	
	const handleEndOffer = (event) => {
		var swEndOffer = state.endnow;
		if(swEndOffer == true) {
			  setState({ ...state,endnow:!swEndOffer,endtxt:true, endoffer:false});
		} else {
			  setState({ ...state,endnow:!swEndOffer,endtxt:false, endoffer:true});
		}
	};

	const handleSwitch = (event) => {
		var swStatus = state.usage;
		if(swStatus == true) {
			setState({ ...state, usage: !swStatus,limitTxt:true, limitBlk:false});
		} else {
			setState({ ...state, usage: !swStatus,limitTxt:false, limitBlk:true});
		}
	};

	const dataImage = event => {
		var img = event.target.dataset.image;
		setValues({imageName: img});
		console.log(img);
	}

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
				                        value={values.business}
				                        {...formik.getFieldProps("business")}
				                    >
				                        {business.map(option => (
				                          <MenuItem key={option.value} value={option.value}>
				                            {option.label}
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
				                        value={values.branch}
				                        {...formik.getFieldProps("branch")}
				                    >
				                        {branch.map(option => (
				                          <MenuItem key={option.value} value={option.value}>
				                            {option.label}
				                          </MenuItem>
				                        ))}
				                    </TextField>
				                    {formik.touched.branch && formik.errors.branch ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.branch}</div>
							            </div>
							          ) : null}
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

								<div className="fieldBlk ic-dd">
									<label htmlFor="icons-dropdown" className="offer-label text-dark-75 text-link font-weight-bold font-size-lg">
										Promo Icon
									</label>
									<ButtonToolbar>
										<DropdownButton
											drop="down"
											variant="secondary"
											title="Select Icon"
											id="icons-dropdown"
											key="down"
										>
											<Dropdown.Item eventKey="1" data-image="wasif.jpg" onClick={dataImage}>
												<Avatar alt="Wasif Ahmed" src="/media/users/wasif.jpg" className={classes.avatar} />
											</Dropdown.Item>
											<Dropdown.Item eventKey="2" data-image="sam.jpg" onClick={dataImage}>
												<Avatar alt="Shahbaz Mughal" src="/media/users/sam.jpg" className={classes.avatar} />
											</Dropdown.Item>
											<Dropdown.Item eventKey="3" data-image="wasif.jpg" onClick={dataImage}>
												<Avatar alt="Wasif Ahmed" src="/media/users/wasif.jpg" className={classes.avatar} />
											</Dropdown.Item>
											<Dropdown.Item eventKey="4" data-image="sam.jpg" onClick={dataImage}>
												<Avatar alt="Shahbaz Mughal" src="/media/users/sam.jpg" className={classes.avatar} />
											</Dropdown.Item>
											<Dropdown.Item eventKey="5" data-image="wasif.jpg" onClick={dataImage}>
												<Avatar alt="Wasif Ahmed" src="/media/users/wasif.jpg" className={classes.avatar} />
											</Dropdown.Item>
											<Dropdown.Item eventKey="6" data-image="sam.jpg" onClick={dataImage}>
												<Avatar alt="Shahbaz Mughal" src="/media/users/sam.jpg" className={classes.avatar} />
											</Dropdown.Item>
										</DropdownButton>
									</ButtonToolbar> 
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
													variant="outlined" 
													value={startedDate} 
													onChange={handleStartDate} 
												/>
												</div>
												<div className="col-md-6">
													<TimePicker 
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
													variant="outlined" 
													value={endDate} 
													onChange={handleEndDate} 
												/>
												</div>
												<div className="col-md-6">
													<TimePicker 
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