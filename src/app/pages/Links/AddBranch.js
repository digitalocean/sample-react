import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import {connect,useSelector,useDispatch} from 'react-redux'
import * as bredux from '../Business/_redux/businessRedux'

import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

import { useFormik } from "formik";
import * as Yup from "yup";


function AddBranch(props) {

	const [initialValues, setInitialValues] = useState({ 
		business: "",
		name: "",
		address: "",
		city: "",
		country: 178
	});

	  const globalState  = useSelector(state=>state.business)
	  const [allbusinesses, setdata] = useState([]);
	  const [allcountries, setCountryData] = useState([]);
	  const {user} = useSelector(state => state.auth);
	  const user_id = user.id; 

  
	  useEffect( ()=>{
		  //console.log(globalState.all_businesses)
		  setdata(globalState.all_businesses)
		  setCountryData(globalState.all_countries)
	  });
  
	  useEffect( ()=>{
		  props.getBusinesses(user_id)
	  } , []);
	  
  
	  useEffect( ()=>{
		  props.getCountries()
	  } , []);
	  
	
	const [loading, setLoading] = useState(false);

  	const BranchSchema = Yup.object().shape({
    	business: Yup.string()
	      	.required("Select Business"),
    	name: Yup.string()
	      	.required("Enter a branch name"),
    	address: Yup.string()
	      	.required("Enter a branch address"),
    	city: Yup.string()
	      	.required("Enter a City Name"),
    	country: Yup.string()
	      	.required("Select Country"),
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
			props.addBranch({ 
				user_id :user.id,
				business_id :values.business,
				name :values.name,
				address1 :values.address,
				state :values.area,
				city : values.city,
				country_id :values.country
			});
			console.log(`
				Business ID: ${values.business}.
    			Branch Name: ${values.name}. 
    			Addrress: ${values.address}. 
    			Area: ${values.area}. 
    			City: ${values.city}. 
    			Country ID: ${values.country}
			`);
			
		setTimeout(() => {
			swal({
				title: "Branch Added",
				text: "Branch saved successfully!",
				icon: "success",
				button: null,
				timer: 3000
			});
		  }, 100);
		  setTimeout(() => {
			history.push({
				pathname: '/business/branches',
				state: {
					bs_id: values.business
				}
			});
		  }, 3500);
	    },
	});

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
	    name: '',
	});

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
      setValues({ ...values, [name]: event.target.value });
	};

  	const [state, setState] = React.useState({
	    checkedA: true,
	});
	
	function goBack() {
		history.goBack();
	}


	
	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span>  
					<span>
						<FormattedMessage id="PAGE.ADDBRANCH.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 innerBlks">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">Add Your Branch Details</h3></div>
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
				                        {allbusinesses.map(option => (
				                          <MenuItem key={option.id} value={option.id}>
				                            {option.name}
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
				                        name="name"
				                        label="Branch Name"
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
				                    	Branch Name Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
				                    <TextField
				                        id="address"
				                        name="address"
				                        label="Branch Address"
				                        type="text"
				                        margin="normal"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
								            "address"
							            )}`}
				                        variant="outlined"
				                        value={values.address}
	        							{...formik.getFieldProps("address")}
				                    />
				                    {formik.touched.address && formik.errors.address ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.address}</div>
							            </div>
							          ) : null}
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Branch Address Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
				                    <TextField
				                        id="area"
				                        name="area"
				                        label="Area"
				                        type="text"
				                        variant="outlined"
				                        className={`form-control h-auto py-0 px-0  ${getInputClasses(
								            "area"
							            )}`}
				                        value={values.area}
	        							{...formik.getFieldProps("area")}
				                    />
				                    {formik.touched.area && formik.errors.area ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.area}</div>
							            </div>
							          ) : null}
				                    <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Area Helping Text
				                    </p>
			                    </div>

			                    <div className="fieldBlk">
				                    <TextField
				                        id="city"
				                        name="city"
				                        label="City"
				                        type="text"
				                        variant="outlined"
		    							className={`form-control h-auto py-0 px-0  ${getInputClasses(
								            "city"
							            )}`}
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
				                        name="country"
				                        variant="outlined"
				                        label="Select Country"
							            className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "country"
										)}`}
										onChange={handleChange}
				                        value={values.country}
				                        {...formik.getFieldProps("country")}
				                    >
				                        {allcountries.map(option => (
				                          <MenuItem key={option.id} value={option.id}>
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
		                	<img src="/media/images/branch.jpg" />
		                </div> 
	                </div>						    
				      
		        </div>
		    </div>    

		</div>
	</>);

}

export default connect(null, bredux.actions)(AddBranch);