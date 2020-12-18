import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, branch, verified, status, created_on) {
  return { name, branch, verified, status, created_on };
}

const rows = [
  createData('Khaadi', 25, 'fa fa-check-square text-success', 'Active', 'August 15, 2020'),
  createData('Sapphire', 12, 'fa fa-window-close text-danger', 'Disabled', 'August 12, 2020'),
  createData('Bonanza', 0, 'fa fa-exclamation-triangle text-warning', 'Inactive', 'August 04, 2020'),
];

export function BusinessSM() {

	const classes = useStyles();

	const history = useHistory();
	function branches() {
	    history.push("/business/branches");
	}
	function addbusiness() {
	    history.push("/business/add");
	}
	function addbranches() {
	    history.push("/business/branch/add");
	}
	function businessdetail() {
	    history.push("/business/view");
	}
	function goBack() {
	    history.goBack();
	}

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.BUSINESS.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			    	</span>
				</div>
			</div>

			<div className="card card-custom gutter-b col-md-12">
		        <div className="card-body">

		        	<div className="toolbar">
		        		<div className="form-group">
							<Button variant="contained" color="primary" className={classes.button} onClick={addbusiness}>
						        Add a Business 
						    </Button>
				        	<Button variant="contained" color="secondary" className={classes.button} onClick={addbranches}>
						        Add a Branch
						    </Button>
		        		</div>
		        	</div>
		        	

				    <div className={classes.root}>
						<TableContainer component={Paper}>
						    <Table className={classes.table} aria-label="simple table">
						        <TableHead>
						          <TableRow>
						            <TableCell>Business Name</TableCell>
						            <TableCell>Branches</TableCell>
						            <TableCell>Verified</TableCell>
						            <TableCell>Status</TableCell>
						            <TableCell>Created On</TableCell>
						          </TableRow>
						        </TableHead>
						        <TableBody>
						          {rows.map((row) => (
						            <TableRow key={row.name}>
						              <TableCell component="th" scope="row">
						                <a href="#" onClick={businessdetail} title={row.name}>{row.name}</a>
						              </TableCell>
						              <TableCell align="right"><a href="#" onClick={branches} title={row.name}>{row.branch}</a></TableCell>
						              <TableCell align="right"><i className={row.verified}></i></TableCell>
						              <TableCell align="right">{row.status}</TableCell>
						              <TableCell align="right">{row.created_on}</TableCell>
						            </TableRow>
						          ))}
						        </TableBody>
						    </Table>
						</TableContainer>
					</div>
				</div>		
			</div>

		</div>
	</>);

}