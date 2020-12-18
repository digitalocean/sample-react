import React, {useState,useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";
import ViewStatisticsTable from '../Component/ViewStatisticsTable';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as credux from './_redux/campRedux';

import clsx from 'clsx';
import Button from '@material-ui/core/Button';
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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function createData(name, campaign, branches, ctr, users, engage, created_on, end_time, duration, status, action) {
	return { name, campaign, branches, ctr, users, engage, created_on, end_time, duration, status, action };
}

const rows = [];

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
{ id: 'name', numeric: false, disablePadding: true, label: 'Schedule Info' },
{ id: 'branches', numeric: true, disablePadding: false, label: 'Audience' },
{ id: 'users', numeric: true, disablePadding: false, label: 'Audience Size' },
{ id: 'engage', numeric: true, disablePadding: false, label: 'Engagements' },
{ id: 'ctr', numeric: true, disablePadding: false, label: 'CTR' },
{ id: 'action', numeric: true, disablePadding: false, label: '' },
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
}));

const EnhancedTableToolbar = props => {
const classes = useToolbarStyles();
const { numSelected } = props;



return (
<Toolbar >
<div className={classes.title}>
 <h3 class="card-title align-items-start flex-column">
   <span class="card-label font-weight-bolder text-dark">Campaigns Statistics</span>
   <span class="text-muted mt-3 font-weight-bold font-size-sm">Campaigns Statistic List</span>
 </h3>
</div>
<div className={classes.spacer} />
<div className={`table-filter `+ classes.actions}>
 
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




function Statistics(props) {

	var moment = require('moment');

	const globalState  = useSelector(state=>state.campaigns)
	const [all_statistics, setdata] = useState([]);
	const {user} = useSelector(state => state.auth);
	const user_id = user.id; 

	useEffect( ()=>{
		//console.log(globalState.all_statistics)
		setdata(globalState.all_statistics)
	});

	useEffect( ()=>{
		props.getAllStatistics(user_id)
	} , []);

	const history = useHistory();

	function goBack() {
      history.goBack();
	}
	

	function StatisticsDetail(e) {
		var id = e.target.dataset.id;
		history.push({
		pathname: '/campaigns/statistic/detail/',
		state: {
			id:id
		}
		});
	}

	const classes = useStyles();
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState('index');
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

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.STATISTICS.DESC" />
					</span>
			        <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			        </span>
				</div>
			</div>
			{/* <img src="/media/bg/05.png" /> */}
			<div className={`card card-custom col-md-12`}>
				<div className="card-header border-0 py-5">
					<h3 className="card-title align-items-start flex-column">
						<span className="card-label font-weight-bolder text-dark">Campaigns Statistics</span>
					</h3>
					<div className="card-toolbar">
						{/*<a href="#" className="btn btn-success font-weight-bolder font-size-sm mr-3">Build Template</a>
						<a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
					</div>
				</div>
				<div className="card-body pt-0 pb-3 ">
					<div className="tab-content">
						<Paper className={classes.paper}>
							<div className={classes.tableWrapper}>
								<Table
								className={`table-statistics ` + classes.table}
								aria-labelledby="tableTitle"
								>
								<EnhancedTableHead
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={all_statistics.length}
								/>
								{all_statistics.length == 0 ? 
									<TableBody>
										<TableRow>
										<TableCell className="empty-cell" colSpan="7" align="center">No Data Found</TableCell>
										</TableRow>
									</TableBody>
									:<TableBody>
										{stableSort(all_statistics, getSorting(order, orderBy))
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
													key={index}
													selected={isItemSelected}
												>
													<TableCell align="left" id={row.id} scope="row" padding="none">
														<div onClick={StatisticsDetail} data-id={row.id} className="schedule-name font-weight-bolder text-primary mb-1 font-size-lg">
															{row.name}
														</div>
														<div className="text-muted font-weight-bold d-block text-grey">
															{row.broadcast_name}
														</div>
														<span className="text-muted font-weight-bold d-block">
															Schedule on {moment(row.start_datetime == null ? "2020-10-28T11:10:41.000Z" : row.start_datetime).format("lll")}
														</span>
													</TableCell>
													<TableCell align="left">
													<span className="text-dark-75 d-block ">
														{row.branch_names}
													</span>
													</TableCell>
													<TableCell align="center" className="users-cell">
													<span className="text-blue font-weight-bolder d-block font-size-lg">
														{row.total_scheduled}
													</span>
													<span className="text-muted font-weight-bold d-block">
														Subsucribers
													</span>
													</TableCell>
													<TableCell align="center" className="engage-cell">
													<span className="text-purple font-weight-bolder d-block font-size-lg">
														{row.total_open + row.total_clicks}
													</span>
													<span className="text-muted font-weight-bold d-block">
														Engages
													</span>
													</TableCell>
													<TableCell align="center" className="ctr-cell">
														<span className="text-brown font-weight-bolder d-block font-size-lg">
															{row.ctr == null ? 0 : row.ctr}%
														</span>
														<span className="text-muted font-weight-bold d-block">
															CTR
														</span>
													</TableCell>
													<TableCell align="left">
													<Button className="btn btn-icon btn-light btn-sm" onClick={StatisticsDetail} data-id={row.id}>
														<i className="far fa-chart-bar text-success" onClick={StatisticsDetail} data-id={row.id}></i>
														{/* <span className="svg-icon svg-icon-md svg-icon-success">
															<SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
														</span> */}
													</Button>
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
								count={all_statistics.length}
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

			{/* <ViewStatisticsTable /> */}

		</div>
	</>);

}

export default connect(null, credux.actions)(Statistics);