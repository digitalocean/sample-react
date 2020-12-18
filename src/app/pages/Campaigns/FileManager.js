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
import { Modal } from "react-bootstrap";
import '../../../_metronic/_assets/css/FileManager.scss';

import ReactDOM from 'react-dom';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

function getUrlParam( paramName ) {
	
	var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' );
	var match = window.location.search.match( reParam );

	return ( match && match.length > 1 ) ? match[1] : null;
}

	
export default function fileManager() {

	document.body.className = 'filemanage';

	let user = JSON.parse(localStorage.getItem('persist:user-auth'));
	var user_id = JSON.parse(user.user).id;
	console.log(user_id)

	const apiOptions = {
		...connectorNodeV1.apiOptions,

		apiRoot: API_URL+ 'filemanager/' + user_id // Or you local Server Node V1 installation.
		}

	return (<>
		<div style={{ height: '480px' }}>
		<FileManager >
			<FileNavigator
			id="filemanager-1"
			api={connectorNodeV1.api}
			apiOptions={apiOptions}
			capabilities={connectorNodeV1.capabilities}
			listViewLayout={connectorNodeV1.listViewLayout}
			viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
			onResourceItemClick={
			({ event, number, rowData }) => console.log(event, number, rowData)
			}
			onResourceItemDoubleClick={
			({ event, number, rowData }) => 
			{
				console.log( rowData.name)
						var funcNum = getUrlParam( 'CKEditorFuncNum' );
				var fileUrl = API_URL+ 'filemanager/'+ user_id + "/" + rowData.name;
				window.opener.CKEDITOR.tools.callFunction( funcNum, fileUrl );
				window.close();
			}
			}
			/>
		</FileManager>
		</div>
	</>);

}
