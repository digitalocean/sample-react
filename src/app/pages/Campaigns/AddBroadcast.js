import React, { Component, useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from "react-router-dom";
 //import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import CustomVariables from '../Component/CustomVariables';
import swal from 'sweetalert';

import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CKEditor from 'ckeditor4-react';
import {API_URL} from "../../Constants";
// import ckeditor from "@ckeditor/ckeditor5-react";
import {connect,useSelector,useDispatch} from 'react-redux';
import * as credux from './_redux/campRedux';
import BlockUI from '../Component/BlockUI';


const initialValues = {
  name: "",
  subject: ""
};

function AddBroadcast(props) {

	const Cryptr = require('cryptr');
	const cryptr = new Cryptr('qrbuzz786');
	//const cryptr = new Cryptr('myTotalySecretKey');
	
	//const encryptedString = cryptr.encrypt('bacon');
	//console.log(encryptedString);

//var data = `<p>Data</p>`;
var data1 = `<p>Data1 gdfgd f dfg dfgfd </p>`;
var data4 = `<p>Data4</p>`;

	const [values, setValues] = React.useState({
	    name: '',
	    subject: ""
	});

	const [state, setState] = React.useState({
		name: '',
		subject:'',
  		value: '',
    	copied: false,
	    checkedA: true,
		loading:true,
		ckEditorData: "<p></p>"
	});

	var [ckData,setCkData] =  React.useState("");

	

	const [loading, setLoading] = useState(false);

  	const BroadcastSchema = Yup.object().shape({
    	//name: Yup.string()
	      	//.required("Enter a broadcast name"),
    	//subject: Yup.string()
	      	//.required("Enter a broadcast subject"),
	});

	const enableLoading = () => {
    	setLoading(true);
	};

	  const disableLoading = () => {
	    setLoading(false);
	};

	const getInputClasses = (fieldname) => {
	    if (formik.touched[fieldname] && formik.errors[fieldname]) {
	      return "is-invalid";
	    }

	    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
	      return "is-valid";
	    }

	    return "";
	};

	const history = useHistory();
	const location = useLocation();
	function cancelCampaigns() {
	    history.goBack();
	}

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

  	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);

  	const [open, setOpen] = React.useState(false);

	function handleShowT() {
	    setOpen(true);
	  }

	  function handleCloseT(event, reason) {
	    if (reason === 'clickaway') {
	      return;
	    }

	    setOpen(false);
	}

	function ckdataclick() {
		var dv = state.ckEditorData;
		var dv2 = dv.replace(/(\r\n|\n|\r)/gm, "");
		var dv3 = dv2.replace(/<[^>]*>?/gm, '');
		var dhtml = dv3.trim();		
		
		//console.log(dv2);
		setState({...state, textbody: dhtml});
		toast.success("Content successfully copied!", {position: "top-right",autoClose: 1500});  

	}

	const handleChange = name => event => {
	    setState({ ...state, [name]: event.target.value, });
      setValues({ ...values, [name]: event.target.value });
	};

	function goBack() {
	    history.goBack();
	}

	const tid = location.state.id;

	const globalState  = useSelector(state=>state.campaigns)
	const {user} = useSelector(state => state.auth);
	const [html, setHtml] = useState('');
	const [text, setText] = useState([]);

	useEffect( ()=>{
		//console.log(globalState.template_full)
		//setHtml(globalState.template_full)
	});
	
	useEffect(()=> {
		//props.getFullTemplate(location.state.id)
		if(location.state.id ==0){
			setState({...state, loading:false})
		} else {
			let mounted = true;
			var tempID = {name:location.state.id};
			fetch(API_URL + 'api/templates/getTemplate' , {
				method: "POST",
				headers:{
					"Content-Type":"application/json"
				},
				body: JSON.stringify(tempID)
			}).then(r => r.json().then(data => {
				//console.log(data.template)
				if(mounted){
					try {
						//setCkData(data.template);
						setState({...state, ckEditorData: data.template, loading:false})
					} catch (error) {
						
					}
				
				}
			} ))
			.catch(e => e);
			return () =>  mounted = false;
		}
			
	},[])

	var setEditorDefaultData = (editor) => {
	
	}


	const formik = useFormik({
    	initialValues,
    	validationSchema: BroadcastSchema,
    	onSubmit: (values, { setSubmitting }) => {
			//setStatus("Campaign created successfully");
			//console.log(cryptr.encrypt(state.ckEditorData))
			setState({...state, loading:true});
			
			props.addCampaign({
				user_id:user.id,
				name: state.name,
				subject: state.subject,
				content_html: cryptr.encrypt(state.ckEditorData),
				content_text: cryptr.encrypt(state.textbody),
				tid:location.state.id,
				is_campaign_builder:0
			});
    		// console.log(`
    		// 	Campaign Name: ${values.name}. 
    		// 	Subject: ${values.subject}. 
    		// 	Email Data: ${cryptr.encrypt(state.ckEditorData)}
    		// 	Email Text: ${cryptr.encrypt(state.textbody)}. 
    		// `);
    		setTimeout(() => {
		      	swal({
					  title: "Business Added",
					  text: "Business saved successfully!",
					  icon: "success",
					  button: null,
					  timer: 1500
				});
				setState({...state, loading:false});
				setTimeout(() => {
					history.push("/campaigns/all");
				}, 1500);
			}, 1000);
	    },
	});

