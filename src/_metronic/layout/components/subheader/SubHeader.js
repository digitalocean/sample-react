/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useLayoutEffect, useEffect, useState} from "react";
import objectPath from "object-path";
import {useLocation} from "react-router-dom";
import {BreadCrumbs} from "./components/BreadCrumbs";
import {getBreadcrumbsAndTitle, useSubheader} from "../../_core/MetronicSubheader";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {QuickActions} from "./components/QuickActions";
import { matchPath } from "react-router";

export function SubHeader(props) {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
          uiService.config,
          "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
          "subheader_container",
          true
      )
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs = (aside && aside.breadcrumbs.length > 0) ? aside.breadcrumbs : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle((aside && aside.title && aside.title.length > 0) ? aside.title : header.title);
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  const [state, setState] = useState({
    urlPath: window.location.pathname,
    tracker:1
  });
  return (
      <div
          id="kt_subheader"
          className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
      >
        <div
            className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
        >
          {/* Info */}
          <div className="d-flex align-items-center flex-wrap mr-1">
            {layoutProps.subheaderMobileToggle && (
                <button
                    className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
                    id="kt_subheader_mobile_toggle"
                >
                  <span/>
                </button>
            )}

            <div className="d-flex align-items-baseline mr-5">
              <h5 className="text-dark font-weight-bold my-2 mr-5">
                <>
                  {subheader.title}
                </>
                {/*<small></small>*/}
              </h5>

            </div>


            <BreadCrumbs items={subheader.breadcrumbs} />
          </div>

          {/* Toolbar */}
          
          <div className="d-flex align-items-center">
            { window.location.pathname == "/dashboard" &&
              <QuickActions value={state.tracker}  />
              
            }
          </div>
        </div>
      </div>
  );
}
