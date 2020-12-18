import React, { useEffect, useState } from "react";
import templates from "../Component/templates.json";
import Button from '@material-ui/core/Button';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

import {
	BrowserRouter,  
	Switch,  
	Route,  
	Link,
	useHistory, 
	useLocation
} from "react-router-dom";

export function TemplateView() {

	const history = useHistory();
	const location = useLocation();

	function viewBroadcast() {
	    history.push("/campaigns/all");
	}
	function myTemplates() {
	    history.push("/campaigns/my-templates");
	}
	function importTemplate() {
	    history.push("/campaigns/my-templates");
	}
	function useTemplate() {
	    history.push("/campaigns/editor/");
	}

	var pageURL = window.location.href;
	var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

	const [state, setState] = React.useState({
	      items: [],
	      data: {}
	});

	const [used, setUsed] = useState(184);

	useEffect(() => {
		var data = templates.find((item) => item.id == lastURLSegment);
  		setState({items: templates, data});
	}, []);

	function viewTemplates() {
		history.goBack();
	}

	return (<>
		<div className="row">

			<div id="item-headline-section-wrapper">
				<div id="item-headline-section">
					<h2 className="font-light text-capitalize">{state.data.title} - {state.data.element}</h2>
					<ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2">
						<li className="breadcrumb-item"><a href="/dashboard"><i className="flaticon2-shelter text-muted icon-1x"></i></a></li>
						<li className="breadcrumb-item"><a className="text-muted" href="/campaigns">Campaigns</a></li>
						<li className="breadcrumb-item"><a className="text-muted" href="/campaigns/template/">Templates</a></li>
					</ul>
				</div>
			</div>

			<div className="col-md-9">
				<div  id="item-contents">
					<div className="item-image-section">
						<img src={`/media/template/`+state.data.image} className="nodrag image-thumbnail" />
					</div>
					
					<div className="template-content">
						Banners are perfect to break a long streak of columns or paragraphs. It gives a bit of visual flair, but also to provide valuable information.
						{used > 0 &&
							<div className="using-template">
								<i className="fa fa-star"></i> 
								<i className="fa fa-star"></i> 
								<i className="fa fa-star"></i> 
								<i className="fa fa-star"></i> 
								<i className="fa fa-star"></i> &nbsp;
								{used} marchants using this template
							</div>
						}
					</div>
					<div className="related-templates">
						<h5 className="related-templates-title">Related Templates</h5>
						<div className="row">
							<div className="col-md-3">
								<a className="related-image" href="/campaigns/template/view/1">
									<img src={toAbsoluteUrl("/media/template/1.jpg")} />
								</a>
							</div>
							<div className="col-md-3">
								<a className="related-image" href="/campaigns/template/view/2">
									<img src={toAbsoluteUrl("/media/template/2.jpg")} />
								</a>
							</div>
							<div className="col-md-3">
								<a className="related-image" href="/campaigns/template/view/30">
									<img src={toAbsoluteUrl("/media/template/30.jpg")} />
								</a>
							</div>
							<div className="col-md-3">
								<a className="related-image" href="/campaigns/template/view/36">
									<img src={toAbsoluteUrl("/media/template/32.jpg")} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-3" id="item-details">
				<div className="template-actionbar">
					<Button variant="contained" color="primary" onClick={importTemplate}>
				       Import Template
				    </Button>
				    <Button variant="contained" className="add-broadcast float-right" onClick={useTemplate}>
				    	Use Template
				    </Button>
				</div>
				<div id="author-stats">
					<ul className="font-regular">
						<li className="clear-fix">
							<div className="author-stats-subject">Price</div>
							<div className="author-stats-result font-regular">Free</div>
						</li>
						<li className="clear-fix">
							<div className="author-stats-subject">Imported</div>
							<div className="author-stats-result font-regular">426</div>
						</li>
						<li className="clear-fix">
							<div className="author-stats-subject">Used</div>
							<div className="author-stats-result font-regular">184</div>
						</li>
						<li className="clear-fix">
							<div className="author-stats-subject">Supported</div>
							<div className="author-stats-result font-regular">All Browsers</div>
						</li>
						<li className="clear-fix">
							<div className="author-stats-subject">Customizable</div>
							<div className="author-stats-result font-regular">Medium</div>
						</li>
						<li className="clear-fix">
							<div className="author-stats-subject">Template</div>
							<div className="author-stats-result font-regular">Yes</div>
						</li>
						<li className="clear-fix">
							<div className="author-stats-subject">Updated</div>
							<div className="author-stats-result font-regular">2019/12/16</div>
						</li>
					</ul>
					<div className="author-url" onClick={viewTemplates}>
						<div className="view-author-button font-bold ms100">View All Templates</div>
					</div>
				</div>
				<div className="category-tags clear-fix">
					<ul>
						<li title="Category">{state.data.cat}</li>
						<li title="Element">{state.data.element}</li>
					</ul>
				</div>
				<div id="item-details-start-campaign">
					<Button variant="contained" onClick={viewBroadcast}>
				        View Broadcasts
				    </Button>
				    <Button variant="contained" className="float-right" onClick={myTemplates}>
				    	My Templates
				    </Button>
				</div>
			</div>


		</div>
	</>);

}