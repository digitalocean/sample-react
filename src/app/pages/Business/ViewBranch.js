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

function ViewBranch(props) {

	var moment = require('moment');

	const history = useHistory();
	const location = useLocation();
	var br_id = location.state.bid;
	var bs_opras = location.state.bs_opras;
	var bs_id = location.state.bs_id;
	var bs_name = location.state.bs_name;
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
	}));

	const classes = useStyles();
	const [values, setValues] = React.useState({
		addresses: '257 F Block MM Alam Road',
	    address: 'Dummy Address',
	});

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
        setValues({ ...values, [name]: event.target.value });
	};

  	const [state, setState] = React.useState({
		  show: true,
		  addr:'',
		  brid: br_id
	});

	const globalState  = useSelector(state=>state.business)
	const {user} = useSelector(state => state.auth);
    const [branch, setdata] = useState([]);

	useEffect( ()=>{
		setdata(globalState.current_branch)
	});

	useEffect( ()=>{
		props.getBranch(br_id)
		//console.log(globalState);
	} , []);

	function saveData() {
		var adrs = branch.address1;
		var dv = state.address;
		// console.log("new: "+dv)
		// console.log("old: "+adrs)
		branch.address1 = dv;
		setState({show:true});
		props.updateBranchAddr(Number(br_id), state.address)
	}

	function deleteBusiness(e) {
		var id = e.target.dataset.id;
		var user_id =user.id;
		swal({
		title: "Are you sure?",
		text: "Branch has attached many subscribers. it will be remove all subscribers!",
		icon: "error",
		buttons: true,
		dangerMode: true,
	  })
	  .then((willDelete) => {
		  props.deleteBranch(id, user_id)
		if (willDelete) {
		  swal("Branch has been deleted!", {
			icon: "success",
		  });
		  setTimeout(() => {
		    history.push({
				pathname: '/business/branches',
				state: {
					bs_id: bs_id,
					bs_opras:bs_opras,
					bs_name: bs_name
				}
			});
		  }, 1500);
		  setTimeout(() => {
			swal.close();
		  }, 2000);
	  } 
	});
  }

	return (<>
		<div className="row">
			{/* JSON.stringify(globalState.show_error) */}
    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.BRANCHDETAILS.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12 buss-details">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label">{location.state.br_name} - <span>Branch Details</span></h3></div>
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
		        			<div className="viewBlk">
		        				<label htmlFor="name">Branch Name</label>
			        			<div className="detail">{branch.name}</div>
		        			</div>
			        		<div className="viewBlk">
		        				<label htmlFor="name">Branch City</label>
		        				<div className="detail">{branch.city}</div>
		        			</div>	
			        		<div className="viewBlk">
		        				<label htmlFor="name">Branch Created On</label>
		        				<div className="detail">{moment(branch.created_at).format("LLL")}</div>
		        			</div>	
			        		<div className="viewBlk">
		        				<label htmlFor="name">Engagements</label>
		        				<div className="detail">0</div>
		        			</div>	
		        		</div>
		        		<div className="col-md-6">
			        		<div className="viewBlk">
		        				<label htmlFor="name">Branch Address</label>
				        			{
							          state.show?
							          <div className="detail">{branch.address1}</div>
							          :<div className="addrBlock">
					        				<TextField
						                      required
						                        id="address"
						                        name="address"
						                        type="address"
						                        defaultValue={branch.address1}
						                        className={classes.textField}
						                        onChange={e => setState({address: e.target.value})}
						                        placeholder="Branch Address"
						                        margin="normal"
						                        variant="outlined"
			        							helperText="Change Branch Address Help Text"
						                    />
				        				</div>
							        }
		        			</div>	
			        		<div className="viewBlk">
		        				<label htmlFor="name">Branch Area</label>
	        					<div className="detail">{branch.state}</div>
		        			</div>	
			        		<div className="viewBlk">
		        				<label htmlFor="name">Branch Country</label>
		        				<div className="detail">Pakistan</div>
		        			</div>	
			        		<div className="viewBlk">
		        				<label htmlFor="name">Number of Subscribers</label>
		        				<div className="detail">{branch.total_subscribers}</div>
		        			</div>	
			        		<div className="viewBlk">
		        				
		        			</div>	
		        		</div>
		        		{
				          state.show?
				          null
				          :<div className="col-md-12">
			        			<div className="detail text-right">
			        				<div className="text-danger text-link" data-id={branch.id} onClick={deleteBusiness}>- Permanently Remove Branch</div>
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

export default connect(null, bredux.actions)(ViewBranch);