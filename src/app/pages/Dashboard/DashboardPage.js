import React, { useEffect, useState, useMemo } from "react";
import '../../../_metronic/_assets/css/Dashboard.scss';
import CountUp from 'react-countup';
import { VerticalTimeline, VerticalTimelineElement}  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import BulletIcon from '../Component/Marchent/BulletIcon';
import Completed from '../Component/Marchent/Completed';
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import {connect,useSelector,useDispatch} from 'react-redux';
import * as dredux from "./_redux/dashboardRedux";
import {API_URL} from "../../Constants";

import { TimeStamp } from "../../utility/TimeStamp";
import openSocket from 'socket.io-client';


/*******  Chart  *******/
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import {useHtmlClassService} from "../../../_metronic/layout";

export function DashEngages(props) {

  //console.log(props)

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.base.primary"
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.light.primary"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("dashengage");

    if (!element) {
      return;
    }

    const options = getChartOption1(layoutProps,props);
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps,props]);

  return (
        <div
          id="dashengage"
          className="card-rounded-bottom"
          style={{ height: "120px" }}
        ></div>
    );
}

function getChartOption1(layoutProps,props) {

  const options = {
    series: [
      {
        name: "Engagements: ",
        data: props.values
      }
    ],
    chart: {
      type: "area",
      height: 120,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 1
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBaseSuccess]
    },
    xaxis: {
      categories: props.cat,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily
      },
      y: {
        formatter: function(val) {
          return "" + val + " ";
        }
      }
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3
    }
  };
  return options;
}

export function DashSubscribe(props) {
  //console.log(props)
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.base.success"
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.light.success"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("dashsubscribe");

    if (!element) {
      return;
    }

    const options = getChartOption2(layoutProps,props);
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps,props]);

  return (
        <div
          id="dashsubscribe"
          className="card-rounded-bottom"
          style={{ height: "120px" }}
        ></div>
    );
}

function getChartOption2(layoutProps,props) {
  const options = {
    series: [
      {
        name: "New Subscribers: ",
        data: props.values
      }
    ],
    chart: {
      type: "area",
      height: 120,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 1
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBaseSuccess]
    },
    xaxis: {
      categories: props.cat,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily
      },
      y: {
        formatter: function(val) {
          return "" + val + " ";
        }
      }
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3
    }
  };
  return options;
}

export function DashOffers(props) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.base.info"
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.light.info"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("dashmension");

    if (!element) {
      return;
    }

    const options = getChartOption3(layoutProps,props);
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps,props]);

  return (
        <div
          id="dashmension"
          className="card-rounded-bottom"
          style={{ height: "120px" }}
        ></div>
    );
}

function getChartOption3(layoutProps,props) {
  const options = {
    series: [
      {
        name: "Offers Availed: ",
        data: props.values
      }
    ],
    chart: {
      type: "area",
      height: 120,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 1
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBaseSuccess]
    },
    xaxis: {
      categories: props.cat,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily
      },
      y: {
        formatter: function(val) {
          return "" + val + " ";
        }
      }
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3
    }
  };
  return options;
}

/******* / End Chart  *******/





const options = [
  'Ban Subscriber'
];


const ITEM_HEIGHT = 48; 