var	onEditorChange = ( evt )=> {
	   //console.log(evt.editor.getData());
	   setState({...state, ckEditorData: evt.editor.getData()})
    }

	return (<>
		<div className="row">
			{
				state.loading ? 
				<BlockUI />
				:<></>
			}
    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.ADDBROADCAST.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
                  	</span>
				</div>
			</div>
	
			<div className="card card-custom gutter-b col-md-12 innerBlks">
				<div className="card-header">
					<div className="card-title"><h3 className="card-label"><FormattedMessage id="PAGE.ADDBROADCAST.DETAIL" /></h3></div>
				</div>
		        <div className="card-body">

		        	<form 
		        		autoComplete="off"
				        onSubmit={formik.handleSubmit}
				        className="ffield2 form fv-plugins-bootstrap fv-plugins-framework"
		        	>
		        		{formik.status ? (
				          <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
				            <div className="alert-text font-weight-bold">{formik.status}</div>
				          </div>
				        ) : (
				          <div>
				          </div>
				        )}
		        		
		                <div className="row ">
			                <div className="col-md-10 offset-md-1 row p-0">
		                		<div className="col-md-6">
		                			<TextField
				                        name="name"
				                        type="text"
				                        label="Broadcast Name"
				                        variant="outlined"
	        							className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "name"
							            )}`}
				                        value={values.name}
										onChange={handleChange("name")}
				                    />
				                    {formik.touched.name && formik.errors.name ? (
							            <div className="fv-plugins-message-container">
							              <div name="fv-help-block">{formik.errors.name}</div>
							            </div>
							          ) : null}
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
	        							className={`form-control h-auto py-0 px-0  ${getInputClasses(
							              "subject"
							            )}`}
										onChange={handleChange("subject")}
										value={values.subject}
				                    />
				                    {formik.touched.subject && formik.errors.subject ? (
							            <div className="fv-plugins-message-container">
							              <div className="fv-help-block">{formik.errors.subject}</div>
							            </div>
							          ) : null}
							        <p className="MuiFormHelperText-root MuiFormHelperText-contained">
				                    	Email Subject Helping Text
				                    </p>
		                		</div>
			                </div>    
		                </div>
		                <div className="row ckeditorBlk">
			                <div className="col-md-10 offset-md-1">
			                    
								
								<CKEditor
									id="ckeditor"
				                    editor={ CKEditor }
				                    toolbar={ [ 'Bold' ] }
									data={state.ckEditorData}
									name="editor"
									onChange={onEditorChange} 
									//data="<p>1<br />2<br />3</p>"
									//content={state.ckEditorData}
									// onLoad={ () => console.log('editor init')}
									onInit={ editor => {
										setEditorDefaultData(editor)
										
				                        // You can store the "editor" and use when it is needed.
				                        console.log(editor);
				                    }}
									config={{
										ckfinder:{uploadUrl: "./public/uploads"},
											extraPlugins: "uploadimage",
											filebrowserUploadMethod: "form",
											filebrowserUploadUrl :("https://app.qrbuzz.mumara.com/filemanager/files"),
										    filebrowserBrowseUrl : ("https://qrbuzz.mumara.com/file-manager"),
											extraAllowedContent: 'div(*) style b i table img',
											//  enterMode: CKEditor.ENTER_BR,
											allowedContent: true,
										 	fullPage: true,
											//  exclude: [
											// 	/\.(js|mjs|jsx|ts|tsx)$/,
											// 	/\.html$/,
											// 	/\.json$/,
											// 	/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
											// 	/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
											// ],

										options: {
											name: 'static/media/[name].[hash:8].[ext]',
										}
									}}
								    
				                />


			                </div>    
		                </div>
		                <div className="row dropsowns hide">
			                <div className="col-md-6 offset-md-1">
			                	<CustomVariables />
			                </div>
			            </div>
			            <div className="row">
			                <div className="col-md-10 offset-md-1 textarea">
			                	<button type="button" onClick={ckdataclick} className="btn btn-icon btn-light btn-hover-primary btn-sm btn-copy">
                                  <span className="svg-icon svg-icon-md svg-icon-primary">
                                    <svg className="octicon octicon-clippy" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>
                                  </span>
                            	</button>
			                	<TextField
  							        id="textbody"
  							        placeholder="Text Version of the Email"
  							        rows="10"
  							        multiline
  							        name="textbody"
  							        variant="outlined"
        							className={`form-control h-auto py-0 px-0  ${getInputClasses(
						              "textbody"
						            )}`}
  							        value={state.textbody}
  							        onChange={handleChange("textbody")}
  							     />
  							    {formik.touched.textbody && formik.errors.textbody ? (
						            <div className="fv-plugins-message-container">
						              <div name="fv-help-block">{formik.errors.textbody}</div>
						            </div>
						          ) : null}
						        <p className="MuiFormHelperText-root MuiFormHelperText-contained">
			                    	Text Version of the Email Helping Text
			                    </p>
			                </div>
			            </div>
		                <div className="row">
							<div className="col-md-10 offset-md-1 class-submit">
	  					    	<Button 
						            type="submit"
						            //disabled={formik.isSubmitting}
	  					    		variant="contained" 
	  					    		color="primary" 
	  					    		className={classes.button}
	  					    	>
		  					        Save 
		  					        {loading && <span className="ml-3 spinner spinner-white"></span>}
		  					    </Button>
		  					    <Button variant="contained" className={classes.button} onClick={cancelCampaigns}>
		  					        Cancel
		  					    </Button>
	  					    </div>
		                </div>				          		
				    </form>
				     <ToastContainer />
		        </div>
		    </div>   

		</div>
	</>);

}

export default connect(null, credux.actions)(AddBroadcast);