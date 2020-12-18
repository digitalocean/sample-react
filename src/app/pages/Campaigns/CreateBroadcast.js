import React, {useState} from "react";
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
		  	pathname: '/campaigns/editor/',
		  	state: {
		  		id: id,
		  	}
		});
		console.log(id);
	}

	const [state, setState] = useState({
		className: 'hide',
		popimg: '1.jpg'
	});

	const showImage = (e) => {
		var img = e.target.dataset.image + '.jpg';

		setState({className: 'show',popimg: img});
		
	}

	const blankEditor =(e)=> {
		var id = e.target.dataset.user;
	    history.push({
		  	pathname: '/campaigns/html/',
		  	state: {
		  		id: id,
		  	}
		});
		console.log(id);
	}

	const closePopup = () => {
		setState({...state,className: 'hide'});
	}

	return (<>
		<div className="row">

			<div className="col-md-12">
				<div className="">
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
				</div>
			</div>

			<div className={`popupImgBlk `+ state.popimg + ' ' + state.className}>
				<div className="flaticon2-cross text-link" onClick={closePopup}></div>
				<div className="pic">
					<img src={`/media/template/`+state.popimg}  />
				</div>
			</div>
		    		

			<div className="col-md-3">
				<div className="cbBlk blank">
					<div className="blankImage"><i className="flaticon2-browser-2"></i></div>
					<div className="viewImage"></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="0" onClick={blankEditor}>Blank Template</button>
					</div>
				</div>
			</div>			

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/1.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="1" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Catalog" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/2.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="2" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Invoice" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/3.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="3" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-01" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/4.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="4" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-02" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/5.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="5" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-03" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/6.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="6" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-04" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/7.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="7" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-05" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/8.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="8" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-06" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/9.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="9" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-07" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/10.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="10" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-08" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/11.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="11" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-09" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/12.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="12" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-10" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/13.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="13" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-11" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/14.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="14" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-12" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/15.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="15" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-13" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/16.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="16" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-14" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/17.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="17" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Main-15" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk obj-fit">
					<img src={toAbsoluteUrl("/media/template/18.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="18" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-1" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/19.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="19" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-2" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/20.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="20" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-3" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/21.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="21" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-4" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/22.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="22" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-5" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/23.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="23" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-6" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/24.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="24" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-7" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/25.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="25" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Notification-8" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

			<div className="col-md-3">
				<div className="cbBlk">
					<img src={toAbsoluteUrl("/media/template/26.jpg")} className="" />
					<div className="viewImage"><i className="fas fa-search" data-image="26" onClick={showImage}></i></div>
					<div className="cbMenuBlk">
						<button className="btn btn-primary" data-user="Order-List" onClick={useThis}>Use This</button>
					</div>
				</div>
			</div>

		</div>
	</>);

}