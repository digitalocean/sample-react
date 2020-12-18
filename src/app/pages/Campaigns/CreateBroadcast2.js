import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory } from "react-router-dom";


export function CreateBroadcast() {

	const history = useHistory();

	function goBack() {
      history.goBack();
    }

	const  useThis = (e) => {
		var id = e.target.dataset.user;
	    history.push({
		  	pathname: '/campaigns/new/',
		  	state: {
		  		id: id,
		  	}
		});
		console.log(id);
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

			<div className="col-md-2">
				<div className="cbBlk blank">
					<div className="blankImage"><i className="flaticon2-browser-2"></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="0" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			{[...Array(10)].map((x, i) =>
			    <div className="col-md-2">
					<div className="cbBlk">
						<img src={toAbsoluteUrl("/media/template/"+i+".jpg")} className="" />
						<div className="cbMenuBlk">
							<button className="btn btn-primary" data-user={i} onClick={useThis}>Use This</button>
						</div>
					</div>
				</div>
			)}
			

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/1.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="1" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/2.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="2" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/3.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="3" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/4.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="4" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/5.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="5" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/6.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="6" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/7.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="7" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/8.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/9.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/10.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/11.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/12.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/13.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/14.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/15.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/16.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/17.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk obj-fit">
					<img src={toAbsoluteUrl("/media/template/18.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/19.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/20.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/21.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/22.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/23.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/24.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/25.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/26.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/27.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/28.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-2">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/29.jpg")} className="" />
					<div className="cbMenuBlk">
						<button className="btn btn-primary">Use This</button>
					</div>
				</div>
			</div>

		</div>
	</>);

}