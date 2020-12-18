import React, {useState,useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";
import ViewSheduledTable from '../Component/ViewSheduledTable';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as credux from './_redux/campRedux';

import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import BlockUI from '../Component/BlockUI';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';



function createData(name, start_time, status, audience, progress, action) {
	return { name, start_time, status, audience, progress, action };
  }
  
  const rows = [
    createData('Celebrate with us', 'Sep 29, 2020 12:54:57 PM', 'Waiting for Execution', '21500', '(0 / 21500) 0%'),
    createData('Flat 50% OFF', 'Sep 25, 2020 11:42:11 AM', 'System paused', '342345', '(212345 / 342345) 62%'),
    createData('Double Bonus', 'Sep 18, 2020 04:54:32 PM', 'System paused', '756771', '(676771 / 756771) 89%'),
    createData('Good Morning', 'Sep 13, 2020 03:51:32 AM', 'Finished', '867867', '(867867 / 867867) 100%'),
    createData('Welcome User', 'Sep 05, 2020 10:12:17 PM', 'Finished', '123534', '(123534 / 123534) 100%'),
    createData('Good Morning', 'Sep 04, 2020 11:22:32 AM', 'Finished', '547867', '(547867 / 547867) 100%'),
    createData('Welcome User', 'Sep 03, 2020 09:44:17 PM', 'Finished', '123534', '(123534 / 123534) 100%'),
];
  
function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
	  return -1;
	}
	if (b[orderBy] > a[orderBy]) {
	  return 1;
	}
	return 0;
}
  
function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
	  const order = cmp(a[0], b[0]);
	  if (order !== 0) return order;
	  return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}
  
function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Scheduled Label' },
	{ id: 'start_time', numeric: true, disablePadding: false, label: 'Start Time' },
	{ id: 'status', numeric: true, disablePadding: false, label: 'Status' },
	{ id: 'audience', numeric: true, disablePadding: false, label: 'Audience Size' },
	{ id: 'progress', numeric: true, disablePadding: false, label: 'Progress' },
	{ id: 'action', numeric: true, disablePadding: false, label: 'Action' },
];
  
function EnhancedTableHead(props) {
	const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = property => event => {
	  onRequestSort(event, property);
	};
  
	return (
	  <TableHead>
		<TableRow>
		  {headRows.map(row => (
			<TableCell
			  key={row.id}
			  align={row.numeric ? 'right' : 'left'}
			  padding={row.disablePadding ? 'none' : 'default'}
			  sortDirection={orderBy === row.id ? order : false}
			>
			  <TableSortLabel
				active={orderBy === row.id}
				direction={order}
				onClick={createSortHandler(row.id)}
			  >
				{row.label}
			  </TableSortLabel>
			</TableCell>
		  ))}
		</TableRow>
	  </TableHead>
	);
}
  
EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	//onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};
  
const useToolbarStyles = makeStyles(theme => ({
	root: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(1),
	},
	highlight:
	  theme.palette.type === 'light'
		? {
			color: theme.palette.secondary.main,
			backgroundColor: lighten(theme.palette.secondary.light, 0.85),
		  }
		: {
			color: theme.palette.text.primary,
			backgroundColor: theme.palette.secondary.dark,
		  },
	spacer: {
	  flex: '1 1 100%',
	},
	actions: {
	  color: theme.palette.text.secondary,
	},
	title: {
	  flex: '0 0 auto',
	},
}));
  
const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles();
	const { numSelected } = props;
  
	return (
	  <Toolbar
		className={clsx(classes.root, {
		  [classes.highlight]: numSelected > 0,
		})}
	  >
		<div className={classes.title}>
		  {numSelected > 0 ? (
			<Typography color="inherit" variant="subtitle1">
			  {numSelected} selected
			</Typography>
		  ) : (
			<Typography variant="h6" id="tableTitle">
			  Nutrition
			</Typography>
		  )}
		</div>
		<div className={classes.spacer} />
		<div className={classes.actions}>
		  {numSelected > 0 ? (
			<Tooltip title="Delete">
			  <IconButton aria-label="Delete">
				<DeleteIcon />
			  </IconButton>
			</Tooltip>
		  ) : (
			<Tooltip title="Filter list">
			  <IconButton aria-label="Filter list">
				<FilterListIcon />
			  </IconButton>
			</Tooltip>
		  )}
		</div>
	  </Toolbar>
	);
};
  
EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};
  
const useStyles = makeStyles(theme => ({
	root: {
	  width: '100%',
	  marginTop: theme.spacing(3),
	},
	paper: {
	  width: '100%',
	  marginBottom: theme.spacing(2),
	},
	table: {
	  minWidth: 750,
	},
	tableWrapper: {
	  overflowX: 'auto',
	},
 }));

function Schedule(props) {

	var moment = require('moment');

	const history = useHistory();

	function createSchedule() {
		history.push('/campaigns/schedule/new');
	}

	function goBack() {
      history.goBack();
	}

	const globalState  = useSelector(state=>state.campaigns)
	const [all_schedule, setdata] = useState([]);
	const [schedule_status, setSheduleStatus] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 
	
	useEffect( ()=>{
		//console.log(globalState.change_schedule_status.schedule_status)
		setSheduleStatus(globalState.change_schedule_status.schedule_status);
		setdata(globalState.all_schedule)
	});

	useEffect( ()=>{
		props.getAllSchedule(user_id)
	} , []);

	const [state, setState] = React.useState({
		loader:false
	});

	const classes = useStyles();
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState('id');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
		const newSelecteds = rows.map(n => n.name);
		setSelected(newSelecteds);
		return;
		}
		setSelected([]);
	}

	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
		newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
		newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
		newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
		newSelected = newSelected.concat(
			selected.slice(0, selectedIndex),
			selected.slice(selectedIndex + 1),
		);
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
	}

	function handleChangeDense(event) {
		setDense(event.target.checked);
	}

	const isSelected = name => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const changeStatus = (e) => {
		//toast.success("Campaign has been updated", {position: "top-right",autoClose: 2000});
		// setState({...state, loader:true});
		// setTimeout(function(){
		// 	setState({...state, loader:false});
		// }.bind(),3000); 
		var id = e.target.dataset.id;
		var status = e.target.dataset.status;
		console.log(id, status)
		//return false;
		setState({...state, loader:true});
		props.changeSchedule({id:id, status:status});
		if (schedule_status != "") {
			setState({...state, loader:false});
			props.getAllSchedule(user_id)
			toast.success("Campaign status updated successfully!", {position: "top-right",autoClose: 2000});
		}
		// swal({
		// 	title: "Are you sure?",
		// 	text: "Once deleted, Broadcast will be delete!",
		// 	icon: "warning",
		// 	buttons: true,
		// 	dangerMode: true,
		// })
		// .then((willDelete) => {
		// 	if (willDelete) {
		// 		props.changeSchedule(id);
		// 		swal("Campaign Deleted Successfully!", {
		// 		icon: "success",
		// 		});
		// 		setTimeout(() => {
		// 			props.getAllSchedule(user_id)
		// 		}, 1500);
		// 	} 
		// });
	}

	function deleteSchedule(e) {
		var sch_id = e.target.dataset.id;
		console.log(sch_id)
		//return false;
		swal({
			title: "Are you sure?",
			text: "Once deleted, Broadcast will be delete!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				props.deleteSchedule(sch_id);
				swal("Campaign Deleted Successfully!", {
				icon: "success",
				});
				setTimeout(() => {
					props.getAllSchedule(user_id)
				}, 1500);
			} 
		});
    }

	return (<>
		<div className="row view-schedule">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  	</span> 
					<span>
					<FormattedMessage id="PAGE.SCHEDULED.DESC" />
					</span>
			        <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			        </span>
				</div>
			</div>

			{/* <ViewSheduledTable /> */}
			<div className="card card-custom gutter-b col-md-12">
		        <div className="card-body">

					<div className="toolbar">
		        		<div className="form-group">
							<Button variant="contained" color="primary" className={classes.button} onClick={createSchedule}>
								Schedule Campaign
							</Button>
		        		</div>
		        	</div>

				    <div>
						 <div className={`campaigns-table ` + classes.root}>
							<Paper className={classes.paper}>
								<div className={classes.tableWrapper}>
									<Table
										className={classes.table}
										aria-labelledby="tableTitle"
										size={dense ? 'small' : 'medium'}
									>
										<EnhancedTableHead
											numSelected={selected.length}
											order={order}
											orderBy={orderBy}
											onRequestSort={handleRequestSort}
											rowCount={all_schedule ? all_schedule.length : 0}
										/>
										{all_schedule? 
											<TableBody>
												{stableSort(all_schedule, getSorting(order, orderBy))
													.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
													.map((row, index) => {
													const labelId = `enhanced-table-checkbox-${index}`;

													return (
														<TableRow
															hover
															role="checkbox"
															tabIndex={-1}
															key={index}
														>
															<TableCell align="left" component="th" id={row.id} scope="row" padding="none">
																{row.name}
															</TableCell>
															<TableCell align="left">{moment(row.created_at).format("MMM DD, YYYY hh:mm:ss A")}</TableCell>
															<TableCell>
																{
																	row.status == "scheduled" ? <span className="badge badge-secondary">Starting in 00:00:00:59</span> 
																	: row.status == "resumed" ? <span className="badge badge-secondary">Starting in 00:00:00:59</span> 
																	: row.status == "processing" ? <span className="badge badge-success">Running</span> 
																	: row.status == "paused" ? <span className="badge badge-info">Paused</span> 
																	: row.status == "system paused" ? <span className="badge badge-danger">System Paused</span> 
																	: row.status == "complete" ? <span className="badge badge-dark">Finished</span>
																	: "-"
																}
															</TableCell>
															<TableCell align="left">{row.total_scheduled}</TableCell>
															<TableCell>({row.emails_sent} / {row.total_scheduled}) {((row.emails_sent/row.total_scheduled) * 100).toFixed(0)}%</TableCell>
															<TableCell align="left">
																{row.status == "paused" || row.status == "system paused" || row.status == "complete" ? 
																	<Button onClick={deleteSchedule} data-id={row.id} data-status="delete" className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1" title="Delete Campaign">
																		<i className="fa fa-times text-danger" data-id={row.id} data-status="delete"></i>
																	</Button>
																	:<></>
																}
																{row.status == "complete" ? 
																	<Button onClick={changeStatus} data-id={row.id} data-status="scheduled" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1" title="Reschedule Campaign">
																		<i className="fa fa-redo text-primary" data-id={row.id} data-status="scheduled"></i>
																	</Button>
																	:<></>
																}
																{row.status == "paused" || row.status == "system paused" ? 
																	<Button onClick={changeStatus} data-id={row.id} data-status="processing" className="btn btn-icon btn-light btn-hover-success btn-sm mx-1" title="Resume Campaign">
																		<i className="fa fa-play text-success" data-id={row.id} data-status="processing"></i>
																	</Button>
																	:<></>
																}
																{row.status == "scheduled" || row.status == "processing" ? 
																	<Button onClick={changeStatus} data-id={row.id} data-status="paused" className="btn btn-icon btn-light btn-hover-warning btn-sm mx-1" title="Pause Campaign">
																		<i className="fa fa-pause text-warning" data-id={row.id} data-status="paused"></i>
																	</Button>
																	:<></>
																}
																	
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
											:<TableBody>
											<TableRow>
												<TableCell className="empty-cell" colSpan="6" align="center">No Broadcast Found</TableCell>
												</TableRow>
											</TableBody>
										}
											
									</Table>
								</div>
								<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component="div"
								count={all_schedule ? all_schedule.length : 0}
								rowsPerPage={rowsPerPage}
								page={page}
								backIconButtonProps={{
									'aria-label': 'Previous Page',
								}}
								nextIconButtonProps={{
									'aria-label': 'Next Page',
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</Paper>

							{
								state.loader?
								<BlockUI />
								: <div> </div>
							}	
							<ToastContainer />
							
					    </div>
					</div>
				</div>		
			</div>

		</div>
	</>);

}

export default connect(null, credux.actions)(Schedule);