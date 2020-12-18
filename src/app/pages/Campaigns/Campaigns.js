import React from "react";
import { lighten, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';


function createData(name, client, keyword, ip_count, status, strat,  created_at, action) {
  return { name, client, keyword, ip_count, status, strat,  created_at, action };
}

const rows = [
  createData('New User', 'Wasif Ahmed', 'LQhT9', '10', 'Active', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Happy Journey', 'Shahbaz Mughal', 'TRhT8', '1', 'Inctive', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Upcoming Products', 'M Arfan', 'GFhT9', '6', 'Running', 'Jul 30, 2020 01:10:20 AM',  'Aug 20, 2020'),
  createData('Latest Features', 'M Naeem', 'VChT6', '9', 'Processing', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Promo 1', 'Imjaad Haider', 'JHhT5', '4', 'Active', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Happy New Year', 'M Wakeel', 'QAhT0', '8', 'Active', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Welcome User', 'Usman Ali', 'CXhT5', '3', 'Running', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Address Changed', 'Riaz Anwer', 'BVhT5', '2', 'Inactive', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Launching Blog', 'Sajid Sohail', 'XZhT2', '1', 'Processing', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Prices Rewise', 'Rehan Butt', 'YChT1', '7', 'Active', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Discount 10%', 'Shahbaz ', 'MKhT8', '5', 'Inactive', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Discount 50%', 'Arfan Ali', 'PKhT2', '9', 'Processing', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
  createData('Up to 30%', 'Adnan Rasheed', 'NThT6', '1', 'Active', 'Jul 30, 2020 01:10:20 AM', 'Aug 20, 2020'),
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
  { id: 'client', numeric: true, disablePadding: false, label: 'Client' },
  { id: 'keyword', numeric: true, disablePadding: false, label: 'Keyword' },
  { id: 'ip_count', numeric: true, disablePadding: false, label: 'IP Count' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'strat', numeric: true, disablePadding: false, label: 'Start Time' },
  { id: 'created_at', numeric: true, disablePadding: false, label: 'Created On' },
  { id: 'action', numeric: true, disablePadding: false, sorting: false, label: 'Action' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all email address' }}
          />
        </TableCell>
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
  progress: {
    margin: theme.spacing(2),
  },
}));

                  
export function Campaigns() {

	
	const history = useHistory();

  function addServer() {
    history.push("/email/create");
  }

	  const classes = useStyles();
	  const [order, setOrder] = React.useState('desc');
	  const [orderBy, setOrderBy] = React.useState('created_at');
	  const [selected, setSelected] = React.useState([]);
	  const [page, setPage] = React.useState(0);
	  const [dense, setDense] = React.useState(false);
	  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
      setOpen(true);
    }

    function handleClose() {
      setOpen(false);
    }

    function goBack() {
      history.goBack();
    }

    return (<>

    	<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Code/Compiling.svg")}/>
                  	</span> 
					<span>
						View Campaigns Description
					</span>
          <span className="svg-icon menu-icon goBack" onClick={goBack}>
            <i className="fa fa-long-arrow-alt-left"></i>
          </span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12">
		        <div className="card-body">

	        	<Button variant="contained" color="primary" onClick={addServer}>
			        Add New
			      </Button>
				    <div className={classes.root}>
				      <Paper className={classes.root}>
				          <Table className={classes.table}>
				            <TableHead>
                      <TableRow>
                        <TableCell>Campaign Name</TableCell>
                        <TableCell align="right">Clients</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Created On</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
				            <TableBody>
                      {rows.map(row => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.client}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell align="right">{row.created_at}</TableCell>
                          <TableCell align="right">
                            <a href="/campaign/create" title="Edit Detail"><i className="fa fa-edit text-info"></i></a>
                            <a href="#" onClick={handleClickOpen} title="Delete"><i className="fa fa-trash text-danger"></i></a>
                            <a href="#" title="Restart"><i className="fa fa-redo text-warning"></i></a>
                            <a href="#" title="Report"><i className="fa fa-book text-info"></i></a>
                            <a href="#" title="Resume"><i className="fa fa-play text-success"></i></a>
                            <a href="#" title="Pause"><i className="fa fa-pause text-warning"></i></a>
                            <a href="#" title="Stop"><i className="fa fa-stop text-danger"></i></a>
                          </TableCell>
                        </TableRow>
                      ))}
				            </TableBody>
				          </Table>
				      </Paper>
				      <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Disagree
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              <div className="blockUI"> <div className="processing"><span>Processing</span> <CircularProgress className={classes.progress} /></div></div>
				    </div>

		        </div>
		    </div>

    	</div>
	    	
    </>);
}