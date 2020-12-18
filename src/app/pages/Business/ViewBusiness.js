import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from "react-router-dom";
import swal from 'sweetalert';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as bredux from './_redux/businessRedux';

function ViewBusiness(props) {

	var moment = require('moment');

	const history = useHistory();
	const location = useLocation();
	var bid = location.state.bid;
	var bs_opras = location.state.bs_opras;
	function goBack() {
		history.goBack();
	}

	const verifyBusiness =()=> {
		history.push({
			pathname: '/business/verify',
			state: {
				id:bid,
				operating: bs_opras, 
			}
		});
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
		addresses: '33 N, Gulberg III, Lahore 54000, PK',
	    address: '',
	});

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
        setValues({ ...values, [name]: event.target.value });
	};

  	const [state, setState] = React.useState({
  		show: true,
	});

	const globalState  = useSelector(state=>state.business)
    const [business, setdata] = useState([]);

	useEffect( ()=>{
		setdata(globalState.current_business)
	});

	useEffect( ()=>{
		props.getBusiness(bid)
	} , []);

  	function deleteBusiness(e) {
		var id = e.target.dataset.id;
		swal({
		  title: "Permanently Close Business",
		  text: "Business has attached many branches and subscribers. First switch branches then delete business.",
		  icon: "warning",
		  button: "Cancel",
		});
		swal({
			title: "Permanently Close Business?",
			text: "Business has attached many branches and subscribers. First switch branches then delete business.",
			icon: "error",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
			  props.deleteBusiness(Number(id))
			  swal("Business has been deleted!", {
				icon: "success",
			  });
			  setTimeout(() => {
				history.push({
					pathname: '/business/all'
				});
			  }, 1500);
		  } 
		  setTimeout(() => {
			swal.close();
		}, 2000);
		});
	}

	function saveData() {
		setState({show:true});
		var adrs = business.office_address;
		var dv = values.address;
		//console.log("old: "+adrs)
		//console.log("new: "+dv)
		business.office_address = dv;
		setValues({addresses: dv});
		toast.success("Address successfully changed", {position: "top-right",autoClose: 3000}); 
		props.updateBusinessAddr(Number(bid), dv); 
	}

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.BUSINESSDETAILS.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 buss-details">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">My Business - <span>{bs_opras}</span></h3></div>
					{
			          state.show?
			          <Button variant="contained" className="Business-edit"  onClick={()=>(setState({show:false}))} > Edit </Button>
			          :
			          <div>
			          	<Button variant="contained" className="Business-edit" color="secondary"  onClick={saveData} > Save </Button>
			          	<Button variant="contained" className="Business-edit" onClick={()=>(setState({show:true}))} > Cancel </Button>
			          </div>
			        }
					
				</div>
		        <div className="card-body">

		        	<div className="row">
		        		<div className="col-md-6">
		        			<label htmlFor="name">Official Business Name</label>
		        			<div className="detail">{business.name} {business.verified_on ? <img src="/media/misc/v.png" width="20px" alt={business.name} />:''} </div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Business Verification</label>
		        			<div className="detail">{business.verified_on ? "Verified" : <div>Unverified - <span className="text-primary text-link" onClick={verifyBusiness}>Verify Business</span></div>} </div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Operating as</label>
		        			<div className="detail">{business.operating_as}</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Registration Type</label>
							<div className="detail">{business.type}</div>
		        		</div>
						{business.type === "Corporate" ? 
						<div className="col-md-6">
							<label htmlFor="name">Registration Number</label>
							<div className="detail">{business.registration_number }</div>
						</div> :
						<></>
						}
		        		
		        		<div className="col-md-6">
		        			<label htmlFor="name">Status</label>
					<div className="detail">{business.status}</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Registered On</label>
					<div className="detail">{moment(business.register_on).format("LL")}</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Number of Branches</label>
		        			<div className="detail">21</div>
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Head Office Address</label>
		        			{
					          state.show?
					          <div className="detail">{business.office_address}</div>
					          :<div className="addrBlock">
			        				<TextField
				                      required
				                        id="address"
				                        name="address"
				                        type="address"
				                        defaultValue={business.office_address}
				                        className={classes.textField}
				                        onChange={e => setValues({address: e.target.value})}
				                        placeholder="Branch Address"
				                        margin="normal"
				                        variant="outlined"
	        							helperText="Change Branch Address Help Text"
				                    />
		        				</div>
					        }		        			
		        		</div>
		        		<div className="col-md-6">
		        			<label htmlFor="name">Profile Created on</label>
		        			<div className="detail">{moment(business.created_at).format("LL")}</div>
		        		</div>
		        		{
				          state.show?
				          null
				          :<div className="col-md-12">
			        			<div className="detail text-right">
			        				<span className="text-danger text-link" data-id={business.id} onClick={deleteBusiness}>- Permanently Close Business</span>
			        			</div>
			        		</div>
				        }	
		        	</div>
		        	<ToastContainer />
		        </div>
		    </div>  

		</div>
	</>);

}

export default connect(null, bredux.actions)(ViewBusiness);