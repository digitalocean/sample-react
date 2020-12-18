import React ,{useState,useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import {connect,useSelector,useDispatch} from 'react-redux'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as bredux from './_redux/businessRedux'
import Button from '@material-ui/core/Button';
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";
import { TimeStamp } from "../../utility/TimeStamp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, branch, verified, status, created_on) {
  return { name, branch, verified, status, created_on };
}

function Business(props) {

	const { getBusinesses} = props;
	
	const globalState  = useSelector(state=>state.business)
	const [allbusinesses, setdata] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 

		useEffect( ()=>{
			setdata(globalState.all_businesses)
		});

		useEffect( ()=>{
			props.getBusinesses(user_id)
		} , []);
			
	const dispatch = useDispatch()
	const classes = useStyles();

	const history = useHistory();
	function branches(e) {
		var branch = e.target.dataset.branch;
		history.push({
			pathname: '/business/branches',
			state: {
				bs_name: e.target.dataset.name,
				bs_opras: e.target.dataset.opras,
				bs_id: e.target.dataset.id,
			}
		});
		// if(branch == 0) {
		// 	toast.error("No Branch Added!", {position: "top-right",autoClose: 3000});
		// 	return;
		// } else {
		// 	history.push({
		// 		pathname: '/business/branches',
		// 		state: {
		// 			bs_name: e.target.dataset.name,
		// 			bs_opras: e.target.dataset.opras,
		// 			bs_id: e.target.dataset.id,
		// 		}
		// 	});
		// }
		//console.log('Busines: '+ e.target.dataset.name +' '+e.target.dataset.id);
	}
	
	function addbusiness() {
	    history.push("/business/add");
	}
	function addbranches() {
	    history.push("/business/branch/add");
	}
	function businessdetail(e) {
		var bid = e.target.dataset.id;
		var bs_name = e.target.dataset.name;
		var bs_opras = e.target.dataset.bs_opras;
		history.push({
			pathname: '/business/view',
			state: {
				bid: bid,
				bs_opras:bs_opras,
				bs_name:bs_name
			}
		});
	}
	function goBack() {
	    history.goBack();
	}


	function getAllBranches(){
		//dispatch({ type: 'SET_LOADING',payload: 'We are opne' })
		//can also do like this
		props.getBranches()

	}

	return (
		<div className="row">
    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.BUSINESS.DESC" />
					</span>
			        <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			        </span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12">
		        <div className="card-body">

		        	<div className="toolbar">
		        		<div className="form-group">
							<Button variant="contained" color="primary" className={classes.button} onClick={addbusiness}>
						        Add a Business 
						    </Button>

							{/* <Button variant="contained" color="primary" className={classes.button} onClick={getAllBranches}>
						        Get Branches
						    </Button> */}
				        	<Button variant="contained" color="secondary" className={classes.button} onClick={addbranches}>
						        Add a Branch
						    </Button>
		        		</div>
		        	</div>
		        	
			<div>

				</div>
				    <div className={classes.root}>
						<TableContainer component={Paper}>
						    <Table className={`table-center `+ classes.table} aria-label="simple table">
						        <TableHead>
						          <TableRow>
						            <TableCell>Business Name</TableCell>
						            <TableCell>Branches</TableCell>
						            <TableCell>Verified</TableCell>
						            <TableCell>Status</TableCell>
						            <TableCell>Created On</TableCell>
						          </TableRow>
						        </TableHead>
								{
									allbusinesses.length == 0 ?
									<TableBody>
										<TableRow>
											<TableCell className="empty-cell" colSpan="5" align="center">
												No Business Found
											</TableCell>
										</TableRow>
									</TableBody>
									:<TableBody>
										{allbusinesses.map((row) => (
											<TableRow key={row.id}>
												<TableCell component="th" scope="row">
													<div className="text-link text-primary" data-id={row.id} data-name={row.name} data-bs_opras={row.operating_as} onClick={businessdetail} title={row.name}>{row.name}</div>
												</TableCell>
												<TableCell align="right"><div className="text-link text-primary" data-name={row.name} data-opras={row.operating_as} data-id={row.id} data-branch={row.total_branches} onClick={branches} title={row.name}>({row.total_branches}) Branches</div></TableCell>
												<TableCell align="right">{row.verified_on ? <img src="/media/misc/v.png" width="20px" />:'-'}</TableCell>
												<TableCell align="right">{row.status}</TableCell>
												<TableCell align="right">{ TimeStamp(new Date(row.created_at).getTime()) } </TableCell>
											</TableRow>
										))}
									</TableBody>
								}
						    </Table>
						</TableContainer>
					</div>
				</div>		
			</div>
      		<ToastContainer />
		</div>
	);

}



export default connect(null, bredux.actions)(Business);