/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from "react";
import SVG from "react-inlinesvg";
import { useHistory } from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_helpers";
import {useSelector} from "react-redux";

export function QuickUser() {
  const history = useHistory();
  const {user} = useSelector(state => state.auth);

  const logoutClick = () => {
      const toggle = document.getElementById("kt_quick_user_toggle");
      if (toggle) {
        toggle.click();
      }
      history.push("/logout");
  };

  const editProfile =()=> {
    history.push("/profile");
  }

  const changePassword =()=> {
    history.push("/reset-password");
    
  }

  return (
    <div id="kt_quick_user" className="offcanvas offcanvas-right offcanvas p-10">
      <div className="bg-block">
        <div className="bgoverlay" style={{
            backgroundImage: `url("/media/bg/01.jpg")`
        }}></div>
      </div>
      <a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close" >
        <i className="ki ki-close icon-xs text-muted"/>
      </a>
      <div className="profile-main-block">

        <div className="user-head">

          <div className="profile-img-blck">
              <div className="profile-img-inner-blk">
                  <img src={user.image == null ? "/media/users/blank.png" : user.image} id="dp-photo" className="img-fluid rounded-circle" width="200px" />
              </div>
          </div>

          <div className="offcanvas-content pr-5 mr-n5" >
            <div className="align-items-center">
              
              <div className="d-flex flex-column">
                <a href="#" className="font-weight-bold font-size-h3 text-dark-75 text-hover-success" >
                  {user.name}
                </a>
                <div className="navi mb-5">
                  <a href="#" className="navi-item">
                    <span className="navi-icon mr-1">
                      <span className="svg-icon-lg svg-icon-primary">
                        <SVG src={toAbsoluteUrl( "/media/svg/icons/Communication/Mail-notification.svg" )} ></SVG>
                      </span>
                    </span>
                    <span className="navi-text text-muted text-hover-success">
                      {user.email}
                    </span>
                  </a>
                </div>
                {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                  Sign Out
                </Link> */}
                <div className="btn-block mb-2">
                  <button className="btn btn-light-primary btn-bold mr-1" onClick={editProfile}>Edit Profile</button>
                  <button className="btn btn-light-warning btn-bold ml-1" onClick={changePassword}>Change Password</button>
                </div>
                <div className="btn-block">
                  <button className="btn btn-light-success btn-bold btn-out" onClick={logoutClick}>Sign out</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <div className="user-body"></div>

      </div>

    </div>
  );
}
