import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {connect,useSelector,useDispatch} from 'react-redux'
import * as bredux from './_redux/businessRedux'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

import { useFormik } from "formik";
import * as Yup from "yup";

 function AddBusiness(props) {

	const [initialValues, setInitialValues] = useState({ 
		name: "",
		operating: "",
		rgnum: "",
		regeistered_on: "",
		address: "",
		area: "",
		city: "",
		country: "PK",
		file: "",
		rgtype: null
	});
	
	const globalState  = useSelector(state=>state.business)
	const [allcountries, setdata] = useState([]);

	useEffect( ()=>{
		setdata(globalState.all_countries)
	});
	useEffect( ()=>{
		props.getCountries()
	} , []);
	

  	const [loading, setLoading] = useState(false);

  	const BusinessSchema = Yup.object().shape({
    	name: Yup.string()
	      	.required("Enter a business name"),
	    operating: Yup.string()
	      	.required("Enter Operating as"),
	    regeistered_on: Yup.string()
	      	.required("Registration Date require"),
	    address: Yup.string()
	      	.required("Head office address require"),
	    city: Yup.string()
	      	.required("City require"),
	    country: Yup.string()
	      	.required("Country require"),
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

	const history = useHistory();
	function viewBusiness() {
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
	}));

	const classes = useStyles();
	const [values, setValues] = React.useState({
	    name: ''
	});

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
        setValues({ ...values, [name]: event.target.value });
	};

  	const [state, setState] = React.useState({
  		value: "",
		checkedA: true,
		regtype:"",
		selectedFile:null
	});

	const {user} = useSelector(state => state.auth);

	const fileSelectedHandler = event => {
		setState({...state, selectedFile: event.target.files[0]})
		console.log(event.target.files[0])
	}

	const registertype = [
    {
        value: 'Corporate',
        label: 'Corporate',
      },
      {
        value: 'AOP',
        label: 'AOP',
      },
      {
        value: 'Sole Proprietorship',
        label: 'Sole Proprietorship',
      },
      {
        value: 'Individual',
        label: 'Individual',
      }
  	];


  	const divstatus = (e) => {
    	setState({...state, regtype: e.target.value, rgtype:e.target.value});
    	console.log(e.target.value, state.rgtype);
  	}
	function goBack() {
		history.goBack();
	}

	const formik = useFormik({
    	initialValues,
    	validationSchema: BusinessSchema,
    	onSubmit: (values, { setStatus, setSubmitting }) => {

			props.addBusiness({ 
				user_id:user.id,
				name :values.name,
				type :state.regtype,
				operating_as :values.operating,
				registration_number :values.rgnum,
				register_on : values.regeistered_on,
				office_address :values.address+" "+values.area+" "+values.city+" "+values.country,
				image: {file: state.selectedFile, name: state.selectedFile.name}
			});

			setTimeout(() => {
				swal({
					title: "Business Added",
					text: "Business saved successfully!",
					icon: "success",
					button: null,
					timer: 1500
			  	});
				setTimeout(() => {
					history.push({
						pathname: '/business/save',
						state: {
							user_id:1,
							name: values.name, 
							operating: values.operating, 
							regtype: state.regtype,
							rgnum: values.rgnum,
							regeistered_on: values.regeistered_on,
							address: values.address,
							area: values.area,
							city: values.city,
							country: values.country
						}
					});
					console.log('Business Name: '+values.name+ " operating: "+values.operating+ " regtype: "+state.regtype+ " rgnum: "+values.rgnum+ " regeistered_on: "+values.regeistered_on);
				}, 1500);
		  }, 1000);
	    },
	});

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.ADDBUSINESS.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 innerBlks">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">Add Your Business Details</h3></div>
				</div>
		        <div className="card-body">
		        	<form 
		        		autoComplete="off"
				        onSubmit={formik.handleSubmit}
				        className="ffield form fv-plugins-bootstrap fv-plugins-framework"
		        	>
		        		{formik.status ? (
				          <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
				            <div className="alert-text font-weight-bold">{formik.status}</div>
				          </div>
				        ) : (
				          <div>
				          </div>
				        )}
		        		<div className="row">
			                <div className="col-md-6">

			                	<div className="fieldBlk">
				                    <TextField
				                    	label="Official Business Name"
				                        name="name"
				                        type="text"
				                        variant="outlined"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "name"
							            )}`}
				                        value={values.name}
	        							{...formik.getFieldProps("name")}
				                    />
				                    {formik.touched.name && formik.errors.name ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.name}</div>
							            </div>
							          ) : null}
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Official Business Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
				                        id="operating"
				                        name="operating"
				                        label="Operating as"
				                        type="text"
				                        variant="outlined"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "operating"
							            )}`}
				                        value={values.operating}
	        							{...formik.getFieldProps("operating")}
				                    />
				                    {formik.touched.operating && formik.errors.operating ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.operating}</div>
							            </div>
							          ) : null}
							        <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Operating as Helping Text
				                    </p>
			                    </div>
								
			                    <div className="fieldBlk">
			                    	<TextField
				                        select
				                        id="regtype"
				                        name="regtype"
				                        variant="outlined"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "regtype"
							            )}`}
				                        label="Registration Type"
				                        margin="normal"
	        							{...formik.getFieldProps("regtype")}
				                        value={values.regtype}
				                        onChange={divstatus}
				                    >
				                        {registertype.map(option => (
				                          <MenuItem key={option.value} value={option.value}>
				                            {option.label}
				                          </MenuItem>
				                        ))}
				                    </TextField>
							        <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Registration Type Helping Text
				                    </p>
			                    </div>

			                    <div className={`fieldBlk regnumber `+ state.regtype}  style={{display: 'none'}}>
			                    	<TextField
				                        id="rgnum"
				                        name="rgnum"
				                        type="text"
				                        label="Registration Number"
				                        className={classes.textField}
				                        value={values.rgnum}
				                        margin="normal"
				                        variant="outlined"
			                        	value={values.rgnum}
        								{...formik.getFieldProps("rgnum")}
				                    />
							        <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Registration Number Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
	  							        label="Registered On"
	  							        name="regeistered_on"
	  							        type="date"
	  							        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "regeistered_on"
							            )}`}
	  							        margin="normal"
	  							        variant="outlined"
	  							        InputLabelProps={{
	  							          shrink: true,
	  							        }}
			                        	value={values.regeistered_on}
	    								{...formik.getFieldProps("regeistered_on")}
	  							    />
	  							    {formik.touched.regeistered_on && formik.errors.regeistered_on ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.regeistered_on}</div>
							            </div>
							          ) : null}
							        <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Registered On Helping Tex
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
	  							        label="Head Office Address"
	  							        name="address"
	  							        variant="outlined"
	  							        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "address"
							            )}`}
							            value={values.address}
	        							{...formik.getFieldProps("address")}
	  							    />
	  							    {formik.touched.address && formik.errors.address ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.address}</div>
							            </div>
							          ) : null}
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Head Office Address Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
	  							        label="Area"
	  							        name="area"
	  							        variant="outlined"
	  							        className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "area"
							            )}`}
							            value={values.area}
	        							{...formik.getFieldProps("area")}
	  							    />
	  							    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Area Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
	  							        id="city"
	  							        label="City"
	  							        name="city"
	        							className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "city"
							            )}`}
	  							        margin="normal"
	  							        variant="outlined"
							            value={values.city}
	        							{...formik.getFieldProps("city")}
	  							    />
	  							    {formik.touched.city && formik.errors.city ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.city}</div>
							            </div>
							          ) : null}
	  							    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	City Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
				                        select
				                        id="country"
				                        name="country"
	        							className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "country"
							            )}`}
				                        variant="outlined"
				                        label="Select Country"
				                        margin="normal"
							            value={values.country}
	        							{...formik.getFieldProps("country")}
				                    >
				                        {allcountries.map(option => (
				                          <MenuItem key={option.country_code} value={option.country_code}>
				                            {option.country_name}
				                          </MenuItem>
				                        ))}
				                    </TextField>
	  							    {formik.touched.country && formik.errors.country ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.country}</div>
							            </div>
							          ) : null}
	  							    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Select Country Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
			                    	<TextField
				                        id="image"
				                        name="image"
				                        type="file"
				                        placeholder="Upload Company Logo"
				                        className={classes.textField}
				                        margin="normal"
				                        variant="outlined"
							            value={values.file}
										onChange={fileSelectedHandler} 
				                    />
	  							    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Upload Business logo (500px x 500px)
				                    </p>
			                    </div>

			                    <div className="fieldBlk  class-submit">
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

			                </div>
			                <div className="col-md-6 text-center">
			                	<img src="/media/images/Addbusiness.jpg" />
			                </div>    
		                </div>						    
				          		
				    </form>
		        </div>
		    </div>   

		</div>
	</>);

}

export default connect(null, bredux.actions)(AddBusiness);