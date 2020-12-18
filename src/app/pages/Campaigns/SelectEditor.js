import React, { useState } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory, useLocation } from "react-router-dom";

export function SelectEditor() {

	const history = useHistory();
	const location = useLocation();

	function goBack() {
      history.goBack();
    }

    const [state, setState] = React.useState({
	    id: 0,
	});


    const  useHtml = (e) => {
    	var id = location.state.id;
	    history.push({
		  	pathname: '/campaigns/html/',
		  	state: {
		  		id: id
		  	}
		});
	}

    const  useBuilder = (e) => {
    	var id = location.state.id;
	    history.push({
		  	pathname: '/campaigns/builder/',
		  	state: {
		  		id: id
		  	}
		});
	}

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.CREATEBROADCAST.DESC" />
					</span>
			        <span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
			        </span>
				</div>
			</div>

			<div className="card col-md-12">
				<span className="line-vertical"></span>
				<div className="card-body">
					<div className="row">
						<div className="col-md-6">
							<div className="slEditorBlk first">
								<div className="edtImgBlk">
									<img src={toAbsoluteUrl("/media/images/editor.jpg")} />
								</div>
								<div className="slEditorCont">
									<h2>Editor</h2>
									<h1>HTML Editor</h1>
									<button type="button" className="btn btn-primary" onClick={useHtml}>Use HTML Editor</button>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="slEditorBlk last">
								<div className="edtImgBlk">
									<img src={toAbsoluteUrl("/media/images/builder.jpg")} />
								</div>
								<div className="slEditorCont">
									<h2>Builder</h2>
									<h1>Drag & Drop Builder</h1>
									<button type="button" className="btn btn-success" onClick={useBuilder}>Use Builder</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>);

}