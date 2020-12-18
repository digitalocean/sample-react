import React from "react";
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


export function EditBusinessBranch() {

	const history = useHistory();
	function viewBusiness() {
	    history.push("/business/branches");
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
	    status:['active', 'inactive', 'disable'],
	});

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
      setValues({ ...values, [name]: event.target.value });
	};

  	const [state, setState] = React.useState({
	    checkedA: true,
	    checkedB: true,
	    checkedC: true,
	    checkedD: true,
	    checkedE: true,
	    checkedF: true,
	});

	const business = [
    {
        value: '1',
        label: 'Khaadi',
      },
      {
        value: '2',
        label: 'Sapphire',
      },
      {
        value: '3',
        label: 'McDownlad',
      },
      {
        value: '4',
        label: 'KFC',
      },
      {
        value: '5',
        label: 'Bonanza',
      }
  	];

  	function saveForm() {
  		swal({
			  title: "Branch Edited",
			  text: "Branch Address saved successfully!",
			  icon: "success",
			  button: "Close",
		});
	  }
	  
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

			<div className="card card-custom gutter-b col-md-12">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">Edit Branch - Khaadi Mall Road</h3></div>
				</div>
		        <div className="card-body">
		        	
	        		<div className="row">
		                <div className="col-md-6 ">
		                	<form className={classes.container} noValidate autoComplete="off">
			                	<TextField
			                        select
			                        disabled
			                        id="business"
			                        name="business"
			                        className={classes.textField}
			                        variant="outlined"
			                        label="Select Business"
			                        margin="normal"
	    							helperText="Select Business Helping Text"
			                        onChange={handleChange('weightRange')}
			                        defaultValue={1}
			                    >
			                        {business.map(option => (
			                          <MenuItem key={option.value} value={option.value}>
			                            {option.label}
			                          </MenuItem>
			                        ))}
			                    </TextField>

			                    <TextField
			                        disabled
			                        id="name"
			                        name="name"
			                        label="Branch Name"
			                        type="text"
			                        defaultValue="Mall Road Branch Lahore"
			                        className={classes.textField}
			                        onChange={handleChange('name')}
			                        margin="normal"
			                        variant="outlined"
	    							helperText="Branch Name Helping Text"
			                    />

			                    <TextField
			                      required
			                        id="address"
			                        name="address"
			                        label="Branch Addresse"
			                        type="text"
			                        defaultValue="171 B-1"
			                        className={classes.textField}
			                        onChange={handleChange('address')}
			                        margin="normal"
			                        variant="outlined"
	    							helperText="Branch Address Helping Text"
			                    />

			                    <TextField
			                        disabled
			                        id="area"
			                        name="area"
			                        label="Area"
			                        type="text"
			                        defaultValue="Johar Town Branch"
			                        className={classes.textField}
			                        onChange={handleChange('area')}
			                        margin="normal"
			                        variant="outlined"
	    							helperText="Area Helping Text"
			                    />

			                    <TextField
			                        disabled
			                        id="city"
			                        name="city"
			                        label="City"
			                        type="text"
			                        defaultValue="Lahore"
			                        className={classes.textField}
			                        onChange={handleChange('city')}
			                        margin="normal"
			                        variant="outlined"
	    							helperText="City Helping Text"
			                    />

			                    <TextField
			                        disabled
			                        id="country"
			                        name="country"
			                        label="Country"
			                        type="text"
			                        defaultValue="Pakistan"
			                        className={classes.textField}
			                        onChange={handleChange('country')}
			                        margin="normal"
			                        variant="outlined"
	    							helperText="Country Helping Text"
			                    />

			                    <div className="class-submit">
		  					    	<Button variant="contained" color="primary" className={classes.button} onClick={saveForm}>
			  					        Save 
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