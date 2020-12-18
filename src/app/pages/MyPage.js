import React from "react";
import { makeStyles, useTheme, withStyles, lighten } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import Checkbox from '@material-ui/core/Checkbox';

import Switch from '@material-ui/core/Switch';

import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import ListItemText from '@material-ui/core/ListItemText';


//import clsx from 'clsx';
//import PropTypes from 'prop-types';
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
//import Checkbox from '@material-ui/core/Checkbox';
//import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

//import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
//import { amber, green } from '@material-ui/core/colors';
//import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
//import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import Typography from '@material-ui/core/Typography';

//import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";


import Chip from '@material-ui/core/Chip';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
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
            inputProps={{ 'aria-label': 'Select all desserts' }}
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





const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classesA = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classesA[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classesA.message}>
          <Icon className={clsx(classesA.icon, classesA.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classesA.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));




function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStylesTabs = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));




export function MyPage(props) {


	const useStyles = makeStyles(theme => ({
	  button: {
	    margin: theme.spacing(1),
	  },
	  input: {
	    display: 'none',
	  },
	  root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  margin: {
	    margin: theme.spacing(1),
	  },
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 120,
	    maxWidth: 300,
	  },
	  container: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  textField: {
      flexBasis: 200,
	    marginLeft: theme.spacing(1),
	    marginRight: theme.spacing(1),
	  },
	}));
	const [state, setState] = React.useState({
	    checkedA: true,
	    checkedB: true,
	    checkedC: true,
	    checkedD: true,
	    checkedE: true,
	    checkedF: true,
	  });

	  const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.checked });
	  };

	const GreenRadio = withStyles({
	  root: {
	    color: green[400],
	    '&$checked': {
	      color: green[600],
	    },
	  },
	  checked: {},
	})(props => <Radio color="default" {...props} />);  

	const [selectedValue, setSelectedValue] = React.useState('a');

	function handleChangeR(event) {
	    setSelectedValue(event.target.value);
	}
	const handleClickShowPassword = () => {
	    setValues({ ...values, showPassword: !values.showPassword });
	};

	const classes = useStyles();
	const [values, setValues] = React.useState({
	    amount: '',
	    password: '',
	    weight: '',
	    weightRange: '',
	    showPassword: false,
	});

	const handleChangeP = prop => event => {
    	setValues({ ...values, [prop]: event.target.value });
  	};

  	const ranges = [
		{
	    	value: '0-20',
	    	label: '0 to 20',
	  	},
	  	{
	    	value: '21-50',
	    	label: '21 to 50',
	  	},
	  	{
	    	value: '51-100',
	    	label: '51 to 100',
	  	},
	  	{
	    	value: '101-200',
	    	label: '101 to 200',
	  	},
	  	{
	    	value: '201-1000',
	    	label: '201 to 1000',
	  	},
	  	{
	    	value: '1001-5000',
	    	label: '1001 to 5000',
	  	},
	];

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
	    setLabelWidth(inputLabel.current.offsetWidth);
	}, []);
	const handleChangeS = name => event => {
	    setState({
	      ...state,
	      [name]: event.target.value,
	    });
	};

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

	const names = [
	  'Oliver Hansen',
	  'Van Henry',
	  'April Tucker',
	  'Ralph Hubbard',
	  'Omar Alexander',
	  'Carlos Abbott',
	  'Miriam Wagner',
	  'Bradley Wilkerson',
	  'Virginia Andrews',
	  'Kelly Snyder',
	];

	/*const classes = useStyles();*/
	const theme = useTheme();
  	const [personName, setPersonName] = React.useState([]);

  	function handleChangeM(event) {
	    setPersonName(event.target.value);
	}



	  const classesT = useStyles();
	  const [order, setOrder] = React.useState('asc');
	  const [orderBy, setOrderBy] = React.useState('calories');
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

	  function handleClickTable(event, name) {
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

  
	

	const classesA2 = useStyles2();
	const [open, setOpen] = React.useState(false);

	function handleClickTostr() {
	    setOpen(true);
	}

	function handleCloseTostr(event, reason) {
	    if (reason === 'clickaway') {
	      return;
	    }
	    setOpen(false);
	}
	  


	const classesTab = useStylesTabs();
	const [value, setValue] = React.useState(0);

	function handleChangeTab(event, newValue) {
	    setValue(newValue);
	}



	const options = [
		  'Add New 2',
		  'Edit User 2',
		  'Delete 2'
	];

	const [anchorEl, setAnchorEl] = React.useState(null);
	const openOpt = Boolean(anchorEl);

	function handleClickOpt(event) {
	    setAnchorEl(event.currentTarget);
	}

	function handleCloseOpt() {
	    setAnchorEl(null);
	}


  /*const [open, setOpen] = React.useState(false);*/

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }


    return (<>

	    	
		<div className="row">

			<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12">
	    		<IconButton
			        aria-label="More"
			        aria-controls="long-menu"
			        aria-haspopup="true"
			        onClick={handleClickOpt}
			    >
			      <MoreVertIcon />
			    </IconButton>
			    <Menu
			        id="long-menu"
			        anchorEl={anchorEl}
			        keepMounted
			        open={openOpt}
			        onClose={handleCloseOpt}
			        PaperProps={{
			          style: {
			            maxHeight: ITEM_HEIGHT * 4.5,
			            width: 200,
			          },
			        }}
			    >	
			    	<MenuItem onClick={handleCloseOpt}>Add New</MenuItem>
			    	<MenuItem onClick={handleCloseOpt}>Edit User</MenuItem>
			    	<MenuItem onClick={handleCloseOpt}>Delete</MenuItem>
			        {options.map(option => (
			          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleCloseOpt}>
			            {option}
			          </MenuItem>
			        ))}
			    </Menu>
				<div className="alert-text"><span>Text fields let users enter and edit text.</span>  
					<span>
						For more info please check the components's official 
						<a target="_blank" className="font-weight-bold" rel="noopener noreferrer" href="#"> demos &amp; documentation</a>
					</span>
				</div>
			</div>

      <div className="card card-custom gutter-b col-md-12">
          <div className="card-header">
          	<div className="card-title">
          		<h3 className="card-label">Form Elements</h3>
          	</div>
          	<div className="card-toolbar">
          		<div className="example-tools">
          			<span className="example-toggle " title="View code"></span>
          			<span className="example-copy "></span>
          		</div>
          	</div>
          </div>
          <div className="card-body">
          	<div labelName="Buttons">
          		  <Button variant="contained" className={classes.button}>
  					        Default
  					    </Button>
  					    <Button variant="contained" color="primary" className={classes.button}>
  					        Primary
  					    </Button>
  					    <Button variant="contained" color="secondary" className={classes.button}>
  					        Secondary
  					    </Button>
  					    <Button variant="contained" color="secondary" disabled className={classes.button}>
  					        Disabled
  					    </Button>
  					    <Button variant="contained" href="#contained-buttons" className={classes.button}>
  					        Link
  					    </Button>
  					    <input
  					        accept="image/*"
  					        className={classes.input}
  					        id="contained-button-file"
  					        multiple
  					        type="file"
  					    />
  					    <label htmlFor="contained-button-file">
  					        <Button variant="contained" component="span" className={classes.button}>
  					          Upload
  					        </Button>
  					    </label>
  	            	</div>
  		            <div labelName="CheckBoxes">	
  					    <Checkbox
  					        checked={state.checkedA}
  					        onChange={handleChange('checkedA')}
  					        value="checkedA"
  					        inputProps={{
  					          'aria-label': 'primary checkbox',
  					        }}
  					    />
  					    <Checkbox
  					        checked={state.checkedB}
  					        onChange={handleChange('checkedB')}
  					        value="checkedB"
  					        color="primary"
  					        inputProps={{
  					          'aria-label': 'secondary checkbox',
  					        }}
  					    />
  					    <Checkbox
  					        value="checkedC"
  					        inputProps={{
  					          'aria-label': 'uncontrolled-checkbox',
  					        }}
  					    />
  					    <Checkbox
  					        disabled
  					        value="checkedD"
  					        inputProps={{
  					          'aria-label': 'disabled checkbox',
  					        }}
  					    />
  					    <Checkbox
  					        disabled
  					        checked
  					        value="checkedE"
  					        inputProps={{
  					          'aria-label': 'disabled checked checkbox',
  					        }}
  					    />
  					    <Checkbox
  					        checked={state.checkedF}
  					        onChange={handleChange('checkedF')}
  					        value="checkedF"
  					        indeterminate
  					        inputProps={{
  					          'aria-label': 'indeterminate checkbox',
  					        }}
  					    />
  					    <Checkbox
  					        defaultChecked
  					        color="default"
  					        value="checkedG"
  					        inputProps={{
  					          'aria-label': 'checkbox with default color',
  					        }}
  					    />
  				    </div>
  				    <div labelName="Switch">
  					    <Switch
  					        checked={state.checkedA}
  					        onChange={handleChange('checkedA')}
  					        value="checkedA"
  					        inputProps={{ 'aria-label': 'secondary checkbox' }}
  					    />
  					    <Switch
  					        checked={state.checkedB}
  					        onChange={handleChange('checkedB')}
  					        value="checkedB"
  					        color="primary"
  					        inputProps={{ 'aria-label': 'primary checkbox' }}
  					    />
  					    <Switch value="checkedC" inputProps={{ 'aria-label': 'primary checkbox' }} />
  					    <Switch disabled value="checkedD" inputProps={{ 'aria-label': 'disabled checkbox' }} />
  					    <Switch disabled checked value="checkedE" inputProps={{ 'aria-label': 'primary checkbox' }} />
  					    <Switch
  					        defaultChecked
  					        value="checkedF"
  					        color="default"
  					        inputProps={{ 'aria-label': 'checkbox with default color' }}
  					    />
  				    </div> 
  				    <div labelName="RadioButtons">
  					    <Radio
  					        checked={selectedValue === 'a'}
  					        onChange={handleChangeR}
  					        value="a"
  					        name="radio-button-demo"
  					        inputProps={{ 'aria-label': 'A' }}
  					    />
  					    <Radio
  					        checked={selectedValue === 'b'}
  					        onChange={handleChangeR}
  					        value="b"
  					        name="radio-button-demo"
  					        inputProps={{ 'aria-label': 'B' }}
  					    />
  					    <GreenRadio
  					        checked={selectedValue === 'c'}
  					        onChange={handleChangeR}
  					        value="c"
  					        name="radio-button-demo"
  					        inputProps={{ 'aria-label': 'C' }}
  					    />
  					    <Radio
  					        checked={selectedValue === 'd'}
  					        onChange={handleChangeR}
  					        value="d"
  					        color="default"
  					        name="radio-button-demo"
  					        inputProps={{ 'aria-label': 'D' }}
  					    />
  					    <Radio
  					        checked={selectedValue === 'e'}
  					        onChange={handleChangeR}
  					        value="e"
  					        color="default"
  					        name="radio-button-demo"
  					        inputProps={{ 'aria-label': 'E' }}
  					        icon={<RadioButtonUncheckedIcon fontSize="small" />}
  					        checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
  					    />  
  				    </div>
  				    
  				    <form className={classes.container} noValidate autoComplete="off">
  				    	<div className="row">
  					    	<div className="col-md-4">
  							    <TextField
  							    	required
  							        id="name"
  							        label="Name"
  							        className={classes.textField}
  							        value={values.name}
  							        onChange={handleChangeP('name')}
  							        margin="normal"
  							        variant="outlined"
  							    />
  						    </div>
  						    <div className="col-md-4">
  							    <TextField
  							    	required
  							        id="email"
  							        label="Email Address"
  							        className={classes.textField}
  							        value={values.email}
  							        onChange={handleChangeP('email')}
  							        margin="normal"
  							        variant="outlined"
  							    />
  						    </div>
  						    <div className="col-md-4">
  							    <TextField
  							    	required
  							        id="password"
  							        className={classes.textField}
  							        variant="outlined"
  							        type={values.showPassword ? 'text' : 'password'}
  							        label="Password"
  							        margin="normal"
  							        value={values.password}
  							        onChange={handleChangeP('password')}
  							        InputProps={{
  							          endAdornment: (
  							            <InputAdornment position="end">
  							              <IconButton
  							                edge="end"
  							                aria-label="Toggle password visibility"
  							                onClick={handleClickShowPassword}
  							              >
  							                {values.showPassword ? <VisibilityOff /> : <Visibility />}
  							              </IconButton>
  							            </InputAdornment>
  							          ),
  							        }}
  							    />
  						    </div>
  						    <div className="col-md-4">
  							    <TextField
  							        id="number"
  							        label="Number"
  							        className={classes.textField}
  							        value={values.number}
  							        onChange={handleChange('number')}
  							        type="number"
  							        margin="normal"
  							        variant="outlined"
  							    />
  						    </div>
  						    <div className="col-md-4">
  							    <TextField
  							        select
  							        className={classes.textField}
  							        variant="outlined"
  							        label="Select Option"
  							        margin="normal"
  							        value={values.weightRange}
  							        onChange={handleChangeP('weightRange')}
  							    >
  							        {ranges.map(option => (
  							          <MenuItem key={option.value} value={option.value}>
  							            {option.label}
  							          </MenuItem>
  							        ))}
  							    </TextField>
  					    	</div>
  					    	<div className="col-md-4">
  					    		<FormControl variant="outlined" className={classes.textField} margin="normal">
  							        <InputLabel htmlFor="select-multiple-checkbox">Select Multiple Options</InputLabel>
  							        <Select
  							          multiple
  							          value={personName}
  							          onChange={handleChangeM}
  							          input={<Input id="select-multiple-checkbox" />}
  							          renderValue={selected => selected.join(', ')}
  							          MenuProps={MenuProps}
  							        >
  							          {names.map(name => (
  							            <MenuItem key={name} value={name}>
  							              <Checkbox checked={personName.indexOf(name) > -1} />
  							              <ListItemText primary={name} />
  							            </MenuItem>
  							          ))}
  							        </Select>
  							    </FormControl>
  					    	</div>
  					    	<div className="col-md-4">
  					    		<FormControl variant="outlined" className={classes.textField} margin="normal">
  							        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
  							          Age
  							        </InputLabel>
  							        <Select
  							          native
  							          value={state.age}
  							          onChange={handleChangeS('age')}
  							          input={
  							            <OutlinedInput name="age" labelWidth={labelWidth} id="outlined-age-native-simple" />
  							          }
  							        >
  							          <option value="" />
  							          <option value={10}>Ten</option>
  							          <option value={20}>Twenty</option>
  							          <option value={30}>Thirty</option>
  							        </Select>
  						    	</FormControl>
  					    	</div>
  					    	<div className="col-md-4">
  					    		<TextField
  							        id="multiline-static"
  							        label="Multiline"
  							        multiline
  							        rows="1"
  							        defaultValue=""
  							        className={classes.textField}
  							        margin="normal"
  							        variant="outlined"
  							    />
  					    	</div>
  					    	<div className="col-md-4">
  					    		<TextField
  							        id="date"
  							        label="Select Birthday"
  							        type="date"
  							        defaultValue="2020-06-15"
  							        className={classes.textField}
  							        margin="normal"
  							        variant="outlined"
  							        InputLabelProps={{
  							          shrink: true,
  							        }}
  							    />
  					    	</div>
  					    	<div className="col-md-12">
  						    	<Button variant="contained" color="primary" className={classes.button}>
  							        Submit
  							    </Button>
  						    </div>
  					    </div>
  					</form>    
          </div>
      </div>

      <div className="card card-custom gutter-b col-md-12">
          <div className="card-header">
          	<div className="card-title">
          		<h3 className="card-label">Material Design Data Table</h3>
          	</div>
          	<div className="card-toolbar">
          		<div className="example-tools">
          			<span className="example-toggle " title="View code"></span>
          			<span className="example-copy "></span>
          		</div>
          	</div>
          </div>
          <div className="card-body">
          	<div>
				      <Paper className={classesT.paper}>
				        <EnhancedTableToolbar numSelected={selected.length} />
				        <div className={classesT.tableWrapper}>
				          <Table
				            className={classesT.table}
				            aria-labelledby="tableTitle"
				            size={dense ? 'small' : 'medium'}
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
				                      onClick={event => handleClickTable(event, row.name)}
				                      role="checkbox"
				                      aria-checked={isItemSelected}
				                      tabIndex={-1}
				                      key={row.name}
				                      selected={isItemSelected}
				                    >
				                      <TableCell padding="checkbox">
				                        <Checkbox
				                          checked={isItemSelected}
				                          inputProps={{ 'aria-labelledby': labelId }}
				                        />
				                      </TableCell>
				                      <TableCell component="th" id={labelId} scope="row" padding="none">
				                        {row.name}
				                      </TableCell>
				                      <TableCell align="right">{row.calories}</TableCell>
				                      <TableCell align="right">{row.fat}</TableCell>
				                      <TableCell align="right">{row.carbs}</TableCell>
				                      <TableCell align="right">
				                      	<a href="#"><i className="fa fa-edit text-info"></i></a>&nbsp;&nbsp;
				                      	<a href="#"><i className="fa fa-trash text-danger"></i></a>
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
            <br />
            <div>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">
                          <a href="#"><i className="fa fa-edit text-info"></i></a>&nbsp;&nbsp;
                          <a href="#" onClick={handleClickOpen}><i className="fa fa-trash text-danger"></i></a>
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
            </div>
          </div>
      </div>

      <div className="card card-custom gutter-b col-md-6">
          <div className="card-header">
          	<div className="card-title">
          		<h3 className="card-label">Alerts</h3>
          	</div>
          	<div className="card-toolbar">
          		<div className="example-tools">
          			<span className="example-toggle " title="View code"></span>
          			<span className="example-copy "></span>
          		</div>
          	</div>
          </div>
          <div className="card-body">
          	<div>
				      <Button variant="outlined" className={classesA2.margin} onClick={handleClickTostr}>
				        Open success snackbar
				      </Button>
				      <Snackbar
				        anchorOrigin={{
				          vertical: 'top',
				          horizontal: 'right',
				        }}
				        open={open}
				        autoHideDuration={5000}
				        onClose={handleCloseTostr}
				      >
				        <MySnackbarContentWrapper
				          onClose={handleCloseTostr}
				          variant="success"
				          message="This is a success message for Tostr!"
				        />
				      </Snackbar>
				      <Snackbar
				        anchorOrigin={{
				          vertical: 'bottom',
				          horizontal: 'right',
				        }}
				        open={open}
				        autoHideDuration={5000}
				        onClose={handleCloseTostr}
				      >
				        <MySnackbarContentWrapper
				          onClose={handleCloseTostr}
				          variant="error"
				          message="This is a Danger message for Tostr!"
				        />
				      </Snackbar>
				    </div>
			      <MySnackbarContentWrapper
			        variant="error"
			        className={classesA2.margin}
			        message="This is an error message!"
			      />
			      <MySnackbarContentWrapper
			        variant="warning"
			        className={classesA2.margin}
			        message="This is a warning message!"
			      />
			      <MySnackbarContentWrapper
			        variant="info"
			        className={classesA2.margin}
			        message="This is an information message!"
			      />
			      <MySnackbarContentWrapper
			        variant="success"
			        className={classesA2.margin}
			        message="This is a success message!"
			      />
            <br/>
            <div>
              <Chip color='primary' className="bg-light-success" label="Approve" />
              <Chip color='primary' className="bg-light-warning" label="Waiting" />
              <Chip color='primary' className="bg-light-info" label="Processing" />
              <Chip color='primary' className="bg-light-danger" label="Rejected" />
              <Chip color='primary' className="bg-success text-white" label="Approve" />
              <Chip color='primary' className="bg-warning text-white" label="Waiting" />
              <Chip color='primary' className="bg-info text-white" label="Processing" />
              <Chip color='primary' className="bg-danger text-white" label="Rejected" />
            </div>
            <br/>
            <div>
              <CircularProgress className={classes.progress} />
              <CircularProgress className={classes.progress} color="secondary" />
              <div className="blockUI" style={{display: "none"}}> <div className="processing"><span>Processing</span> <CircularProgress className={classes.progress} /></div></div>
            </div>
          </div>
      </div>

	        <div className="card card-custom gutter-b col-md-6">
	            <div className="card-header">
	            	<div className="card-title">
	            		<h3 className="card-label">Tabs</h3>
	            	</div>
	            	<div className="card-toolbar">
	            		<div className="example-tools">
	            			<span className="example-toggle " title="View code"></span>
	            			<span className="example-copy "></span>
	            		</div>
	            	</div>
	            </div>
	            <div className="card-body">
	            	<div className={classesTab.root}>
				      <AppBar position="static" color="default">
				        <Tabs
				          value={value}
				          onChange={handleChangeTab}
				          indicatorColor="primary"
				          textColor="primary"
				          variant="scrollable"
				          scrollButtons="auto"
				        >
				          <Tab label="Item One" />
				          <Tab label="Item Two" />
				          <Tab label="Item Three" />
				          <Tab label="Item Four" />
				          <Tab label="Item Five" />
				          <Tab label="Item Six" />
				          <Tab label="Item Seven" />
				        </Tabs>
				      </AppBar>
				      {value === 0 && <TabContainer><b>Item One </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				      {value === 1 && <TabContainer><b>Item Two </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				      {value === 2 && <TabContainer><b>Item Three </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				      {value === 3 && <TabContainer><b>Item Four </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				      {value === 4 && <TabContainer><b>Item Five </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				      {value === 5 && <TabContainer><b>Item Six </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				      {value === 6 && <TabContainer><b>Item Seven </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</TabContainer>}
				    </div>
				    <div>
			            <h5 className="mb-5">Recent Notifications</h5>

			            <div className="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
			            <span className="svg-icon svg-icon-warning mr-5">
			              <SVG
			                  src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
			                  className="svg-icon svg-icon-lg"
			              ></SVG>
			            </span>

			              <div className="d-flex flex-column flex-grow-1 mr-2">
			                <a
			                    href="#"
			                    className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
			                >
			                  Another purpose persuade
			                </a>
			                <span className="text-muted font-size-sm">Due in 2 Days</span>
			              </div>

			              <span className="font-weight-bolder text-warning py-1 font-size-lg">
			              +28%
			            </span>
			            </div>

			            <div className="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
			            <span className="svg-icon svg-icon-success mr-5">
			              <SVG
			                  src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
			                  className="svg-icon svg-icon-lg"
			              ></SVG>
			            </span>
			              <div className="d-flex flex-column flex-grow-1 mr-2">
			                <a
			                    href="#"
			                    className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
			                >
			                  Would be to people
			                </a>
			                <span className="text-muted font-size-sm">Due in 2 Days</span>
			              </div>

			              <span className="font-weight-bolder text-success py-1 font-size-lg">
			              +50%
			            </span>
			            </div>

			            <div className="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
			            <span className="svg-icon svg-icon-danger mr-5">
			              <SVG
			                  src={toAbsoluteUrl(
			                      "/media/svg/icons/Communication/Group-chat.svg"
			                  )}
			                  className="svg-icon svg-icon-lg"
			              ></SVG>
			            </span>
			              <div className="d-flex flex-column flex-grow-1 mr-2">
			                <a
			                    href="#"
			                    className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
			                >
			                  Purpose would be to persuade
			                </a>
			                <span className="text-muted font-size-sm">Due in 2 Days</span>
			              </div>

			              <span className="font-weight-bolder text-danger py-1 font-size-lg">
			              -27%
			            </span>
			            </div>

			            <div className="d-flex align-items-center bg-light-info rounded p-5">
			            <span className="svg-icon svg-icon-info mr-5">
			              <SVG
			                  src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
			                  className="svg-icon svg-icon-lg"
			              ></SVG>
			            </span>

			              <div className="d-flex flex-column flex-grow-1 mr-2">
			                <a
			                    href="#"
			                    className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
			                >
			                  The best product
			                </a>
			                <span className="text-muted font-size-sm">Due in 2 Days</span>
			              </div>

			              <span className="font-weight-bolder text-info py-1 font-size-lg">
			              +8%
			            </span>
			            </div>
			        </div>
	            </div>
	        </div>
        </div>

    </>);
}


