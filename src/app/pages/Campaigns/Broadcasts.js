import React ,{useState,useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
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

import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as credux from './_redux/campRedux';
import { TimeStamp } from "../../utility/TimeStamp";

function createData(name, subject, created_on, action) {
	return { name, subject, created_on, action };
  }
  
  const rows = [
	createData('Cupcake', 305, 3.7, 67),
	createData('Donut', 452, 25.0, 51),
	createData('Eclair', 262, 16.0, 24),
	createData('Frozen yoghurt', 159, 6.0, 24),
	createData('Gingerbread', 356, 16.0, 49),
	createData('Honeycomb', 408, 3.2, 87),
	createData('Ice cream sandwich', 237, 9.0, 37),
	createData('Jelly Bean', 375, 0.0, 94),
	createData('KitKat', 518, 26.0, 65),
	createData('Lollipop', 392, 0.2, 98),
	createData('Marshmallow', 318, 0, 81),
	createData('Nougat', 360, 19.0, 9),
	createData('Oreo', 437, 18.0, 63),
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
	{ id: 'name', numeric: false, disablePadding: true, label: 'Name' },
	{ id: 'subject', numeric: true, disablePadding: false, label: 'Subject' },
	{ id: 'created_at', numeric: true, disablePadding: false, label: 'Created On' },
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


function Broadcasts(props) {

	const globalState  = useSelector(state=>state.campaigns)
	const [all_broadcasts, setdata] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 

	useEffect( ()=>{
		//console.log(globalState.all_broadcasts)
		setdata(globalState.all_broadcasts)
	});

	useEffect( ()=>{
		props.getAllCampaigns(user_id)
	} , []);

	const history = useHistory();
	function addCampaign() {
	    history.push("/campaigns/new");
	}
	function editCampaign(e) {
		var brd_id = e.target.dataset.id;
		var builder = e.target.dataset.builder;
		var tid = e.target.dataset.tid;
		//console.log(brd_id, builder)
		if(builder == 0) {
			history.push({
				pathname: '/campaigns/edit/html',
				state: {
					id: brd_id,
					ed: builder
				}
			});
		} else {
			history.push({
				pathname: '/campaigns/edit/builder/',
				state: {
					id: brd_id,
					ed: builder,
					tid: tid
				}
			});
		}
	}
	function importTemplate() {
	    history.push("/campaigns/my-templates");
	}

	function deleteBroadcast(e) {
		var brd_id = e.target.dataset.id;
		//console.log(brd_id)
		swal({
			title: "Are you sure?",
			text: "Once deleted, Broadcast will be delete!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				swal("Broadcast has been deleted!", {
				icon: "success",
				});
				props.deleteCampaigns(brd_id)
				setTimeout(() => {
					props.getAllCampaigns(user_id)
				}, 1500);
			} 
		});
    }

    function goBack() {
	    history.goBack();
	}


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

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.BROADCASTS.DESC" />
					</span>
			        <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			        </span>
				</div>
			</div>
			{/* <img src="/media/bg/01.png" /> */}
			<div className="card card-custom gutter-b col-md-12">
		        <div className="card-body">

		        	<div className="toolbar">
		        		<div className="form-group">
							<Button variant="contained" color="primary" className={classes.button} onClick={addCampaign}>
						        Add Broadcast 
						    </Button>
				        	<Button variant="contained" color="secondary" className={classes.button} onClick={importTemplate}>
						        Import Template
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
										rowCount={all_broadcasts.length}
									/>
									{all_broadcasts.length == 0 ? 
										<TableBody>
											<TableRow>
											<TableCell className="empty-cell" colSpan="4" align="center">No Broadcast Found</TableCell>
											</TableRow>
										</TableBody>
										:<TableBody>
											{stableSort(all_broadcasts, getSorting(order, orderBy))
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
														<TableCell align="left">{row.subject}</TableCell>
														<TableCell align="left">{ TimeStamp(new Date(row.created_at).getTime()) }</TableCell>
														<TableCell align="left">
															<button 
																className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" 
																data-builder={row.is_campaign_builder} 
																data-id={row.id}
																data-tid={row.tid}
																onClick={editCampaign}
															>
																<i className="fa fa-edit text-primary" data-id={row.id} data-tid={row.tid} data-builder={row.is_campaign_builder}></i>
																{/* <span className="svg-icon svg-icon-md svg-icon-primary">
																	<SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")} />
																</span> */}
															</button>
															<button className="btn btn-icon btn-light btn-hover-danger btn-sm" data-id={row.id} onClick={deleteBroadcast}>
																<i className="fa fa-trash text-danger" data-id={row.id}></i>
																{/* <span className="svg-icon svg-icon-md svg-icon-danger">
																	<SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
																</span> */}
															</button>
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									}
										
								</Table>
							</div>
							<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							component="div"
							count={all_broadcasts.length}
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
					    </div>
					</div>
				</div>		
			</div>

		</div>
	</>);

}

export default connect(null, credux.actions)(Broadcasts);