import React, {useMemo, useState} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {Topbar} from "./Topbar";
import {HeaderMenuWrapper} from "./header-menu/HeaderMenuWrapper";
import {AnimateLoading} from "../../../_partials/controls";
import {useSelector} from "react-redux";
import swal from 'sweetalert';

export function Header() {
  const uiService = useHtmlClassService();
  const {user} = useSelector(state => state.auth);
  const layoutProps = useMemo(() => {
    return {
      headerClasses: uiService.getClasses("header", true),
      headerAttributes: uiService.getAttributes("header"),
      headerContainerClasses: uiService.getClasses("header_container", true),
      menuHeaderDisplay: objectPath.get(
        uiService.config,
        "header.menu.self.display"
      )
    };
  }, [uiService]);
  const [showVEB, setShowVEB] = useState("show");
  const emailVerifyHide =()=> {
    setShowVEB("hide");
  }
  const resendEmail =()=> {
    swal({
      title: "Email Sent!",
      text: "Account verification email successfully sent to your email address!" ,
      icon: "success",
      button: null,
      timer: 4000
    });
  }

  return (
    <>
      {/*begin::Header*/}
      <div
        className={`header ${layoutProps.headerClasses}`}
        id="kt_header"
        {...layoutProps.headerAttributes}
      > 
        { 
          user.verify_token == null ? <></> :
          <div className={`email-verify d-flex align-items-center bg-light-warning rounded p-7 `+showVEB}>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <i className="fa fa-times text-link" onClick={emailVerifyHide}></i>
              <h4><i className="icon-xl fas fa-check-circle text-success"></i> A verification link has been sent to your email account!</h4>
              <div>Please click on a link that has just been sent to your email account <span className="ve-email">{user.email}</span> to verify your business ownership.</div>
              <div>if you didn`t recieve email, <span className="font-weight-bolder text-warning py-1 font-size-lg text-link" onClick={resendEmail}>Click here</span> to resend the verification email.</div>
            </div>
          </div>
        }
        
        {/*begin::Container*/}
        <div className={` ${layoutProps.headerContainerClasses} d-flex align-items-stretch justify-content-between`}>
          <AnimateLoading />
          {/*begin::Header Menu Wrapper*/}
          {layoutProps.menuHeaderDisplay && <HeaderMenuWrapper />}
          {!layoutProps.menuHeaderDisplay && <div />}
          {/*end::Header Menu Wrapper*/}

          {/*begin::Topbar*/}
          <Topbar />
          {/*end::Topbar*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Header*/}
    </>
  );
}
