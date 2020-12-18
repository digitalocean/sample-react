import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { useHistory, useLocation } from "react-router-dom";
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
import swal from 'sweetalert';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as ofredux from './_redux/offersRedux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function createData(name, detail, starting, expiry, qrscan, expire_now, action) {
	return { name, detail, starting, expiry, qrscan, expire_now, action };
  }
  
  const rows = [
	createData('Labour Day', "20%", "October 01 2020", "October 15 2020", "400", '', ''),
	createData('Eid Package', "30%", "October 05 2020", "October 12 2020", "800", '', ''),
	createData('Azadi Package', "40%", "October 15 2020", "October 21 2020", "1200", '', ''),
	createData('New Year', "50%", "October 23 2020", "October 29 2020", "1100", '', ''),
	createData('NewYork Offer', "70%", "October 12 2020", "October 21 2020", "13200", '', '')
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
	{ id: 'name', numeric: false, disablePadding: true, label: 'Offer Name' },
	{ id: 'detail', numeric: true, disablePadding: false, label: 'Description' },
	{ id: 'starting', numeric: true, disablePadding: false, label: 'Start Date' },
	{ id: 'expiry', numeric: true, disablePadding: false, label: 'End Date' },
	{ id: 'qrscan', numeric: true, disablePadding: false, label: 'QR Scans' },
	{ id: 'expire_now', numeric: true, disablePadding: false, label: 'Status' },
	{ id: 'action', numeric: true, disablePadding: false, label: 'Actions' },
  ];

  function EnhancedTableHead(props) {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
	onSelectAllClick: PropTypes.func.isRequired,
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
			<Typography variant="h6" id="tableTitle">
			  Broadcasts List
			</Typography>
		</div>
		<div className={classes.spacer} />
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

function Offers(props) {

	var moment = require('moment');

	const history = useHistory();
	const location = useLocation();
	
	var bname = location.state.b_name;
	var bid = location.state.bid;
	var bsnid = location.state.bsnid;

	function goBack() {
		history.goBack();
	}
	function addOffer() {
		history.push({
			pathname: '/business/branch/offer/add',
			state: {
			  bs_id: bsnid,
			  br_id: bid,
			  br_name: bname
			}
		});
	}

	function expireNow(e) {
		var data_id = e.target.dataset.id;
		//console.log(data_id);
		swal({
			title: "Are you sure?",
			text: "Once confirm, Offer will be expire!",
			icon: "warning",
			buttons:true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				props.expireOffer({ 
					id :Number(data_id)
				});
				swal("Offer has been expired!", {
					icon: "success",
					button:"Close"
				});
				setTimeout(() => {
					history.push({
					  pathname: '/business/branch/offers',
					  state: {
						  b_name: bname,
						  bid: bid,
						  bsnid:bsnid
					  }
					});
					swal.close();
				}, 2000);
		  	}
		});
	}
	const expired = () => {
		toast.error("Promo already expired!", {position: "top-right",autoClose: 3000});
	}
	const finished =()=> {
		toast.success("Promo already finished!", {position: "top-right",autoClose: 3000});
	}
	function editOffer(e) {
		var editOf = e.target.dataset.id;
		history.push({
			pathname: '/business/branch/offer/edit',
			state: {
			  offId: editOf,
			  bs_id: bsnid,
			  br_id: bid,
			  br_name: bname
			}
		});
	}
	

	const classes = useStyles();
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState('subscribers');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
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

	  const isSelected = name => selected.indexOf(name) !== -1;

	  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	function deleteBroadcast(e) {
		var data_id = e.target.dataset.id;
      swal({
          title: "Are you sure?",
          text: "Once confirm, Offer will be delete!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
			props.deleteOffer({ 
				id :data_id
			});
            swal("Offer has been deleted!", {
              icon: "success",
            });
		}
		setTimeout(() => {
			swal.close();
		}, 2000);
	  });
	}
	
	const globalState  = useSelector(state=>state.offers)
	const [alloffers, setdata] = useState([]);

	useEffect( ()=>{
		setdata(globalState.all_offers);
		//console.log(globalState);
	});

	useEffect( ()=>{
		props.getOffers(bid);
	} , []);

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Substract.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.OFFERS.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
                  	</span>
				</div>
			</div>
			
			<div className="card card-custom gutter-b col-md-12">
				<div className="card-header">
					<div className="card-title">

						<Typography variant="h6" id="tableTitle">
							Branches - {bname} - <span>Offers</span>
						</Typography>
					</div>
					<div className="card-toolbar">
						<Button variant="contained" color="primary" className={classes.button} onClick={addOffer}>
							Add Offer
						</Button>
					</div>
				</div>
		        <div className="card-body">
					<div className={`promo-table ` + classes.root}>
						<Paper className={classes.paper}>
							<div className={classes.tableWrapper}>
							<Table
								className={`table-center `+ classes.table}
								aria-labelledby="tableTitle"
							>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={alloffers.length}
								/>
									{
										alloffers.length == 0 ?
										<TableBody>
											<TableRow>
												<TableCell className="empty-cell" colSpan="7" align="center">No Offer Found</TableCell>
											</TableRow>
										</TableBody>
										:<TableBody>
											{stableSort(alloffers, getSorting(order, orderBy))
											.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											.map((row, index) => {
												const isItemSelected = isSelected(row.name);
												const labelId = `enhanced-table-checkbox-${index}`;

												return (
												<TableRow
													hover
													role="checkbox"
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={row.id}
													offer-id={row.id}
												>
													<TableCell width="20%" align="left" component="th" id={labelId} scope="row" padding="none">
													{row.title}
													</TableCell>
													<TableCell align="left">{row.description? row.description: "0"}</TableCell>
													<TableCell align="left">{row.start_date == "0000-00-00 00:00:00" ? moment(row.created_at).format("LLL")  : moment(row.start_date).format("LLL")}</TableCell>
													<TableCell align="left">
														{moment(row.expire_date).format("LLL")}
													</TableCell>
												<TableCell align="left">{row.quantity === -1 ? <span>{row.claimed}/&#8734;</span> : <span>{row.claimed}/{row.quantity}</span>}</TableCell>
													<TableCell align="left">
														{row.status === 0 ? <span>Pending</span> 
														: row.status === 1 ? <span>Running</span> 
														: row.status === 2 ? <span className="expired">Expired</span> 
														: row.status === 3 ? <span className="finished">Finished</span>
														: null}
													</TableCell>
													<TableCell align="left">
														{
															row.status == 2 ? 
															<button className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3 active" data-id={row.id} onClick={expired}>
																<span className="svg-icon svg-icon-md svg-icon-danger">
																	<i className="fa fa-clock fa-lg"></i>
																</span>
															</button>
															: row.status == 3 ?
															<button className="btn btn-icon btn-light btn-hover-success btn-sm mx-3 active" data-id={row.id} onClick={finished}>
																<span className="svg-icon svg-icon-md svg-icon-success">
																	<i className="fa fa-clock fa-lg"></i>
																</span>
															</button>
															:
															<button className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3" data-id={row.id} onClick={expireNow}>
																<span className="svg-icon svg-icon-md svg-icon-danger">
																	<i className="fa fa-clock fa-lg" data-id={row.id} onClick={expireNow}></i>
																</span>
															</button>
														}	
														{/* <button className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" data-id={row.id} onClick={editOffer}>
															<i className="fa fa-edit text-primary" data-id={row.id} onClick={editOffer}></i>
														</button>
														<button className="btn btn-icon btn-light btn-hover-danger btn-sm" data-id={row.id} onClick={deleteBroadcast}>
															<i className="fa fa-trash text-danger" data-id={row.id} onClick={deleteBroadcast}></i>
														</button> */}
													</TableCell>
												</TableRow>
												);
											})}
											{emptyRows > 0 && (
											<TableRow style={{ height: 49 * emptyRows }}>
												<TableCell colSpan={6} />
											</TableRow>
											)}
										</TableBody>
									}
								</Table>
							</div>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								component="div"
								count={alloffers.length}
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
					<ToastContainer />
				</div>
			</div>

		</div>
	</>);

}

export default connect(null, ofredux.actions)(Offers);