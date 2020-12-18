import React ,{useState,useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";

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
import { useHistory, useLocation } from "react-router-dom";
import swal from 'sweetalert';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TimeStamp } from "../../utility/TimeStamp";
import {connect,useSelector,useDispatch} from 'react-redux';
import * as sredux from './_redux/businessRedux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createData(bgcolor, name, email, location, branch, created_on, action) {
  return { bgcolor, name, email, location, branch, created_on, action };
}

const rows = [
  createData('bg-info', 'Wasif Ahmed', 'w*****d@g****l.com', 'Lahore', "Mall Road", "August 15, 2020", "Action"),
  createData('bg-success', 'Shahbaz Mughal', 's*****l@g****l.com', 'Lahore', "Mall Road", "August 11, 2020", "Action"),
  createData('bg-brand', 'Imjad Haider', 'i*****r@y****o.com', 'Lahore', "Mall Road", "August 07, 2020", "Action"),
  createData('bg-danger', 'M Naeem', 'n*****d@h****l.com', 'Lahore', "Mall Road", "July 27, 2020", "Action"),
  createData('bg-warning', 'Usman Ali', 'u*****i@o****k.com', 'Lahore', "Mall Road", "July 21, 2020", "Action"),
  createData('bg-dark', 'Riaz Anwer', 'r*****@g****l.com', 'Lahore', "Mall Road", "July 03, 2020", "Action"),
   createData('bg-info', 'M Wakeel', 'm*****l@g****l.com', 'Lahore', "Mall Road", "July 01, 2020", "Action"),
  createData('bg-success', 'Sajid Sohail', 's*****l@g****l.com', 'Lahore', "Mall Road", "June 29, 2020", "Action"),
  createData('bg-brand', 'Maida Shahid', 'm*****s@y****o.com', 'Lahore', "Mall Road", "June 18, 2020", "Action"),
  createData('bg-danger', 'M Aslam', 'm*****m@h****l.com', 'Lahore', "Mall Road", "June 11, 2020", "Action"),
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Contact' },
  { id: 'created_on', numeric: true, disablePadding: false, label: 'Subscribed On' },
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

const changeBranch = (e) => {
  console.log(e.target.value);
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function BranchSubscribers(props) {

	const history = useHistory();
  const location = useLocation();

  function addbranches() {
      history.push("/business/branch/add");
  }
	  const classes = useStyles();
	  const [order, setOrder] = React.useState('desc');
	  const [orderBy, setOrderBy] = React.useState('subscribers');
	  const [selected, setSelected] = React.useState([]);
	  const [page, setPage] = React.useState(0);
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

	  const isSelected = name => selected.indexOf(name) !== -1;

	  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function removeSubscriber(e) {
    var subscriber_id = e.target.dataset.id;
    var branch_id = e.target.dataset.br;
    var status = e.target.dataset.status;
    var name = e.target.dataset.name;
    if (status == 2) {
      toast.error(name+" already ban in branch!", {position: "top-right",autoClose: 3000});
      return false;
    } else {
      swal({
            title: "Are you sure?",
            text: "Once confirm, subscriber will be ban for this branch!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              props.banSubscriber(Number(subscriber_id), Number(branch_id));
              swal("Subscriber banned!", {
                icon: "success",
              });
          } 
      });
    }
      
  }  

  
  function goBack() {
    history.goBack();
  }

  const {user} = useSelector(state => state.auth);
  var user_id = user.id;
  var br_id = location.state.br_id;

  const [values, setValues] = React.useState({
    subsBranch: '',
    value:location.state.br_id
  });

  const [state, setState] = React.useState({
    br_id:location.state.br_id,
    bname:location.state.br_name
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  function handleChange(event) {
    //console.log(event.target.value)
    setValues(oldValues => ({
      value: event.target.value,
    }));
    setState({ ...state,br_id:event.target.value});
    props.getSubscribers(event.target.value);
    //console.log(state.br_id)
  }
  
  const globalState  = useSelector(state=>state.business)
  const [allsubscribers, setdata] = useState([]);
  const [allbranches, setbranch] = useState([]);

  useEffect( ()=>{
    //console.log(globalState);
    setdata(globalState.all_subscribers)
    setbranch(globalState.all_branches)
  });

  useEffect( ()=>{
    props.getSubscribers(br_id);
    props.getBusBranches(user_id);
  } , []);

  function protect_email(email) {
      var avg, splitted, part1, part2, avg, avg2, domain, tld, splitted, splitted2;
      splitted = email.split("@");
      part1 = splitted[0];
      avg = part1.substring(0,2);
      part2 = splitted[1];
      splitted2 = part2.split(".");
      domain = splitted2[0];
      avg2 = domain.substring(0,2);
      tld = splitted2[1];
      return  avg + "****@" + avg2 + "****." +tld;
  }

  //console.log(protect_email("shahbaz@gmail.com"));

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Adress-book2.svg")}/>
          </span> 
					<span>
						<FormattedMessage id="PAGE.BRANCHSUBSCRIBER.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

      <div className={`subscribers-table ` +classes.root}>
        <Paper className={classes.paper}>
          
          <Toolbar >
            <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                Branch - {state.bname} - <span>Subscribers</span>
              </Typography>
            </div>
            <div className={`table-filter `+ classes.actions}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="subsBranch">
                  Select Branch
                </InputLabel>
                <Select
                  value={values.value}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  input={<OutlinedInput labelWidth={labelWidth} name="subsBranch" id="subsBranch" />}
                >
                  {allbranches.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Toolbar>

          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={allsubscribers.length}
              />
                {
                  allsubscribers.length == 0 ?
                  <TableBody>
                    <TableRow>
                      <TableCell className="empty-cell" colSpan="3" align="center">No Subscriber Found</TableCell>
                    </TableRow>
                  </TableBody>
                  :<TableBody>
                    {stableSort(allsubscribers, getSorting(order, orderBy))
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
                            selected={isItemSelected}
                          >
                            <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                              <span className="user-card-block">
                                <div className="kt-user-card-v2">
                                  <div className="kt-user-card-v2__pic">
                                    <div id="kt-badge" className={row.bgcolor}>
                                      <img src={row.image} />
                                      {/*{row.name.slice(0, 1)}*/}
                                    </div>
                                  </div>
                                  <div className="kt-user-card-v2__details"> 
                                      <div className="kt-user-card-v2__name">{row.first_name} {row.last_name}</div> 
                                  </div>
                                </div>
                              </span>
                            </TableCell>
                            <TableCell align="left">{ TimeStamp(new Date(row.created_at).getTime()) }</TableCell>
                            <TableCell align="left">
                                  <button 
                                    className={row.subscriber_status == 2 ? 'btn btn-icon btn-icon-click btn-light btn-hover-danger btn-sm fa fa-ban text-danger active' : 'btn btn-icon btn-icon-click btn-light btn-hover-danger btn-sm fa fa-ban text-danger'} 
                                    data-name={row.first_name + " " + row.last_name} 
                                    data-status={row.subscriber_status} 
                                    data-id={row.id} 
                                    data-br={br_id} 
                                    onClick={removeSubscriber}
                                  ></button>
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
            count={allsubscribers.length}
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
	</>);

}

export default connect(null, sredux.actions)(BranchSubscribers);