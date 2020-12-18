/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";

import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

function createData(name, campaign, branches, engage, time, action) {
  return { name, campaign, branches, engage, time, action };
}

const rows = [
  createData('BG Campaign', 'Summer Collection', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore, SweetIce - Johar Town', '42178', 'Aug 29, 2020 01:28:20 AM'),
  createData('Lahore Zone', 'Good Friday Promo', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore, SweetIce - Johar Town', '94567', 'Aug 21, 2020 06:55:52 PM'),
  createData('December Campaign', 'Quaid Anniversary', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore, SweetIce - Johar Town', '68291', 'Aug 15, 2020 10:17:10 AM'),
  createData('August Promos', 'Independence Sale', 'Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, Outfitters - Mall of Lahore, SweetIce - Johar Town', '184235', 'Aug 05, 2020 11:47:39 PM'),
];

export default function ViewStatisticsTable3({ className }) {

  const history = useHistory();

  function StatisticsDetail() {
      history.push('/campaigns/statistic/detail');
    }

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
        <div className="card-body pt-0 pb-3 ">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="table table-head-custom table-head-bg table-borderless table-vertical-center table-statistics">
                <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{minWidth: "250px"}}><span className="text-dark-75">Schedule Info</span></th>
                  <th style={{minWidth: "100px"}}>Audience</th>
                  <th style={{minWidth: "100px"}}>Engagements</th>
                  <th style={{minWidth: "100px"}}>Start Time</th>
                  <th style={{minWidth: "80px"}}/>
                </tr>
                </thead>
                <tbody>

                  <tr>
                    <td className="pl-0 py-8">
                      <div className="d-flex align-items-center">
                        <div>
                          <a href="#" onClick={StatisticsDetail} className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">BG Campaign</a>
                          <span className="text-muted font-weight-bold d-block">Summer Collection</span>
                        </div>
                      </div>
                    </td>
                    <td>
                        <span className="text-dark-75 d-block ">
                          Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, 
                          Outfitters - Mall of Lahore, SweetIce - Johar Town
                        </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          42178
                        </span>
                    </td>
                    <td>
                        <span className="text-dark-75  d-block ">
                          Aug 29, 2020 01:28:20 AM
                        </span>
                    </td>
                    <td className="pr-0 text-right">
                      <Button className="btn btn-icon btn-light btn-hover-success btn-sm mx-3" onClick={StatisticsDetail}>
                          <span className="svg-icon svg-icon-md svg-icon-success">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                          </span>
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td className="pl-0 py-0">
                      <div className="d-flex align-items-center">
                        <div>
                          <a href="#" onClick={StatisticsDetail} className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Lahore Zone</a>
                          <span className="text-muted font-weight-bold d-block">Good Friday Promo</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark-75 d-block ">
                        Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, 
                          Outfitters - Mall of Lahore, SweetIce - Johar Town
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          94567
                        </span>
                    </td>
                    <td>
                      <span className="text-dark-75 d-block ">
                        Aug 21, 2020 06:55:52 PM
                      </span>
                    </td>
                    <td className="pr-0 text-right">
                      <Button className="btn btn-icon btn-light btn-hover-success btn-sm mx-3" onClick={StatisticsDetail}>
                          <span className="svg-icon svg-icon-md svg-icon-success">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                          </span>
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td className="pl-0 py-8">
                      <div className="d-flex align-items-center">
                        <div>
                          <a href="#" onClick={StatisticsDetail} className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">December Campaign</a>
                          <span className="text-muted font-weight-bold d-block">Quaid Anniversary</span>
                        </div>
                      </div>
                    </td>
                    <td>
                        <span className="text-dark-75 d-block ">
                          Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, 
                          Outfitters - Mall of Lahore, SweetIce - Johar Town
                        </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          68291
                        </span>
                    </td>
                    <td>
                        <span className="text-dark-75 d-block ">
                          Aug 15, 2020 10:17:10 AM
                        </span>
                    </td>
                    <td className="pr-0 text-right">
                      <Button className="btn btn-icon btn-light btn-hover-success btn-sm mx-3" onClick={StatisticsDetail}>
                          <span className="svg-icon svg-icon-md svg-icon-success">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                          </span>
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <td className="pl-0 py-0">
                      <div className="d-flex align-items-center">
                        <div>
                          <a href="#" onClick={StatisticsDetail} className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">August Promos</a>
                          <span className="text-muted font-weight-bold d-block">Independence Sale</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark-75 d-block ">
                        Khaadi - Mall Branch, Khaadi - DHA Branch, Sapphire - Upper Mall, Sapphire Fortress, Nokia - Hafeez Center, 
                          Outfitters - Mall of Lahore, SweetIce - Johar Town
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          184235
                        </span>
                    </td>
                    <td>
                      <span className="text-dark-75 d-block ">
                        Aug 05, 2020 11:47:39 PM
                      </span>
                    </td>
                    <td className="pr-0 text-right">
                      <Button className="btn btn-icon btn-light btn-hover-success btn-sm mx-3" onClick={StatisticsDetail}>
                          <span className="svg-icon svg-icon-md svg-icon-success">
                            <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Chart-bar3.svg")} />
                          </span>
                      </Button>
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
