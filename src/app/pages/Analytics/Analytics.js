import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";


export function Analytics() {

	return (<>
		<div className="row">

    		<div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
				<div className="alert-text">
					<span className="svg-icon menu-icon">
                    	<SVG src={toAbsoluteUrl("/media/svg/icons/Communication/chart.svg")}/>
                  	</span> 
					<span>
						View Analytics Description
					</span>
				</div>
			</div>

		</div>
	</>);

}