import React, {useMemo} from "react";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {useSelector} from "react-redux";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();
  const {user} = useSelector(state => state.auth);

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true)
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-white py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted font-weight-bold mr-2">{today.toString()}</span> &copy;{" "}
          <a
            href={user.copyRightsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-75 text-hover-primary"
          >
            {user.name}
          </a>. {user.copyRights}
        </div>
        <div className="nav nav-dark order-1 order-md-2">
          <a
            href="https://school.mumara.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link pr-3 pl-0"
          >
            Mumara Business School
          </a>
          <a
            href="https://docs.mumara.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link px-3"
          >
            Documentation
          </a>
          <a
            href="https://www.mumara.com/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link pl-3 pr-0"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
