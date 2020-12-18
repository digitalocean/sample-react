import React, { useState } from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";


export function GenerateQR() {

	const history = useHistory();
	function goBack() {
	    history.goBack();
	}

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Design/Substract.svg")}/>
                  	</span> 
					<span>
						<FormattedMessage id="PAGE.GENERATEQRCODELINK.DESC" />
					</span>
					<span className="svg-icon menu-icon goBack" onClick={goBack}>
						<i className="fa fa-long-arrow-alt-left"></i>
                  	</span>
				</div>
			</div>

		</div>
	</>);

}