/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";
import { FormattedMessage} from "react-intl";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
        ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
        : "";
  };

  return (
      <>
        {/* begin::Menu Nav */}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Level*/}
          <li
              className={`menu-item ${getMenuItemActive("/dashboard", false)} ${getMenuItemActive("/profile", false)} ${getMenuItemActive("/reset-password", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
              <span className="menu-text"><FormattedMessage id="SIDE.MENU.DASHBOARD" /></span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item hide ${getMenuItemActive("/profile", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/profile">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
              <span className="menu-text"><FormattedMessage id="SIDE.MENU.PROFILE" /></span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item hide  ${getMenuItemActive("/reset-password", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/reset-password">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
              <span className="menu-text"><FormattedMessage id="SIDE.MENU.RESETPASSWORD" /></span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item  menu-item-submenu ${getMenuItemActive("/business", false)} ${getMenuItemActive("/business/all", false)} ${getMenuItemActive("/business/add", false)} ${getMenuItemActive("/business/verify", false)} ${getMenuItemActive("/business/save", false)} ${getMenuItemActive("/business/view", false)} ${getMenuItemActive("/business/branches", false)} ${getMenuItemActive("/business/branches/add", false)} ${getMenuItemActive("/business/branch/edit", false)} ${getMenuItemActive("/business/branch/subscriber", false)} ${getMenuItemActive("/business/branch/view", false)}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
            <NavLink className="menu-link menu-toggle" to="/business">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}/>
            </span>
              <span className="menu-text"><FormattedMessage id="SIDE.MENU.BUSINESS" /></span>
              <i className="menu-arrow"/>
            </NavLink>
            <div className="menu-submenu">
                <i className="menu-arrow"/>
                <ul className="menu-subnav">
                  <li className="menu-item  menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text"><FormattedMessage id="SIDE.MENU.BUSINESS" /></span>
                  </span>
                  </li>
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/business/all", false)} ${getMenuItemActive("/business/add", false)} ${getMenuItemActive("/business/verify", false)} ${getMenuItemActive("/business/save", false)} ${getMenuItemActive("/business/view", false)} ${getMenuItemActive("/business/branches", false)} ${getMenuItemActive("/business/branch/add", false)} ${getMenuItemActive("/business/branch/edit", false)} ${getMenuItemActive("/business/branch/subscriber", false)} ${getMenuItemActive("/business/branch/view", false)} ${getMenuItemActive("/business/branch/offers", false)} ${getMenuItemActive("/business/branch/offer/add", false)}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/all">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.VIEWBUSINESS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::1 Level*/}
                  <li
                      className={`menu-item hide ${getMenuItemActive("/business/branch/offers", false)}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branch/offers">
                    <span className="svg-icon menu-icon">
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
                    </span>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.OFFERS" /></span>
                    </NavLink>
                  </li>
                  {/*end::1 Level*/}
                  
                  {/*begin::1 Level*/}
                  <li
                      className={`menu-item hide ${getMenuItemActive("/business/branch/offer/add", false)}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branch/offers">
                    <span className="svg-icon menu-icon">
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
                    </span>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.OFFERS" /></span>
                    </NavLink>
                  </li>
                  {/*end::1 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/add")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/add">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.ADDBUSINESS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/verify")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/verify">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BUSINESSVERIFY" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/view")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/view">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BUSINESSDETAILS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/branches")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branches">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BRANCHES" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/branch/add")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branch/add">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.ADDBRANCHES" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/branch/edit")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branch/edit">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.EDITBRANCHES" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/branch/view")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branch/view">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BRANCHDETAILS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/business/branch/subscriber")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/business/branch/subscriber">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BRANCHSUBSCRIBERS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ul>
              </div>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item ${getMenuItemActive("/subscribers", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/subscribers">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Adress-book2.svg")}/>
            </span>
              <span className="menu-text"><FormattedMessage id="SIDE.MENU.SUBSCRIBERS" /></span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu ${getMenuItemActive("/campaigns", true)} ${getMenuItemActive("/campaigns/html")} ${getMenuItemActive("/campaigns/edit/html")} ${getMenuItemActive("/campaigns/edit/builder")}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
              <NavLink className="menu-link menu-toggle" to="/campaigns">
                  <span className="svg-icon menu-icon">
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Difference.svg")}/>
                  </span>
                  <span className="menu-text"><FormattedMessage id="SIDE.MENU.CAMPAIGNS" /></span>
                  <i className="menu-arrow"/>
              </NavLink>
              <div className="menu-submenu ">
                <i className="menu-arrow"/>
                <ul className="menu-subnav">
                  <li className="menu-item  menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text"><FormattedMessage id="SIDE.MENU.CAMPAIGNS" /></span>
                  </span>
                  </li>
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/campaigns/all")} ${getMenuItemActive("/campaigns/html")} ${getMenuItemActive("/campaigns/new")} ${getMenuItemActive("/campaigns/editor")} ${getMenuItemActive("/campaigns/builder")} ${getMenuItemActive("/campaigns/edit/html")} ${getMenuItemActive("/campaigns/edit/builder")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/all">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BROADCAST" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/html")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/html">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.ADDBROADCAST" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/edit/html")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/html/edit">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.EDITBROADCAST" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/new")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/new">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.CREATEBROADCAST" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/editor")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/editor">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.SELECTEDITOR" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/edit/builder")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/edit/builder">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.EDITBUILDER" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/builder")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/builder">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.BUILDER" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/campaigns/templates")} ${getMenuItemActive("/campaigns/template/view")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/templates">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.TEMPLATES" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/template/view")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/template/view">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.TEMPLATESVIEW" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/campaigns/my-templates")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/my-templates">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.MYTEMPLATES" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/campaigns/schedule/all")} ${getMenuItemActive("/campaigns/schedule/new")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/schedule/all">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.SCHEDULE" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/schedule/new")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/schedule/new">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.ADDSCHEDULED" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/campaigns/statistics")} ${getMenuItemActive("/campaigns/statistic/detail")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/statistics">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.STATISTICS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/campaigns/statistic/detail")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/campaigns/statistic/detail">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.VIEWSTATISTICS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ul>
              </div>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item hide ${getMenuItemActive("/analytics", false)}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/analytics">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/chart.svg")}/>
            </span>
              <span className="menu-text"><FormattedMessage id="SIDE.MENU.ANALYTICS" /></span>
            </NavLink>
          </li>
          {/*end::1 Level*/}

          {/*begin::1 Level*/}
          <li
              className={`menu-item menu-item-submenu  ${getMenuItemActive("/links")}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          >
              <NavLink className="menu-link menu-toggle" to="/links">
                  <span className="svg-icon menu-icon">
                      <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Substract.svg")}/>
                  </span>
                  <span className="menu-text"><FormattedMessage id="SIDE.MENU.LINKS" /></span>
                  <i className="menu-arrow"/>
              </NavLink>
              <div className="menu-submenu ">
                <i className="menu-arrow"/>
                <ul className="menu-subnav">
                  <li className="menu-item  menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text"><FormattedMessage id="SIDE.MENU.LINKS" /></span>
                  </span>
                  </li>
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu hide ${getMenuItemActive("/links/qrcode")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/links/qrcode">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.QRCODE" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/links/branch/add")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/links/branch/add">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.ADDBRANCH" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li
                      className={`menu-item menu-item-submenu ${getMenuItemActive("/links/offers/add")}`}
                      aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/links/offers/add">
                      <i className="menu-bullet menu-bullet-dot">
                        <span/>
                      </i>
                      <span className="menu-text"><FormattedMessage id="SIDE.MENU.ADDOFFERS" /></span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ul>
              </div>
          </li>
          {/*end::1 Level*/}
        </ul>

        {/* end::Menu Nav */}
      </>
  );
}
