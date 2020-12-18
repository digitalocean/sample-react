import React ,{useState,useEffect} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";

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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useHistory, useLocation } from "react-router-dom";
import { TimeStamp } from "../../utility/TimeStamp";
import {connect,useSelector,useDispatch} from 'react-redux';
import * as bredux from './_redux/businessRedux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal} from "react-bootstrap";
import {API_URL} from "../../Constants";

function createData(name, subscribers, area, created_on, action) {
  return { name, subscribers, area, created_on, action };
}

const rows = [
  createData('Mall Branch', 7654, "Mall Road Lahore", "August 15, 2020", "Action"),
  createData('DHA III', 5432, "DHS Y Block Lahore", "August 11, 2020", "Action"),
  createData('Amana Mall', 4212, "Model Town Lahore", "August 07, 2020", "Action"),
  createData('MM ALAM Branch', 3974, "MM ALAM Road Lahore", "July 27, 2020", "Action"),
  createData('Johar Town', 2763, "Johar Town Lahore", "July 21, 2020", "Action"),
  createData('Wapda Town', 1902, "Wapda Town Lahore", "July 03, 2020", "Action"),
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Branch Name' },
  { id: 'subscribers', numeric: true, disablePadding: false, label: 'Subscribers' },
  { id: 'area', numeric: true, disablePadding: false, label: 'Area' },
  { id: 'created_on', numeric: true, disablePadding: false, label: 'Created On' },
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
            My Business - Khaadi - <span>Branches</span>
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

 function Branches(props) {

  const history = useHistory();
  const location = useLocation();

  const bs_id = location.state.bs_id;
  const bs_name = location.state.bs_name;
  const bs_opras = location.state.bs_opras;
  
  function viewbranch(e) {
    var bid = e.target.dataset.id;
    var br_name = e.target.dataset.name;
    history.push({
      pathname: '/business/branch/view',
      state: {
        bid: bid,
        bs_opras:bs_opras,
        br_name:br_name,
        bs_id:bs_id,
        bs_name:bs_name
      }
    });
  }
  function branchSubscribers(e) {
      var subs =  e.target.dataset.subs;
      if(subs == 0) {
        toast.error("No Subscribers Added", {position: "top-right",autoClose: 3000});
        return;
      } else {
        history.push({
          pathname: '/business/branch/subscriber',
          state: {
            br_name: e.target.dataset.name,
            br_id: e.target.dataset.id,
          }
        });
      }
  }
  function goBack() {
    history.goBack();
  }
  function viewOffers(e) {
    var b_name = e.target.dataset.bname;
    var b_id = e.target.dataset.bid;
    var bsnid = e.target.dataset.bsnid;
    history.push({
      pathname: '/business/branch/offers',
      state: {
        b_name: b_name,
        bid: b_id,
        bsnid:bsnid
      }
    });
  }


    const globalState  = useSelector(state=>state.business)
    const [allbranches, setdata] = useState([]);

		useEffect( ()=>{
      //console.log(globalState);
			setdata(globalState.all_branches)
		});

		useEffect( ()=>{
      //console.log(globalState);
      props.getBranches(bs_id)
      
		} , []);


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
    
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);

    const [state, setState] = React.useState({
      qr_id : 0,
      br_name: "",
      qr_image: "/media/images/qr.png"
    });

    const downloadQR =(e)=> {
      var brid = e.target.dataset.id;
      var br_name = e.target.dataset.name;
      var image = API_URL + "qrcodes/"+brid+".png";
      props.getBranchQR(brid)
      setState({qr_id: brid, br_name: br_name, qr_image: image});
      setShow(true);
      console.log(globalState.setBranchQR)
    }

    const downloadQrImage =()=> {
        var element = document.createElement('a');
        var file = new Blob([props.url], { type: 'image' });
        element.href = URL.createObjectURL(file);
        element.download = (state.qr_image);
        element.click();

        // var a = document.createElement('a');
        // a.setAttribute('download', state.qr_image);
        // a.setAttribute('href', state.qr_image);
        // a.click();
        // a.remove();
    }

	return (<>
		<div className="row">

        <Modal className="qrImgBlk" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body id="qrData">
            <i className="fa fa-times" onClick={handleClose}></i>
            <div className="col-md-12 text-center" qr-id={state.qr_id}>
              <h3>Branch - <span>{state.br_name}</span></h3>
              <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting been the industry. </p>
              <img src={state.qr_image} alt={`QR Code Branch: `+state.br_name} title={`QR Code Branch: `+state.br_name} />
              <a download className="imagedownload btn btn-success" href={state.qr_image} target="_blank">Download QR Code</a><br />
              {/* <Button variant="contained" color="primary" className={classes.button} onClick={downloadQrImage}>
	              Download QR Code
	            </Button> */}
            </div>
          </Modal.Body>
        </Modal>

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
          	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
        	</span> 
					<span>
						<FormattedMessage id="PAGE.BRANCHES.DESC" /> 
					</span>
          <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    </span>
				</div>
			</div>

			<div className={`mt-0 branches-table ` + classes.root}>
        <Paper className={classes.paper}>
        <Toolbar>
          <div className={classes.title}>
              <Typography variant="h6" id="tableTitle">
                My Business - {bs_opras} - <span>Branches</span>
              </Typography>
          </div>
        </Toolbar>
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
                rowCount={allbranches.length}
              />
              { allbranches.length == 0 ?
                <TableBody>
                  <TableRow>
                    <TableCell className="empty-cell" colSpan="6" align="center">No Branch Found</TableCell>
                  </TableRow>
                </TableBody>
                :<TableBody>
                  {stableSort(allbranches, getSorting(order, orderBy))
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
                          key={row.name}
                        >
                          <TableCell align="left" component="th" id={labelId} scope="row" padding="none">
                            <div className="text-link text-primary" data-id={row.id} data-name={row.name} onClick={viewbranch}>{row.name}</div>
                          </TableCell> 
                          <TableCell align="left"><div className="text-link text-primary" data-name={row.name} data-id={row.id} data-subs={row.total_subscribers} onClick={branchSubscribers}>({row.total_subscribers == null ? 0 : row.total_subscribers}) Subscribers</div></TableCell>
                          <TableCell align="left">{row.city}</TableCell>
                          <TableCell align="left">{ TimeStamp(new Date(row.created_at).getTime()) }</TableCell>
                          <TableCell align="left">
                            <button data-id={row.id} data-name={row.name} onClick={viewbranch} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1 eye">
                                <i className="fa fa-eye text-primary" data-id={row.id} data-name={row.name} onClick={viewbranch}></i>
                            </button>
                            <button className="btn btn-icon btn-light btn-hover-success btn-sm mx-1 qrcode" data-id={row.id} data-name={row.name} onClick={downloadQR}>
                              <i className="fas fa-qrcode text-success" data-id={row.id} data-name={row.name} onClick={downloadQR}></i>
                            </button>
                              <button data-bname={row.name} data-bid={row.id} data-bsnid={row.business_id} onClick={viewOffers} className="btn btn-icon btn-light btn-hover-danger text-danger btn-sm mx-1 announce">
                                <i className="fa fa-bullhorn text-danger" data-bname={row.name} data-bid={row.id} data-bsnid={row.business_id} onClick={viewOffers}></i>
                              </button>
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
            count={allbranches.length}
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

export default connect(null, bredux.actions)(Branches);