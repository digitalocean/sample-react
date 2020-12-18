import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

import { useHistory, useLocation } from "react-router-dom";
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

const rows = [
  createData('BG Campaign', 'Summer Collection', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '79%', '35000', '42178', '34 minutes ago', '16 minutes ago', '18 minutes', 1),
  createData('Lahore Zone', 'Good Friday Promo', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '93%', '85000', '94567', '13 house ago', '6 house ago', '7 house', 2),
  createData('December Campaign', 'Quaid Anniversary', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '81%', '65000', '68291', '2 days 15 hours ago', '2 days 7 hours ago', '8 hours', 3),
  createData('August Promos', 'Independence Sale', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '66%', '175000', '184235', '14 days 10 hours ago', '13 days 8 hours ago', '1 day 2 hours ago', 4),
  createData('Lahore Offer', 'Eid Gifts', 'Khaadi - Iqbal Town Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '97%', '33000', '36543', '1 month 20 days ago', '1 month 17 days ago', '3 days', 5),
  createData('August Promos', 'Independence Sale', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '66%', '175000', '184235', '14 days 10 hours ago', '13 days 8 hours ago', '1 day 2 hours ago', 4),
  createData('Lahore Offer', 'Eid Gifts', 'Khaadi - Iqbal Town Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore', '97%', '33000', '36543', '1 month 20 days ago', '1 month 17 days ago', '3 days', 5),
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Schedule Info' },
  { id: 'branches', numeric: true, disablePadding: false, label: 'Audience' },
  { id: 'ctr', numeric: true, disablePadding: false, label: 'CTR' },
  { id: 'users', numeric: true, disablePadding: false, label: 'Audience Size' },
  { id: 'engage', numeric: true, disablePadding: false, label: 'Engagements' },
  { id: 'created_on', numeric: true, disablePadding: false, label: 'Start Time' },
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


export default function ViewStatisticsTable({ className }) {

  const history = useHistory();
	const location = useLocation();

  function StatisticsDetail(row, i) {
    history.push({
      pathname: '/campaigns/statistic/detail/',
      state: {
        id:i,
        name: row.name, 
        campaign: row.campaign, 
        branches: row.branches,
        engage: row.engage,
        created_on: row.created_on,
        end_time: row.end_time,
        duration: row.duration,
        status: row.status
      }
    });
    console.log(i + " :: " + row.name + " : " + row.campaign + " : " + row.branches + " : " + row.engage + " : " + row.time);
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

  return ( <>
      {/* <img src="/media/bg/05.png" /> */}
      <div className={`card card-custom col-md-12 ${className}`}>
        {/* Head */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">Campaigns Statistics</span>
          </h3>
          <div className="card-toolbar">
            {/*<a href="#" className="btn btn-success font-weight-bolder font-size-sm mr-3">Build Template</a>
            <a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
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
                              <div className="d-flex align-items-center">
                                <div>
                                  <div onClick={() => StatisticsDetail(row, index+1)} className="schedule-name font-weight-bolder text-primary mb-1 font-size-lg">
                                    {row.name}
                                  </div>
                                  <span className="text-muted font-weight-bold d-block">
                                    {row.campaign}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              <span className="text-dark-75 d-block ">
                                {row.branches}
                              </span>
                            </TableCell>
                            <TableCell align="center" className="ctr-cell">
                              <span className="text-brown font-weight-bolder d-block font-size-lg">
                                {row.ctr}
                              </span>
                              <span className="text-muted font-weight-bold d-block">
                                CTR
                              </span>
                            </TableCell>
                            <TableCell align="center" className="users-cell">
                              <span className="text-blue font-weight-bolder d-block font-size-lg">
                                {row.users}
                              </span>
                              <span className="text-muted font-weight-bold d-block">
                                Subsucribers
                              </span>
                            </TableCell>
                            <TableCell align="center" className="engage-cell">
                              <span className="text-purple font-weight-bolder d-block font-size-lg">
                                {row.engage}
                              </span>
                              <span className="text-muted font-weight-bold d-block">
                                Engages
                              </span>
                            </TableCell>
                            <TableCell align="left">
                              <span className="text-dark-75  d-block ">
                                {row.created_on}
                              </span>
                            </TableCell>
                            <TableCell align="left">
                              <Button className="btn btn-icon btn-light btn-sm" onClick={() => StatisticsDetail(row, index+1)}>
                                  <span className="svg-icon svg-icon-md svg-icon-success">
                                    <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
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
            
          </div>
        </div>
      </div>
    </>  
  );
}
