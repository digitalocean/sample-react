import React from "react";

import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {  makeStyles } from '@material-ui/core/styles';
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
import BlockUI from '../Component/BlockUI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


export default function ViewSheduledTable({ className }) {

  const history = useHistory();
  function createSchedule() {
    history.push('/campaigns/schedule/new');
  }

  const [state, setState] = React.useState({
		loader:false
	});

  const loader = () => {
		toast.success("Campaign has been updated", {position: "bottom-center",autoClose: 3000});
		setState({loader:true});
		setTimeout(function(){
			setState({loader:false});
		}.bind(),3000); 
	}

    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('start_time');
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

  return ( <>
      {/* <img src="/media/bg/04.png" /> */}
      <div className={`card card-custom col-md-12  ${className}`}>
        {/* Head */}
        <div className="card-header border-0 py-5">
            <div className="card-title align-items-start flex-column">
                <Button variant="contained" color="primary" className={classes.button} onClick={createSchedule}>
                    Schedule Campaign
                </Button>
            </div>
            <div className="card-toolbar">
                <select className="filterlist form-control">
                    <option value="1">All</option>
                    <option value="2">Scheduled</option>
                    <option value="3">Processingh</option>
                    <option value="4">Complete</option>
                </select>
            </div>
        </div>
        {/* Body */}
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
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
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
                            <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">
                                {row.start_time}
                            </TableCell>
                            <TableCell align="left" className="ctr-cell">
                                {row.status}
                            </TableCell>
                            <TableCell align="left" className="users-cell">
                                {row.audience}
                            </TableCell>
                            <TableCell align="left" className="engage-cell">
                                {row.progress}
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={loader} className="btn btn-icon btn-light btn-hover-danger btn-sm mx-2" title="Delete Campaign">
                                    <span className="svg-icon svg-icon-md svg-icon-danger">
                                        <i className="fa fa-times text-danger"></i>
                                    </span>
                                </Button>
                                <Button onClick={loader} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-2" title="Restart Campaign">
                                    <span className="svg-icon svg-icon-md svg-icon-primary">
                                        <i className="fa fa-redo text-primary"></i>
                                    </span>
                                </Button>
                                <Button onClick={loader} className="btn btn-icon btn-light btn-hover-success btn-sm mx-2" title="Resume Campaign">
                                    <span className="svg-icon svg-icon-md svg-icon-success">
                                        <i className="fa fa-play text-success"></i>
                                    </span>
                                </Button>
                                <Button onClick={loader} className="btn btn-icon btn-light btn-hover-warning btn-sm mx-2" title="Pause Campaign">
                                    <span className="svg-icon svg-icon-md svg-icon-warning">
                                        <i className="fa fa-pause text-warning"></i>
                                    </span>
                                </Button>
                                <Button onClick={loader} className="btn btn-icon btn-light btn-hover-danger btn-sm" title="Stop Campaign">
                                    <span className="svg-icon svg-icon-md svg-icon-danger">
                                        <i className="fa fa-stop text-danger"></i>
                                    </span>
                                </Button>
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
                </Table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
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
    </>  
  );
}
