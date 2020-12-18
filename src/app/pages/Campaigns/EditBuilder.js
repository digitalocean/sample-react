import React, { Component, useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import GEditor from 'grapesjs-react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import BlockUI from '../Component/BlockUI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../_metronic/_assets/css/Builder.scss';
//import CustomVariables from '../Component/CustomVariables';
import {API_URL} from "../../Constants";
import {connect,useSelector,useDispatch} from 'react-redux';
import * as credux from './_redux/campRedux';
import TextField from '@material-ui/core/TextField';
var editor_ref;

function EditBuilder(props) {

  const Cryptr = require('cryptr');
  const cryptr = new Cryptr('qrbuzz786');

  const history = useHistory();
  const location = useLocation();
  var empty = `<span></span>`
  var content = `<p>Content 1</p>`
  var content2 = `<p>Content 2</p>`
  
  const globalState  = useSelector(state=>state.campaigns)
  const {user} = useSelector(state => state.auth);
  const [all_modules, setdata] = useState([]);
  const [broadcast, setBroadcast] = useState([]);

  function goBack() {
    history.goBack();
  }
  const [values, setValues] = React.useState({
      label: broadcast.name ? broadcast.name : "",
      subject: broadcast.subject ? broadcast.subject : ""
  });

  const [state, setState] = React.useState({
    label: broadcast.name ? broadcast.name : "",
    subject: broadcast.subject ? broadcast.subject : "",
    items:[],
    loader:true,
    time5: true
  });
  
  useEffect( ()=>{
    //console.log(globalState.campaign_data)
    setBroadcast(globalState.campaign_data)
    setdata(globalState.template_modules)
  });
  
  useEffect(()=> {
    props.getTemplateModule(location.state.tid)
    props.getCampaignData(location.state.id)
    setTimeout(function(){
        setState({...state, time5:false});
    },1500);
    setTimeout(function(){
          setState({...state, loader:false});
    },3000);
  },[])

  const handleChange = name => event => {
      setState({ ...state, [name]: event.target.value, });
      setValues({ ...values, [name]: event.target.value });
  };

  const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
  }));
  const classes = useStyles();

  var updateBlocks = (editor,manager)=>  {
    editor_ref = editor
    var tempId =  location.state.id;
    if(state.time5 == true) {
        editor.setComponents(empty);
    }
    if(broadcast.content_html) {
        editor.setComponents(cryptr.decrypt(broadcast.content_html));
    }
    var blockManager = manager
    var blocksV = manager.getAll()

    const filtered = blocksV.filter(block => block.get('category') == '')
    var ids = filtered.map((item)=>item.attributes.id)
  
    // const bm = manager;

    blockManager.render([
      ids.forEach(element => {
        blockManager.get(element).set("category", "Block")
      })
    ])

    blockManager.getCategories().each(ctg => ctg.set('open', false))

    all_modules.map((option, index) => {
      blockManager.add(index, {
        label: `<label key={index}>${option.name}</label><img key={index} src="${option.thumbnail}"> `,
        content:option.html,
        category: { id:1,label:"Template",order:2,open: true},
        attributes: {
          title: option.name,
          class: "grapesjs-modules",
        }
      });
    });
  }
  
  const SaveEditor = () => {
    var html = editor_ref.getHtml();
    var css = editor_ref.getCss();
    var b_html = "<style>"+`${css}`+"</style>"+`${html}`;
    var b_name = broadcast.name;
    var b_subject = broadcast.subject;
    var b_text = html.replace(/<[^>]+>/g, '');
    //console.log(location.state.id, "----------------"+b_html ,"----------------"+b_name, "----------------"+b_subject, "----------------"+b_text)
    if (html == "<span></span>") {
      toast.error("Please Add Template Block in Editor", {position: "top-right",autoClose: 2000});
    } else {
      setState({...state, loader:true});
      props.updateCampaign({
				id:location.state.id,
				name: b_name,
				subject: b_subject,
				content_html: cryptr.encrypt(b_html),
                content_text: cryptr.encrypt(b_text)
      });
      setTimeout(function(){
        toast.success("Campaign has been saved", {position: "bottom-center",autoClose: 2000});
        setState({...state, loader:false});
        history.push("/campaigns/all");
      },2500);
    } 
  }
  
  return (<>
    <div className="row page-builder">

      <div className="col-md-12">
        <div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
          <div className="alert-text">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
            </span> 
            <span>
              <FormattedMessage id="PAGE.EDITBUILDER.DESC" />
            </span>
            <span className="svg-icon menu-icon goBack" onClick={goBack}>
              <i className="fa fa-long-arrow-alt-left"></i>
            </span>
          </div>
        </div>
      </div>
          
      <div className="col-md-12">
        <div className="bldrButtonBlk">
          <Button variant="contained" className={classes.button} onClick={goBack}>Cancel</Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={SaveEditor}>Save</Button>
          {/* <CustomVariables /> */}
        </div>
        <div className="card card-custom gutter-b col-md-12 innerBlks">
          <div className="card-body">
            <div className="row ">
              <div className="col-md-6">
                <TextField
                    disabled
                    name="label"
                    type="text"
                    label="Broadcast Name"
                    variant="outlined"
                    className={`form-control h-auto py-0 px-0`}
                    onChange={handleChange("label")}
                    value={broadcast.name ? broadcast.name: ""}
                />
                <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                  Broadcast Name Helping Text
                </p>
              </div>
              <div className="col-md-6">
                <TextField
                    disabled
                    name="subject"
                    type="text"
                    label="Email Subject"
                    variant="outlined"
                    className={`form-control h-auto py-0 px-0`}
                    onChange={handleChange("subject")}
                    value={broadcast.subject ? broadcast.subject: ""}
                />
                <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                  Email Subject Helping Text
                </p>
              </div>
            </div>
          </div>
        </div>
        <GEditor id="gjs" onInit={editor=>updateBlocks(editor,editor.BlockManager)} presetType="newsletter" />
        <div className="bldrButtonBlk">
          <Button variant="contained" className={classes.button} onClick={goBack}>Cancel</Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={SaveEditor}>Save</Button>
        </div>
      </div>

      {
        state.loader == true?
        <BlockUI />
        : <div> </div>
      } 
      <ToastContainer />
    </div>
  </>);

}

export default connect(null, credux.actions)(EditBuilder);