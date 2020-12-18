import React, {useState} from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import { FormattedMessage} from "react-intl";
import { useHistory, useLocation  } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';




export function ViewStatistics-iconMenuButton() {

	const history = useHistory();
	const location = useLocation();

	const [state , setState] = useState({
		id: '',
		name: '',
		campaign: '',
		branches: '',
		engage: '',
		created_on: ''
	});

	function goBack() {
      history.goBack();
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
	    setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
	    setAnchorEl(null);
	};

	const options = [
	  'Atria',
	  'Callisto',
	  'Dione',
	  'Ganymede'
	];

	const ITEM_HEIGHT = 48;

	return (<>
		<div className="row">

			<div className="col-md-12">
				<div className="row stats-data">
					<div className="card w20 mb-5">
						<div className="card-body aud-size">
							<div className="symbol symbol-40 symbol-light-primary">
								<span className="symbol-label">
									<span className="stat-icon flaticon2-user"></span>
								</span>
							</div>
							<span className="count">21.2K</span>
							<span className="sdata-desc">Audiance Size</span>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body reach">
							<div className="symbol symbol-40 symbol-light-success">
								<span className="symbol-label">
									<span className="stat-icon flaticon2-send"></span>
								</span>
							</div>
							<span className="count">19.7K</span>
							<span className="sdata-desc">Reach</span>
							<div className="stats-ratio stats-up">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 87%
							</div>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body views">
							<div className="symbol symbol-40 symbol-light-info">
								<span className="symbol-label">
									<span className="stat-icon flaticon-eye"></span>
								</span>
							</div>
							<span className="count">13.4K</span>
							<span className="sdata-desc">Views</span>
							<div className="stats-ratio stats-up">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 70.1%
							</div>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body clicks">
							<div className="symbol symbol-40 symbol-light-warning">
								<span className="symbol-label">
									<span className="stat-icon flaticon2-paperplane"></span>
								</span>
							</div>
							<span className="count">23%</span>
							<span className="sdata-desc">Clicks</span>
							<div className="stats-ratio stats-up">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 115.3%
							</div>
						</div>
					</div>
					<div className="card w20 mb-5">
						<div className="card-body unsub">
							<div className="symbol symbol-40 symbol-light-danger">
								<span className="symbol-label icon-dislike">
									<span className="stat-icon flaticon-like"></span>
								</span>
							</div>
							<span className="count">147</span>
							<span className="sdata-desc">Unsubsucribed</span>
							<div className="stats-ratio stats-down">
								<span className="caret"><i className="fas fa-caret-up"></i></span> 0.21%
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="col-md-6">
				<div className="card ">
					<div className="card-body">
						<IconButton
					        aria-label="more"
					        aria-controls="long-menu"
					        aria-haspopup="true"
					        onClick={handleClick}
					    >
					        <MoreVertIcon />
					    </IconButton>
		                <Menu
					        id="long-menu"
					        anchorEl={anchorEl}
					        keepMounted
					        open={open}
					        onClose={handleClose}
					        PaperProps={{
					          style: {
					            maxHeight: ITEM_HEIGHT * 4.5,
					            width: '20ch',
					          },
					        }}
					    >
					        {options.map((option) => (
					          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
					            {option}
					          </MenuItem>
					        ))}
					    </Menu>
					</div>
				</div>
			</div>

			<div className="col-md-6">
				<div className="card ">
					<div className="card-body">
						tttt
					</div>
				</div>
			</div>

			<div className="card col-md-12 hide">
				<div className="card-body">
					<b>ID:</b> {location.state.id}<br /> 
					<b>Name:</b> {location.state.name}<br /> 
					<b>campaign:</b> {location.state.campaign}<br /> 
					<b>branches:</b> {location.state.branches}<br /> 
					<b>Engage:</b> {location.state.engage}<br /> 
					<b>Start Time:</b> {location.state.created_on}<br /> 
				</div>
			</div>

			

		</div>
	</>);

}