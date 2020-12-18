import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect,useSelector } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  console.log(props)

  const globalState = useSelector(state=>state.auth)


  const [loading, setLoading] = useState(false);


  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
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
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      
      // props.iwantCountries()
      
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { accessToken } }) => {
            
            disableLoading();
            props.login(accessToken);
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-page login-signin" id="kt_login_signin_form">
      <div id="login-promotion">
        <Link to="/auth/login">
          <div className="ad">
            <div className="vault-ad-wrapper"></div>
            <h2 className="font-archivo"><span>QR Buzz</span><br /> By Mumara</h2>
            <h4 className="login-subline"><FormattedMessage id="AUTH.LOGIN.TITLE" /><br /> <FormattedMessage id="AUTH.LOGIN.DESCRIPTION" /></h4>
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
          <Link to="/auth/login" className="flex-column-auto mt-5">
            <img
                alt="Logo"
                className="max-h-70px register-logo"
                src={toAbsoluteUrl("/media/logos/qr.png")}
            />
          </Link>
        </div>
        {/* end::Head */}

        {/*begin::Form*/}
        <form
          onSubmit={formik.handleSubmit}
          className="form form-body fv-plugins-bootstrap fv-plugins-framework"
        >
          {formik.status ? (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          ) : (
            <div>
            </div>
          )}

          <div className="form-group fv-plugins-icon-container">
            <h5 className="font-bold">Email Address</h5>
            <input
              placeholder="email@domain.com"
              type="email"
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
          <div className="form-group fv-plugins-icon-container">
          <h5 className="font-bold">PASSWORD</h5>
            <input
              placeholder="********"
              type="password"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "password"
              )}`}
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.password}</div>
              </div>
            ) : null}
          </div>
          <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
            
            <button
              id="kt_login_signin_submit"
              type="submit"
              disabled={formik.isSubmitting}
              className={`login-button`}
            >
              <span><FormattedMessage id="AUTH.LOGIN.BUTTON" /></span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </button>
              <div className="authActionBlk">
                <Link
                  to="/auth/forgot-password"
                  className="forgot-password font-bold pull-left"
                  id="kt_login_forgot"
                >
                  <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                </Link>
                <Link 
                  to="/auth/registration" 
                  className="forgot-password font-bold pull-right" 
                  id="kt_login_signup"
                >
                  <FormattedMessage id="AUTH.ORREGISTER.TITLE" />
                </Link>
              </div>
            
          </div>
        </form>

        
        {/*end::Form*/}
      </div>
      
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
