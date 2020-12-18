import React, { useState } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from "react-router-dom";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';
import {API_URL} from "../../Constants";


export function BusinessVerify() {

	const history = useHistory();
	const location = useLocation();
	var operating = location.state.operating;
	var id = location.state.id;
	console.log(id);
	function viewBusiness() {
	    history.push("/business/all");
	}
	function goBack() {
	    history.goBack();
	}

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
	}));

	const classes = useStyles();
	const [values, setValues] = React.useState({
		docs: "",
		other:""
	});
	
	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
		setValues({ ...values, [name]: event.target.value });
	};

	const [state, setState] = React.useState({
		ft_value: "company",
		value:"",
		checkedA: true,
		selectedFile:null,
		show: true
	});

  	const divstatus = (event) => {
    	setState({ft_value: event.target.value});
    	console.log(state.ft_value);
	}

	const fileSelectedHandler = event => {
		setState({selectedFile: event.target.files[0]})
		console.log(event.target.files[0])
	}

	const fileUploadHandler = () => {

		const fd = new FormData();
		fd.append("id", id);
		fd.append("document_type", values.other);
		fd.append("image", state.selectedFile, state.selectedFile.name);
		fetch(API_URL + 'api/businesses/verify_document' , {
			method: "POST",
			body: fd
		}).then(data => {
			swal({
				title: "Business Document",
				text: "Business document successfully submitted! Business Status will be update after document verification.",
				icon: "success",
				button: null,
				timer: 2000
			});
			setTimeout(() => {
				swal.close();
				history.push({
					pathname: '/business/all'
				});
			}, 2000);
			console.log(data)
		})
		//console.log(state.selectedFile.name)	
	}

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.VERIFYBUSINESS.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 innerBlks">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">Business - {operating} - <span>Upload Business Document</span></h3></div>
				</div>
		        <div className="card-body">
		        				
		        	<div className="row">
			            <div className="col-md-6 ffield">
							<FormControl variant="outlined" className={`file_type_block `+ classes.formControl}>
								<InputLabel ref={inputLabel} htmlFor="fileType">
									Select File Type
								</InputLabel>
								<Select
									className={`form-control h-auto py-0 px-0 `}
									value={values.fileType}
									input={
										<OutlinedInput name="fileType" 
										labelWidth={labelWidth} 
										id="fileType" />
									}
									onChange={handleChange("fileType")}
								>	
									<MenuItem value="">
										<em>Select File Type</em>
									</MenuItem>
									<MenuItem value="company">Company Incorporation Certificate</MenuItem>
									<MenuItem value="other">Other Registration Document</MenuItem>
								</Select>
								<p className="MuiFormHelperText-root MuiFormHelperText-contained">
									File Type Helping Text
								</p>
							</FormControl>
							
							<div className={values.fileType == "other" ? "fieldBlk fileType other" : "fieldBlk fileType company"}>
								<TextField
									name="other"
									label="Other Document Type"
									type="text"
									className={classes.textField}
									value={values.other ? values.other : " "}
									onChange={handleChange("other")}
									variant="outlined"
								/>
								<p className="MuiFormHelperText-root MuiFormHelperText-contained">
									Please Specify Other Registration Document Helping Text
								</p>
							</div>

							<div className="fieldBlk">
								<TextField
									required
									type="file" 
									name="photo1" 
									className="form-control bus-doc" 
									onChange={fileSelectedHandler} 
									variant="outlined"
								/>
								<p className="MuiFormHelperText-root MuiFormHelperText-contained">
									Upload the company verification documents (jpg, png, pdf)
								</p>
							</div>
							
							<div className="fieldBlk  class-submit">
								<Button 
									type="submit"
									variant="contained" 
									color="primary" 
									className={classes.button}
									onClick={fileUploadHandler}
								>
									Upload Document
								</Button>
								<Button variant="contained" className={classes.button} onClick={viewBusiness}>
									Cancel
								</Button>
							</div>
		                </div>
		                <div className="col-md-6 text-center ">
		                	<img src="/media/images/business.jpg" className="certificate" />
		                </div>    
	                </div>	
				    
		        </div>
		    </div>    

		</div>
	</>);

}