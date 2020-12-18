import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import { values } from "lodash";

export class SheduleRepeater extends React.Component {

  constructor() {
    super();

    this.displayData = [];

    this.state = {
      showdata: this.displayData,
      index: 1,
      button: "show",
      button2: "hide",
      apData: "show",
      rows: [],
      rmv_btn: "",
      option: "",
      condition: "",
      gender: ""
    };
    
    this.values = {
      option: "",
      condition: "",
      gender: ""
    };

    this.appendData = this.appendData.bind(this);
  }

  option = [
		{
		value: 'gender',
		label: 'Gender',
		}
  ];
  
  condition = [
		{
      value: 'is',
      label: 'is',
    },
    {
      value: 'isnot',
      label: 'is not',
      }
	];

  gender = [
		{
		value: 'male',
		label: 'Male',
		},
		{
		value: 'female',
		label: 'Female',
		}
  ];

  appendData() {
    this.displayData.push(
        <div key={this.state.index} id={`display-data` + this.state.index} className={`fieldBlk shdlCmp-filters ` + this.state.apData}>
            <div className="row"  id={`row` + this.state.index}>
                <div className="col-md-4">
                    <TextField
                        select
                        name="option"
                        variant="outlined"
                        label="Select Option"
                        className={`form-control h-auto py-0 px-0 `}
                    >
                        {this.option.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                    <p className="MuiFormHelperText-root MuiFormHelperText-contained mb-0">
                        Select Option 
                    </p>
                </div>
                <div className="col-md-3">
                    <TextField
                        select
                        name="condition"
                        variant="outlined"
                        label="Condition"
                        className={`form-control h-auto py-0 px-0`}
                    >
                        {this.condition.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                    <p className="MuiFormHelperText-root MuiFormHelperText-contained mb-0">
                        Condition 
                    </p>
                </div>
                <div className="col-md-3">
                    <TextField
                        select
                        name="gender"
                        variant="outlined"
                        label="Select Gender"
                        className={`form-control h-auto py-0 px-0`}
                    >
                        {this.gender.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                    <p className="MuiFormHelperText-root MuiFormHelperText-contained mb-0">
                        Select Gender 
                    </p>
                </div>
                <div className="col-md-2 btn-repeater-section">
                  <button type="button" onClick={this.removeRow} data-row={this.state.index} variant="contained" className="btn btn-danger btn-sm">-</button>
                  <button type="button" onClick={this.appendData} data-row={this.state.index} variant="contained" className="btn btn-primary btn-sm float-right">+</button>
                </div>
            </div>
        </div>
      
    );
    this.setState({
      showdata: this.displayData,
      button: "hide",
      button2: "show"
    });
    this.setState({ index: this.state.index + 1 });
    console.log("row" + this.state.index);
  }
  removeRow = (e) => {
    var row = e.target.dataset.row;
    var rows = 'display-data'+row;
    var elem = document.getElementById(rows);
    elem.parentNode.removeChild(elem);
    //toast.error("Row has been romoved!", {position: "bottom-center",autoClose: 2000});
    var data = document.getElementById("display-data-Container").innerHTML;
    var count = data.length
    if(count < 2) {
      this.setState({
        rmv_btn:"",
        button2: "hide",
        button:"show"
      });
    } else{
      this.setState({
        rmv_btn:"",
        button2: "show",
        button:"hide"
      });
    }
  }

  trashData = (e) => {
    var btn = e.target.dataset.btnrm;
    console.log(btn);
    this.setState({
      rmv_btn:"",
      button2: "hide",
      button:"show"
    });
    document.getElementById("display-data-Container").innerHTML = " ";
  }

  render() {
    return (
      <div className="mb-10 clear">
        <div
          variant="contained"
          className={`text-success text-link font-weight-bolder text-hover-primary font-size-lg ` + this.state.button}
          onClick={this.appendData}
          title="Click here to Add Filter"
        >
          <i className="flaticon2-plus text-success text-link font-weight-bolder text-hover-primary"></i> &nbsp;
          Add Filter
        </div>
        <div
          variant="contained"
          className={`text-dark-75 text-link font-weight-bolder font-size-lg ` + this.state.button2 + ` `  +this.state.rmv_btn}
          onClick={this.trashData}
          data-btnrm={this.state.button2}
          title="Click here to Add Filter"
        >
          <i className="flaticon2-cross text-dark-75 text-link font-weight-bolder"></i> &nbsp;
          Remove Filter
        </div>
        <div id="display-data-Container">{this.displayData}</div>
        <ToastContainer />	
      </div>
    );
  }
}

