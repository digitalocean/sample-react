/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

import Button from '@material-ui/core/Button';

export default function ViewStatisticsTable2({ className }) {
  return (
      <div className={`card card-custom col-md-12 ${className}`}>
        {/* Head */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">Campaigns Statistics</span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">Campaigns Statistic List</span>
          </h3>
          <div className="card-toolbar">
            {/*<a href="#" className="btn btn-success font-weight-bolder font-size-sm mr-3">Build Template</a>
            <a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a>*/}
          </div>
        </div>
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{minWidth: "250px"}}><span className="text-dark-75">Schedule Info</span></th>
                  <th style={{minWidth: "100px"}}>Broadcast</th>
                  <th style={{minWidth: "100px"}}>Audience</th>
                  <th style={{minWidth: "100px"}}>Start Time</th>
                  <th style={{minWidth: "100px"}}>Contacts</th>
                  <th style={{minWidth: "100px"}}>Opened</th>
                  <th style={{minWidth: "100px"}}>Unsub</th>
                  <th style={{minWidth: "80px"}}/>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td className="pl-0 py-8">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-40 symbol-light-success mr-5">
                        <span className="symbol-label">
                          <span className="svg-icon svg-icon-lg svg-icon-success">
                            <SVG className="h-75 align-self-end" src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")} ></SVG>
                          </span>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">BG Campaign</a>
                        <span className="text-muted font-weight-bold d-block">Editor Campaign</span>
                      </div>
                    </div>
                  </td>
                  <td>
                      <span className="text-dark-75 d-block font-size-lg">
                       Summer Collection
                      </span>
                  </td>
                  <td>
                      <span className="text-dark-75 d-block font-size-lg">
                        Request Demo
                      </span>
                  </td>
                  <td>
                      <span className="text-dark-75  d-block font-size-lg">
                        Aug 29, 2020 01:28:20 AM
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        42178
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        41624
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        16
                      </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-success btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-success">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                        </span>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="pl-0 py-0">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-40 symbol-light-info mr-5">
                        <span className="symbol-label">
                          <span className="svg-icon svg-icon-lg svg-icon-info">
                            <SVG className="h-75 align-self-end" src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} ></SVG>
                          </span>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Lahore Zone</a>
                        <span className="text-muted font-weight-bold d-block">Template Campaign</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-dark-75 d-block font-size-lg">
                      Good Friday Promo
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 d-block font-size-lg">
                      Campaigns
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 d-block font-size-lg">
                      Aug 21, 2020 06:55:52 PM
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        94567
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        91234
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        92
                      </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-success btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-success">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                        </span>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="pl-0 py-8">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-40 symbol-light-success mr-5">
                        <span className="symbol-label">
                          <span className="svg-icon svg-icon-lg svg-icon-success">
                            <SVG className="h-75 align-self-end" src={toAbsoluteUrl("/media/svg/icons/Communication/Mail.svg")} ></SVG>
                          </span>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">December Campaign</a>
                        <span className="text-muted font-weight-bold d-block">Editor Campaign</span>
                      </div>
                    </div>
                  </td>
                  <td>
                      <span className="text-dark-75 d-block font-size-lg">
                       Quaid Anniversary
                      </span>
                  </td>
                  <td>
                      <span className="text-dark-75 d-block font-size-lg">
                        Request Demo
                      </span>
                  </td>
                  <td>
                      <span className="text-dark-75 d-block font-size-lg">
                        Aug 15, 2020 10:17:10 AM
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        68291
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        67149
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        52
                      </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-success btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-success">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                        </span>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="pl-0 py-0">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-40 symbol-light-info mr-5">
                        <span className="symbol-label">
                          <span className="svg-icon svg-icon-lg svg-icon-info">
                            <SVG className="h-75 align-self-end" src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-4-blocks.svg")} ></SVG>
                          </span>
                        </span>
                      </div>
                      <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">August Promos</a>
                        <span className="text-muted font-weight-bold d-block">Template Campaign</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-dark-75 d-block font-size-lg">
                      Independence Sale
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 d-block font-size-lg">
                      Campaigns
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 d-block font-size-lg">
                      Aug 05, 2020 11:47:39 PM
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        184235
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        179536
                      </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        247
                      </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a href="#" className="btn btn-icon btn-light btn-hover-success btn-sm mx-3">
                        <span className="svg-icon svg-icon-md svg-icon-success">
                          <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                        </span>
                    </a>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}
