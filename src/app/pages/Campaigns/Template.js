import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { makeStyles } from '@material-ui/core/styles';

// import templates from "../Component/templates.json";
import templates from "../Component/templates.json";
import Button from '@material-ui/core/Button';
import {API_URL} from "../../Constants";

const initialValues = {
  random: "1",
  section: "1",
  brand: "1",

};

export function Template() {

	const history = useHistory();

  function addTemplate() {
    history.push('/campaigns/my-templates');
  }

    const useStyles = makeStyles(theme => ({
		container: {
		    display: 'flex',
		    flexWrap: 'wrap',
		},
		textField: {
		    marginLeft: theme.spacing(1),
		    marginRight: theme.spacing(1),
		},
		dense: {
		    marginTop: theme.spacing(2),
		},
		menu: {
		    width: 200,
		},
	}));

    const classes = useStyles();
    const [values, setValues] = React.useState({
	    random: 'RANDOM',
	    section: 'ALL-SECTIONS',
	    brand: 'ALL-BRANDS',
	});
    const [state, setState] = React.useState({
	      items: [],
	      visible: 9,
	      error: false,
        count:0,
        element:'',
        cat:''
	});

	const handleChange = name => event => {
    	setValues({ ...values, [name]: event.target.value });
      setState({ ...state, [name]: event.target.value, });
      var target = event.target.value;
      console.log(target);
	};

    const random = [
      {
        value: 'RANDOM',
        label: 'RANDOM',
      },
      {
        value: 'NEW',
        label: 'NEW',
      },
      {
        value: 'POPULAR',
        label: 'MOST POPULAR',
      },
      {
        value: 'RECOMMENDED',
        label: 'RECOMMENDED',
      }
  	];

    const section = [
      {
        value: 'ALL-SECTIONS',
        label: 'ALL',
      },
      {
        value: 'NAVIGATION',
        label: 'NAVIGATION',
      },
      {
        value: 'HEADER',
        label: 'HEADER',
      },
      {
        value: 'INTRO',
        label: 'INTRO',
      },
      {
        value: '1-COLUMN',
        label: '1 COLUMN',
      },
      {
        value: '2-COLUMN',
        label: '2 COLUMN',
      },
      {
        value: '3-COLUMN',
        label: '3 COLUMN',
      },
      {
        value: 'BANNER',
        label: 'BANNER',
      },
      {
        value: 'OUTER',
        label: 'OUTER',
      },
      {
        value: 'FOOTER',
        label: 'FOOTER',
      },
      {
        value: 'UNSUBSCRIBE',
        label: 'UNSUBSCRIBE',
      }
  	];

    const brand = [
      {
        value: 'ALL-BRANDS',
        label: 'ALL',
      },
      {
        value: 'Architectural',
        label: 'Architectural',
      },
      {
        value: 'Art',
        label: 'Art',
      },
      {
        value: 'Baby',
        label: 'Baby',
      },
      {
        value: 'Beauty',
        label: 'Beauty',
      },
      {
        value: 'Business',
        label: 'Business',
      },
      {
        value: 'Cars-Bikes',
        label: 'Cars & Bikes',
      },
      {
        value: 'Clothes',
        label: 'Clothes',
      },
      {
        value: 'Creative',
        label: 'Creative',
      },
      {
        value: 'Development',
        label: 'Development',
      },
      {
        value: 'Education',
        label: 'Education',
      },
      {
        value: 'Entertainment',
        label: 'Entertainment',
      }
  	];


    useEffect(()=> {
      let mounted = true;
  
      var tempID = {id:1};
      fetch(API_URL + 'api/templates' , {
        method: "GET",
      }).then(r => r.json().then(data => {
        if(mounted) {
          setState({items: data.templates, visible: 9})
        }
      } ))
      .catch(e => e);
  
    return () =>  mounted = false;
    },[])




  	function loadMore() {
	  	setState((prevState) => ({
	  		...prevState,
		  	visible: prevState.visible + 9
		}));
	 }


	const  viewTeplate = (id, e) => {
	    e.preventDefault();
	    history.push({
		  	pathname: '/campaigns/template/view/'+id,
		  	state: {
		  		id: id,
		  	}
		});
		console.log(id);
  }
  
  const promotion = () => {
    var template = templates;
    console.log(template);
  }
  const creative = () => {
    console.log("creative");
  }
  const business = () => {
    console.log("business");
  }
  const populair = () => {
    console.log("populair");
  }

	return (<>
		<div className="row" id="modules-filter">	
			<div className="col-md-12 slides-section">
				<div className="row">
					<div className="col-md-8">
						<AliceCarousel autoPlay={true} autoPlayInterval={3000} autoPlayDirection="ltr">
						    <img src="/media/template/banner1.png" className="sliderimg" alt=""/>
						    <img src="/media/template/banner2.png" className="sliderimg" alt=""/>
						    <img src="/media/template/banner3.png" className="sliderimg" alt=""/>
						</AliceCarousel>
					</div>
					<div className="col-md-4">
						<div id="store-header-sections">
							<ul className="header-sections clear-fix">
								<li data-section="1" data-dropdown-type-value="Promotions" onClick={promotion}>
									<div className="section">
										<div className="section-caption">
											<h4 className="font-archivo">Promotions</h4>
											<h6 className="font-bold">261 modules</h6>
										</div>
									</div>
								</li>
								<li data-section="2" data-dropdown-type-value="Creative" onClick={creative}>
									<div className="section">
										<div className="section-caption">
											<h4 className="font-archivo">Creative</h4>
											<h6 className="font-bold">269 modules</h6>
										</div>
									</div>
								</li>
								<li data-section="3" data-dropdown-type-value="Business" onClick={business}>
									<div className="section">
										<div className="section-caption">
											<h4 className="font-archivo">Business</h4>
											<h6 className="font-bold">391 modules</h6>
										</div>
									</div>
								</li>
								<li data-section="4" data-dropdown-type-value="Most Populair" onClick={populair}>
									<div className="section">
										<div className="section-caption">
											<h4 className="font-archivo">Most Popular</h4>
											<h6 className="font-bold">Discover them now</h6>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			
			{/* <div className="col-md-12 all-template-filter-Blk">
				<TextField
            select
            name="random"
            variant="outlined"
            className={classes.textField}
            value={values.random}
            onChange={handleChange('random')}>
            {random.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>

        <TextField
            select
            name="section"
            variant="outlined"
            className={classes.textField}
            value={values.section}
            onChange={handleChange('section')}
        >
            {section.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>

        <TextField
            select
            name="brand"
            variant="outlined"
            className={classes.textField}
            value={values.brand}
            onChange={handleChange('brand')}
        >
            {brand.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
			</div> */}

			<div className="col-md-12">
        <img src="/media/bg/02.png" />
        <section className="templateFeed feeds hide">
          <div className="tiles" aria-live="polite">
            {state.items.slice(0, state.visible).map((item, index) => {
                return (
                  <div className="tile fade-in" key={index} value={item.id}>
                    <div className="imageBlk" value={index+1}  onClick={(e) => viewTeplate(item.id, e)}>
                      <img src={API_URL + "templates/templates/" + item.name + "/thumbnail.png"} height="auto" width="100%" /></div>
                    <div className="feedBase"><span className="tempTitle" value={index+1}  onClick={(e) => viewTeplate(item, e)}>{item.title}</span> <Button variant="contained" className="add-template" onClick={addTemplate}><i className="flaticon2-plus icon-1x"></i> Add Template</Button></div>
                  </div>
                );
              })}
          </div>
          {state.visible < state.items.length &&
                <Button variant="contained" className='load-more' onClick={loadMore}> Load more </Button>
            }
        </section>
      </div>

		</div>
	</>);

}