import React, { useState, useEffect } from "react";
import {toAbsoluteUrl} from "../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { FormattedMessage} from "react-intl";
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import {connect,useSelector,useDispatch} from 'react-redux';
import * as auth from "../../modules/Auth/_redux/authRedux";
import Select from '@material-ui/core/Select';
import { useFormik } from "formik";
import * as Yup from "yup";
import '../../../_metronic/_assets/css/Profile.scss';
import BlockUI from '../Component/BlockUI';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Profile(props) {
  
  const {user} = useSelector(state => state.auth);
  const globalState  = useSelector(state=>state.auth)
  //const {img_path} = useSelector(state => state.auth.p_img_path);
  //console.log(user)

  const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		container: {
		    display: 'flex',
		    flexWrap: 'wrap',
		},
		textField: {
		    marginLeft: theme.spacing(1),
		    marginRight: theme.spacing(1),
		}
  }));
  const classes = useStyles();

  const [initialValues, setInitialValues] = useState({ 
    name:user.name ? user.name : "",
    email:user.email ? user.email : "",
    phone:user.phone ? user.phone : "",
    mobile:user.mobile ? user.mobile : "",
    time_zone:user.time_zone ? user.time_zone : "+5:+00",
    address_line_1:user.address_line_1 ? user.address_line_1 : "",
    city:user.city ? user.city : "",
    state:user.state ? user.state : "",
    country:user.countrycode ? user.countrycode : "PK",
    avatar:user.image ? user.image : "/media/users/blank.png",
  });

  
  const [values, setValues] = React.useState({
    name:user.name ? user.name : "",
    email:user.email ? user.email : "",
    phone:user.phone ? user.phone : "",
    mobile:user.mobile ? user.mobile : "",
    time_zone:user.time_zone ? user.time_zone : "+5:+00",
    address_line_1:user.address_line_1? user.address_line_1 : "",
    city:user.city ? user.city : "",
    state:user.state ? user.state : "",
    country:user.countrycode ? user.countrycode : "PK",
    profile_avatar: "",
  });

  const [state, setState] = useState({
      avatar:user.image ? user.image : "/media/users/blank.png",
      selectedFile:"",
      base64TextString: "",
      loader: false,
      userImg: user.image
  });

  const setAvatar = event => {
    var m = new FileReader();
    m.onload = function(e){
      setState({...state,avatar: e.target.result})
    };
    m.readAsDataURL(event.target.files[0]);
    setState({...state, selectedFile: event.target.files[0], loader: true})
    var file = event.target.files[0];
    props.uploadProfileImg({user: user.id, type: 1, imageData: file});
    setTimeout(() => {
      var pro_img_test = "media/users/blank.png";
      var pro_img = "https://qbamplify28dfd7dbf2d74855b5d33dbe680fccd4113822-dev.s3.amazonaws.com/public/qbweb/uploads/user/profile/"+user.id+"/image/user.jpg";
      //globalState.user.image = pro_img;
      user.image = String(pro_img);
      setTimeout(() => {
        swal({
          title: "Photo Updated",
          text: "Profile Photo successfully updated!",
          icon: "success",
          button: null,
          timer: 2500
          });
          setState({...state, loader:false, userImg:pro_img});
          //window.location.reload(false)
        }, 1000);
    }, 4000);
  }

    const history = useHistory();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    setState({ ...state, [name]: event.target.value });
  };
  function goBack() {
    history.goBack();
  }
  const timezone = [
      {
          value: '-12:-00',
          label: '(GMT -12:00) Eniwetok, Kwajalein',
        },
        {
          value: '-11:-00',
          label: '(GMT -11:00) Midway Island, Samoa',
        },
        {
          value: '-10:-00',
          label: '(GMT -10:00) Hawaii',
        },
        {
          value: '-9:-00',
          label: '(GMT -9:00) Alaska',
        },
        {
          value: '-8:-00',
          label: '(GMT -8:00) Pacific Time (US &amp; Canada)',
        },
        {
          value: '-7:-00',
          label: '(GMT -7:00) Mountain Time (US &amp; Canada)',
        },
        {
          value: '-6:-00',
          label: '(GMT -6:00) Central Time (US &amp; Canada), Mexico City',
        },
        {
          value: '-5:-00',
          label: '(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima',
        },
        {
          value: '-4:-00',
          label: '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
        },
        {
          value: '-3:-30',
          label: '(GMT -3:30) Newfoundland',
        },
        {
          value: '-3:-00',
          label: '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
        },
        {
          value: '-2:-00',
          label: '(GMT -2:00) Mid-Atlantic',
        },
        {
          value: '-1:-00',
          label: '(GMT -1:00) Azores, Cape Verde Islands',
        },
        {
          value: '-00:00',
          label: '(GMT 00:00) Western Europe Time, London, Lisbon, Casablanca',
        },
        {
          value: '+1:+00',
          label: '(GMT +1:00)  Brussels, Copenhagen, Madrid, Paris',
        },
        {
          value: '+2:+00',
          label: '(GMT +2:00) Kaliningrad, South Africa',
        },
        {
          value: '+3:+00',
          label: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
        },
        {
          value: '+3:+30',
          label: '(GMT -3:30) Tehran',
        },
        {
          value: '+4:+00',
          label: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
        },
        {
          value: '+4:+30',
          label: '(GMT +4:30) Kabul',
        },
        {
          value: '+5:+00',
          label: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
        },
        {
          value: '+5:+30',
          label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
        },
        {
          value: '+6:+00',
          label: '(GMT +6:00) Almaty, Dhaka, Colombo',
        },
        {
          value: '+7:+00',
          label: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
        },
        {
          value: '+8:+00',
          label: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
        },
        {
          value: '+9:+00',
          label: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
        },
        {
          value: '+9:+30',
          label: '(GMT +9:30) Adelaide, Darwin',
        },
        {
          value: '+10:+00',
          label: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
        },
        {
          value: '+11:+00',
          label: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
        },
        {
          value: '+12:+00',
          label: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
        }
  ];

    const [loading, setLoading] = useState(false);

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

  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
      .required("Enter Fullname"),
    mobile: Yup.string()
    .required("Enter Mobile Nuber"),
	}); 
  
  const formik = useFormik({
      initialValues,
    	validationSchema: ProfileSchema,
      onSubmit: (values, { setStatus, setSubmitting }) => {

        props.getUpdateProfile ({
          user_id: user.id,
          name: values.name,
          phone: values.phone,
          mobile: values.mobile,
          address_line_1: values.address_line_1,
          city: values.city,
          state: values.state,
          countrycode: values.country,
          time_zone : values.time_zone
        });
        
      console.log(`
        user_id: ${user.id}.
        name: ${values.name}.
        phone: ${values.phone}.
        mobile: ${values.mobile}.
        address_line_1: ${values.address_line_1}.
        city: ${values.city}.
        state: ${values.state}.
        countrycode: ${values.country}.
        time_zone : ${values.time_zone}.
      `);  
      setTimeout(() => {
        swal({
          title: "Profile Updated",
          text: "User Profile successfully updated!",
          icon: "success",
          button: null,
          timer: 2500
          });
      }, 1000);
      },
  });

	const [allcountries, setdata] = useState([]);

	useEffect( ()=>{
        setdata(globalState.user_countries)
        //console.log(globalState)
	});
	useEffect( ()=>{
		props.getUserCountries()
  } , []); 
 
  return <>
    <div className="row profilePage">
      {
        globalState.is_loading == false ? 
        <></>
        :<BlockUI />
      }
        <div role="alert" className="alert alert-custom alert-white alert-shadow gutter-b col-md-12 page-desc">
            <div className="alert-text">
                <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Address-card.svg")}/>
                </span> 
                <span>
                    <FormattedMessage id="PAGE.USERPROFILE.DESC" />
                </span>
                <span className="svg-icon menu-icon goBack" onClick={goBack}>
                    <i className="fa fa-long-arrow-alt-left"></i>
                </span>
            </div>
        </div>

        <div className="card card-custom card-stretch col-md-12">
			
          <div className="card-header py-3">
            <div className="card-title align-items-start flex-column">
              <h3 className="card-label font-weight-bolder text-dark">Personal Information</h3>
                        <span className="text-muted font-weight-bold font-size-sm mt-1">Update your personal informaiton</span>
                    </div>
            <div className="card-toolbar">
            </div>
          </div>

            <div className="card-body">
                
              <div className="form-group row">
                    <label className="col-xl-3 col-lg-3">Avatar</label>
                    <div className="col-xl-6 col-lg-6">
                      <div className="image-input image-input-outline" id="kt_profile_avatar">
                            <img src={state.avatar} className="image-input-wrapper" />
                            <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="Change avatar" data-original-title="Change avatar">
                                <i className="fa fa-pen icon-sm text-muted"></i>
                                <input type="file" name="profile_avatar" value={values.profile_avatar} onChange={setAvatar} accept=".png, .jpg, .jpeg" />
                                <input type="hidden" name="profile_avatar_remove" />
                            </label>
                        </div>
                        <span className="form-text text-muted">Allowed file types:  png, jpg, jpeg.</span>
                    </div>
                </div>
                <h3>{user.token}</h3>
                <form 
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  className="form-offer form fv-plugins-bootstrap fv-plugins-framework"
                >
                    {formik.status ? (
						          <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
						            <div className="alert-text font-weight-bold">{formik.status}</div>
						          </div>
						        ) : (
						          <div>
						          </div>
						        )}
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Fullname</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="name"
                                type="text"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "name"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("name")}
                                value={values.name}
                                {...formik.getFieldProps("name")}
                            />
                            {formik.touched.name && formik.errors.name ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.name}</div>
                              </div>
                            ) : null}
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Name Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Email Address</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                disabled
                                name="email"
                                label="Email Address"
                                type="email"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "email"
                                )}`}
                                value={values.email}
                                variant="outlined"
                            />
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Email Address Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Phone No</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="phone"
                                type="text"
                                className={`form-control  h-auto py-0 px-0 ${getInputClasses(
                                  "phone"
                                )}`}
                                value={values.phone}
                                variant="outlined"
                                onChange={handleChange("phone")}
                                {...formik.getFieldProps("phone")}
                            />
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Phone No Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Mobile No</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="mobile"
                                type="text"
                                className={`form-control h-auto py-0 px-0 ${getInputClasses(
                                  "mobile"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("mobile")}
                                value={values.mobile}
                                {...formik.getFieldProps("mobile")}
                            />
                            {formik.touched.mobile && formik.errors.mobile ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.mobile}</div>
                              </div>
                            ) : null}
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Mobile No Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row profileTime">
                        <label className="col-xl-3 col-lg-3 col-form-label">Time Zone</label>
                        <div className="col-xl-6 col-lg-6">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="time_zone">
                                    Select Timezone
                                </InputLabel>
                                <Select
                                    name="time_zone"
                                    className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                        "time_zone"
                                    )}`}
                                    variant="outlined"
                                    MenuProps={MenuProps}
                                    input={<OutlinedInput labelWidth={labelWidth} name="time_zone" id="time_zone" />}
                                    onChange={handleChange("time_zone")}
                                    value={values.timezone}
                                    {...formik.getFieldProps("time_zone")}
                                >
                                    {timezone.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Country Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">Address</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="address_line_1"
                                type="text"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "address_line_1"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("address_line_1")}
                                value={values.address_line_1}
                                {...formik.getFieldProps("address_line_1")}
                            />
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Address Line 1 Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">City</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="city"
                                type="text"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "city"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("city")}
                                value={values.city}
                                {...formik.getFieldProps("city")}
                            />
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User City Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">State</label>
                        <div className="col-xl-6 col-lg-6">
                            <TextField
                                name="state"
                                type="text"
                                className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                  "state"
                                )}`}
                                variant="outlined"
                                onChange={handleChange("state")}
                                value={values.state}
                                {...formik.getFieldProps("state")}
                            />
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User State Helping Text
                            </p>
                        </div>
                    </div>
                    <div className="fieldBlk form-group row profileCountry">
                        <label className="col-xl-3 col-lg-3 col-form-label">Country</label>
                        <div className="col-xl-6 col-lg-6">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={inputLabel} htmlFor="country">
                                    Select Country
                                </InputLabel>
                                <Select
                                    name="country"
                                    className={`form-control h-auto py-0 px-0  ${getInputClasses(
                                        "country"
                                    )}`}
                                    variant="outlined"
                                    MenuProps={MenuProps}
                                    input={<OutlinedInput labelWidth={labelWidth} name="country" id="country" />}
                                    onChange={handleChange("country")}
                                    value={values.country}
                                >
                                    {allcountries.map(option => (
                                        <MenuItem key={option.country_code} value={option.country_code}>
                                        {option.country_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <p className="MuiFormHelperText-root MuiFormHelperText-contained">
                                User Country Helping Text
                            </p>
                        </div>
                    </div>
                    
                    <div className="fieldBlk form-group row class-submit">
                      <label className="col-xl-3 col-lg-3 col-form-label"></label>
                      <div className="col-xl-6 col-lg-6">
                          <Button 
                            type="submit"
                            //disabled={formik.isSubmitting}
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                          >
                              Update 
                              {loading && <span className="ml-3 spinner spinner-white"></span>}
                          </Button>
                          <Button variant="contained" className={classes.button} onClick={goBack}>
                              Cancel
                          </Button>
                      </div>
			              </div>
              </form>
                
            </div>

		</div>

    </div>
  </>;
}

export default connect(null, auth.actions)(Profile);