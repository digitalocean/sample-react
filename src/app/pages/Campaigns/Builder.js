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

function Builder(props) {

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

  

  function goBack() {
    history.goBack();
  }
  const [values, setValues] = React.useState({
      label: "",
      subject: ""
  });

  const [state, setState] = React.useState({
    label: "",
    subject: "",
    items:[],
    loader:true,
    time5: true
  });

  useEffect( ()=>{
    //console.log(globalState.template_modules)
    setdata(globalState.template_modules)
  });
  
  useEffect(()=> {
    props.getTemplateModule(location.state.id)
    setTimeout(function(){
      setState({...state, time5:false, loader:false});
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
    var b_html = "<html><head><title></title><style>"+`${css}`+"</style></head><body>"+`${html}</body></html>`;
    var b_name = values.label;
    var b_subject = state.subject;
    var b_text = html.replace(/<[^>]+>/g, '');
    var user_id = user.id;
    //console.log(b_html , "----------------"+user_id,"----------------"+b_name, "----------------"+b_subject, "----------------"+b_text)

    if(b_name == "") {
      toast.error("Please Enter Campaign Name.", {position: "top-right",autoClose: 2000});
    } else if (b_subject = "") {
      toast.error("Please Enter Email Subject.", {position: "top-right",autoClose: 2000});
    } else if (html == "<span></span>") {
      toast.error("Please Add Template Block in Editor", {position: "top-right",autoClose: 2000});
    } else {
      setState({...state, loader:true});
      props.addCampaign({
				user_id:user.id,
				name: b_name,
				subject: state.subject,
				content_html: cryptr.encrypt(b_html),
        content_text: cryptr.encrypt(b_text),
        tid:location.state.id,
        is_campaign_builder:1
      });
      setTimeout(function(){
        setState({...state, loader:false});
        toast.success("Campaign has been saved", {position: "bottom-center",autoClose: 2000});
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
              <FormattedMessage id="PAGE.BUILDER.DESC" />
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
                    name="label"
                    type="text"
                    label="Broadcast Name"
                    variant="outlined"
                    className={`form-control h-auto py-0 px-0`}
                    onChange={handleChange("label")}
                    value={values.label}
                />
                <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                  Broadcast Name Helping Text
                </p>
              </div>
              <div className="col-md-6">
                <TextField
                    name="subject"
                    type="text"
                    label="Email Subject"
                    variant="outlined"
                    className={`form-control h-auto py-0 px-0`}
                    onChange={handleChange("subject")}
                    value={values.subject}
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

export default connect(null, credux.actions)(Builder);