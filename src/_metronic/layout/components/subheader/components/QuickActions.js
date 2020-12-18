/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {forwardRef, useState} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const QuickActionsDropdownToggle = forwardRef((props, ref) => {

  let date = new Date(); // 2020-06-21
  let today = date.toLocaleString('en-us', { month: 'short' }) +' '+ date.getDate();

  const [state, setState] = useState({
    time:today,
    start:"Today: ",
    end:today
  });

  return (
    <a
      ref={ref}
      href="#"
      onClick={e => {
        e.preventDefault();
        props.onClick(e);
      }}
      id="dashboard_actions"
      className="btn btn-light btn-sm font-weight-bold mr-2"
    >
      {" "}
      <span className="text-muted font-weight-bold mr-2" id="action_start">Today: </span>
    <span className="text-primary font-weight-bold" id="action_end">{state.time}</span>
    </a>
  );
});

export function QuickActions(props) { 

  let date = new Date(); // 2020-06-21
  let today = date.toLocaleString('en-us', { month: 'short' }) +' '+ date.getDate();

  // YesterDay
  var today2 = new Date();
  var yesterday2 = new Date(today2);
  yesterday2.setDate(today2.getDate() - 1);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = today2.getMonth();
  let yesterday = monthNames[month] +' '+ yesterday2.getDate();

  // Week
  var today3 = new Date();
  var week3 = new Date(today3);
  week3.setDate(today3.getDate() - 6);
  const monthNames3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month3 = today3.getMonth();
  let week2 = monthNames3[month3] +' '+ week3.getDate();
  let week = week2 +' - '+ today;

  const [state, setState] = useState({
    time:today,
    start:"Today: ",
    end:today
  });
  
  function actionToday() {
    document.getElementById('action_start').innerHTML = "Today: ";
    document.getElementById('action_end').innerHTML = today;
  }
  function actionYesterday() {
    document.getElementById('action_start').innerHTML = "Yesterday: ";
    document.getElementById('action_end').innerHTML = yesterday;
  }
  function actionWeek() {
    document.getElementById('action_start').innerHTML = "";
    document.getElementById('action_end').innerHTML = week;
  }

  return (
      <>
        {/* <OverlayTrigger
            placement="left"
            overlay={<Tooltip id="quick-actions-tooltip">Today</Tooltip>}
        > */}
          <Dropdown className="dropdown-inline" drop="down" alignRight>
            <Dropdown.Toggle
                as={QuickActionsDropdownToggle}
                id="dropdown-toggle-quick-actions-subheader"
            />

            <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-sm dropdown-menu-right">
            <ul className="navi navi-hover">
                {/* <li className="navi-item" data-range-key="Today" onClick={actionToday}>
                    <a href="#" className="navi-link">
                      <span className="navi-text">Today</span>
                    </a>
                </li>
                <li className="navi-item" data-range-key="Yesterday" onClick={actionYesterday}>
                    <a href="#" className="navi-link">
                      <span className="navi-text">Yesterday</span>
                    </a>
                </li>
                <li className="navi-item" data-range-key="This Week" onClick={actionWeek}>
                    <a href="#" className="navi-link">
                      <span className="navi-text">This Week</span>
                    </a>
                </li> */}
            </ul>
            </Dropdown.Menu>
          </Dropdown>
        {/* </OverlayTrigger> */}
      </>
  );
}
