import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl, FormattedMessage } from "react-intl";
import { connect,useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";

const initialValues = {
  email: "",
};

function ForgotPassword(props) {

  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);

  const globalState  = useSelector(state=>state.auth);
  const [forgotMsg, setdata] = useState([]);
  const [showMsg, setShowMsg] = useState("hide");
  const [cancelText, setCancelText] = useState("Cancel");
  const [loading, setLoading] = useState(false);
  //console.log(user);

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  
  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setShowMsg("hide");
      setCancelText("Cancel");
      props.forgotPassword({
        email: values.email
      });
      console.log(globalState.forgotMsg)
      setTimeout(() => {
        if(globalState.forgotMsg == false) {
          setIsRequested(false);
          setSubmitting(false);
          disableLoading();
          setShowMsg("show");
          setCancelText("Cancel");
          setStatus(
            intl.formatMessage(
              { id: "AUTH.VALIDATION.NOT_FOUND" },
              { name: values.email }
            )
          );
        }
        else {
          setIsRequested(false);
          setSubmitting(false);
          disableLoading();
          setShowMsg("show");
          setCancelText("Close");
        }
      }, 2000);
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth/login" />}
      {!isRequested && (
        <div className="login-form reset-password login-page login-forgot" style={{ display: "block" }}>
          <div id="login-promotion">
            <Link to="/">
              <div className="ad">
                <div className="vault-ad-wrapper"></div>
                <h2 className="font-archivo"><span>QR Buzz</span><br /> By Mumara</h2>
                <h4 className="login-subline"><FormattedMessage id="AUTH.FORGOT.TITLE" /><br /><FormattedMessage id="AUTH.FORGOT.DESC" /></h4>
                <div className="robot-hub-2">
                  <div className="block block-1"></div>
                  <div className="block block-2"></div>
                  <img src="/media/images/portal.png" className="portal" />
                  <div className="robot-wrapper ms500">
                    <img src="/media/images/robot.png" className="robot" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="login-wrapper">
            {/* begin::Head */}
            <div id="register-header" className="logo-login">
              <Link to="/" className="flex-column-auto mt-5">
                <img
                    alt="Logo"
                    className="max-h-70px register-logo"
                    src={toAbsoluteUrl("/media/logos/qr.png")}
                />
              </Link>
            </div>
            {/* end::Head */}
            {/* globalState.forgotMsg == true ? "true" : "false" */}
            <form
              onSubmit={formik.handleSubmit}
              className="form form-body fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
            >
              {globalState.forgotMsg == false ?
                  <div className={`mb-10 alert alert-custom alert-light-danger alert-dismissible `+ showMsg}>
                    <div className="alert-text font-weight-bold">
                      {formik.status}
                    </div>
                  </div>
              : <div className={`mb-10 alert alert-custom alert-light-success alert-dismissible `+ showMsg}>
                  <div className="alert-text font-weight-bold">
                     Reset password link email successfully sent! check your email.
                  </div>
                </div>
              }
              <div className="form-group fv-plugins-icon-container">
              <h5 className="font-bold">Email Address</h5>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.email}</div>
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <button
                  id="kt_login_forgot_submit"
                  type="submit"
                  className="new-password-button"
                  disabled={formik.isSubmitting}
                >
                  <span>Submit</span> 
                  {loading && <span className="ml-3 spinner spinner-white"></span>}
                </button>
                <Link to="/auth/login"
                  id="kt_login_forgot_cancel"
                  className="new-password-button cancel"
                >
                    {cancelText}
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