function DashboardPage(props) {

  const history = useHistory();
  const {user} = useSelector(state => state.auth);
  const user_email = user.email;



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function handleClick(event) {
      setAnchorEl(event.currentTarget);
  }
  function handleClose(event) {
      setAnchorEl(null);
      console.log(event.target.dataset.value)
  }


  //document.body.classList.add('body-dashboard');
  const classes =useStyles();
  const [values, setValues] = React.useState({
    dashBranch: '',
    dashBusiness: '',
    dashTime:''
  });

  const [state, setState] = useState({
    time: "Oct 8",
    business: "Khaadi",
    branch:"All Branches",
    modelShow: false,
    userImg: 'wasif.jpg',
    userName: 'Wasif Ahmed',
    userLocation: 'Gullberg III, Lahore',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  function timeChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log('Time Change: '+event.target.value);
  }
  function businessChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log('Business Change: '+event.target.value);
  }
  function branchChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log('Branch Change: '+event.target.value);
  }

  const modelOpen =(e)=> {
    var uid = e.target.dataset.user;
    console.log(uid);
    if(uid == 1) {
      setState({userName: "Wasif Ahmed", userLocation: "McDonald’s Gulberg Lahore", userImg: "wasif.jpg", modelShow: true});
    } else if(uid == 2) {
      setState({userName: "Shahbaz Mughal", userLocation: "H Block Model Town Lahore", userImg: "sam.jpg", modelShow: true});
    } else if(uid == 3) {
      setState({userName: "Sara Ali", userLocation: "DHA Phase 5 Lahore", userImg: "user1.jpg", modelShow: true});
    } else {
      setState({userName: "Wasif Ahmed", userLocation: "McDonald’s Gulberg Lahore", userImg: "wasif.jpg", modelShow: true});
    }
    
  }
  function modelClose(event) {
      setState({ modelShow: false });
  }
  const sendMail =()=> {
		toast.success("Email send successfully!", {position: "top-right",autoClose: 3000});
    const timeout = setTimeout(() => {
      setState({ modelShow: false });
    }, 3000);
  }

  var moment = require('moment');

  const globalState  = useSelector(state=>state.dashboard);
  const [allposts, setdata] = useState([]);
  const [allsubs, setSubs] = useState([]);
  const [allengages, setEngages] = useState([]);
  const [alleGraphs, setEGraphs] = useState([]);

	useEffect( ()=>{
    //console.log(globalState.subscribers)
    setdata(globalState.posts)
    setSubs(globalState.subscribers)
    setEngages(globalState.engages)
    setEGraphs(globalState.egraph)

   

	});
	useEffect( ()=>{
    props.getEngageGraph(user.id)
    props.getPosts(user.id);
    props.getSubscriptions(user.id);
    props.getEngagements(user.id)
  } , []);

  function socketConnection(client){
  
      client.on('newSubscriber', (data) => {
        if(user.id == data.merchant_id) { 
            props.updateSubscribers(data.data)
            props.updatePostsCount("1")
        }  
         
      });
      client.on('newPost', (data) => { 
         if(user.id == data.data.merchant_id) {
            props.updatePosts(data.data)
            props.updatePostsCount("2")
         }
      });
  }
  

  useEffect(() => {
      const client = openSocket(API_URL)
      socketConnection(client)
      return () => {
        // removing the listener when props.x changes

        client.disconnect()
    }
   }, []);
  
  const exngageVlaues = alleGraphs.posts ? alleGraphs.posts : [0];
  const exchangeCat = alleGraphs.posts_times ? alleGraphs.posts_times : ["No Data"];
  const subscribeVlaues = alleGraphs.subscriptions ? alleGraphs.subscriptions : [0];
  const subscribeCat = alleGraphs.subscriptions_time ? alleGraphs.subscriptions_time : ["No Data"];
  const offersVlaues = alleGraphs.offers ? alleGraphs.offers : [];
  const offersCat = alleGraphs.offers_time ? alleGraphs.offers_time : [] ;

  const viewSubscribers =()=> {
    history.push('/subscribers');
  }

  return <>
    <div className="row dashCount">
      <div className="col-md-12 hide">
        <div className="row">
          <div className="filter-status col-md-6">
            <div className="fltStatus">
              <span className="fl-status fl-status-1 text-primary font-weight-bolder">Jan 01</span>
              <span className="seperate"> - </span>
              <span className="fl-status fl-status-2 text-dark-75 font-weight-bold">Business</span>
              <span className="seperate"> - </span>
              <span className="fl-status fl-status-3 text-muted">All Branches</span>
            </div>
          </div>
          <div className="dash-filter col-md-2">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="dashTime">
                Select Duration
              </InputLabel>
              <Select
                value={values.dashTime}
                onChange={timeChange}
                input={<OutlinedInput labelWidth={labelWidth} name="dashTime" id="dashTime" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Today</MenuItem>
                <MenuItem value={2}>Yesterday</MenuItem>
                <MenuItem value={3}>This Week</MenuItem>
                <MenuItem value={4}>Last Week</MenuItem>
                <MenuItem value={5}>This Month</MenuItem>
                <MenuItem value={6}>Last Month</MenuItem>
                <MenuItem value={7}>This Year</MenuItem>
                <MenuItem value={8}>Last Year</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="dash-filter col-md-2">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="dashBusiness">
                Select Business
              </InputLabel>
              <Select
                value={values.dashBusiness}
                onChange={businessChange}
                input={<OutlinedInput labelWidth={labelWidth} name="dashBusiness" id="dashBusiness" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Khaadi</MenuItem>
                <MenuItem value={2}>Sapphire</MenuItem>
                <MenuItem value={3}>McDownald</MenuItem>
                <MenuItem value={4}>KFC</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="dash-filter col-md-2">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="dashBranch">
                All Branches
              </InputLabel>
              <Select
                value={values.dashBranch}
                onChange={branchChange}
                input={<OutlinedInput labelWidth={labelWidth} name="dashBranch" id="dashBranch" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>MM Alam Branch</MenuItem>
                <MenuItem value={2}>Gullberg Branch</MenuItem>
                <MenuItem value={3}>DHA Branch</MenuItem>
                <MenuItem value={4}>Mall Road Branch</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card engages">
          <i className="bg-icon fa fa-layer-group"></i>
          <div className="card-body hour row">
            <div className="col-md-6">
              <div className="count">{allengages.posts}</div>
              <span className="dashTitle">Engagements</span>
            </div>
            <div className="col-md-6">
              <DashEngages values={exngageVlaues} cat={exchangeCat} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card subscribes">
          <i className="bg-icon fa fa-user"></i>
          <div className="card-body day row">
            <div className="col-md-6">
              <div className="count">{allengages.subscriptions}</div>
              <span className="dashTitle">New Subscribers</span>
            </div>
            <div className="col-md-6">
              <DashSubscribe values={subscribeVlaues} cat={subscribeCat} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mensions">
          <i className="bg-icon fa fa-hashtag"></i>
          <div className="card-body week row">
            <div className="col-md-6">
              <div className="count">{allengages.offer_claimed}</div>
              <span className="dashTitle">Offers Availed</span>
            </div>
            <div className="col-md-6">
              <DashOffers values={offersVlaues} cat={offersCat} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <h3 className="dash-time-title">Recent Engagements</h3>
        <VerticalTimeline layout="1-column" className="vertical-timeline--one-column-left">
          { !allposts.length?
            <VerticalTimelineElement
              className="vertical-timeline-element--work empty-el-row"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<BulletIcon />}
            >
              <div className="emptyBlk">
                Data not found!
              </div>
            </VerticalTimelineElement>
            :<>{allposts.map(option => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={ TimeStamp(new Date(option.updated_at).getTime()) }
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<BulletIcon />}
                key={option.id}
              >
                <div className="userBlk">
                  <span className="userImg"><img className="dashUserImg" src={option.user_image == null ? "/media/users/blank.png" : option.user_image} /></span>
                  <span className="msgBlk">
                    <span className="user-name">{option.first_name} {option.last_name}</span> availed {option.promo_title} @<span className="scanPlace">{option.branch_name}</span>
                    <span className="scanTime">{moment(option.updated_at).format("LT"+" - "+"ll")}</span>
                  </span>
                </div>
                <div className="userPost">
                  <div className="userPostMsg">{option.body}</div>
                  {option.media_post == 1 ?
                    <div className="dashPhtoBlk">
                      <img src={option.media_url.split(',')[0]} />
                    </div>
                    : <></>
                  }
                </div>
              </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                className="no-shadow"
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                icon={<Completed />}
                position="right"
              />
            </>
          }
        </VerticalTimeline>
      </div>
     
      <div className="col-md-6">
        <h3 className="dash-time-title2">Recent Subscriptions <span className="text-link text-primary" onClick={viewSubscribers}>View All</span></h3>
        <VerticalTimeline layout="1-column" className="vertical-timeline--one-column-right">
          { !allsubs.length ?
            <>
              <VerticalTimelineElement
                className="vertical-timeline-element--work empty-el-row emptyrows"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<BulletIcon />}
              >
                <div className="emptyBlk">
                  Data not found!
                </div>
              </VerticalTimelineElement>
            </>
            : 
            <>{ allsubs.map((option,index) => (
              <VerticalTimelineElement
              key={index}
                className="vertical-timeline-element--work"
                date={ TimeStamp(new Date(option.created_at).getTime()) }
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<BulletIcon />}
                key={`s-`+option.subscriber_id}
              >
                <div className="userBlk">
                  <span className="userImg"><img className="dashUserImg" src={option.image == null ? "/media/users/blank.png" : option.image} /></span>
                  <span className="msgBlk">
                    <span className="user-name">{option.first_name} {option.last_name}</span> subscribed {option.promo_title} @<span className="scanPlace">{option.branch_name}</span>
                    <span className="scanTime">{moment(option.created_at).format("LT"+" - "+"ll")}</span>
                  </span>
                </div>
              </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                className="no-shadow"
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                icon={<Completed />}
                position="right"
              />
            </> 
          }
        </VerticalTimeline>
      </div>
        
    </div>
  </>;
}

export default connect(null, dredux.actions)(DashboardPage);