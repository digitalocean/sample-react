/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState ,useMemo, useEffect} from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import {Dropdown} from "react-bootstrap";
import {useHtmlClassService} from "../../../layout";
import {DropdownMenu4, DropdownCustomToggler} from "../../dropdowns";
import {KTUtil} from "../../../_assets/js/components/util";


function getChartOptions(layoutProps, height) {
  const options = {
    series: [95],
    chart: {
      height: height,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%"
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false,
            fontWeight: "700",
          },
          value: {
            color: layoutProps.colorsGrayGray700,
            fontSize: "30px",
            fontWeight: "700",
            offsetY: 12,
            show: true
          },
        },
        track: {
          background: layoutProps.colorsThemeLightSuccess,
          strokeWidth: '100%'
        }
      }
    },
    colors: [layoutProps.colorsThemeBaseSuccess],
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"]
  };
  return options;
}

export function MixedWidget14({ className }) {
  const uiService = useHtmlClassService();

  const [state , setState] = useState({
    ctrcolor: 'ctr100'
  });

  const layoutProps = useMemo(() => {
      return {
        colorsGrayGray100: objectPath.get(uiService.config, "js.colors.gray.gray100"),
        colorsGrayGray700: objectPath.get(uiService.config, "js.colors.gray.gray700"),
        colorsThemeBaseSuccess: objectPath.get(
            uiService.config,
            "js.colors.theme.base.success"
        ),
        colorsThemeLightSuccess: objectPath.get(
            uiService.config,
            "js.colors.theme.light.success"
        ),
        fontFamily: objectPath.get(uiService.config, "js.fontFamily")
      };
  }, [uiService]);

  useEffect(() => {
      const element = document.getElementById("kt_mixed_widget_14_chart");
      if (!element) {
        return;
      }

      const height = parseInt(KTUtil.css(element, 'height'));
      const options = getChartOptions(layoutProps, height);
      const ctr = options.series;
      if(ctr > 90) {
        setState({ctrcolor: 'ctr90p'});
      } else if (ctr > 70) {
        setState({ctrcolor: 'ctr70p'});
      } else if (ctr > 50) {
        setState({ctrcolor: 'ctr50p'});
      } else if (ctr > 40) {
        setState({ctrcolor: 'ctr40p'});
      } else if (ctr > 25) {
        setState({ctrcolor: 'ctr25p'});
      } else {
        setState({ctrcolor: 'ctrlow'});
      }

      const chart = new ApexCharts(element, options);
      chart.render();
      return function cleanUp() {
        chart.destroy();
      };
  }, [layoutProps]);

  return (
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title font-weight-bolder ">CTR (Click Through Rate)</h3>
        <div className="card-toolbar"></div>
      </div>
      <div className="card-body">
        <div className="flex-grow-1">
          <div id="kt_mixed_widget_14_chart" className={state.ctrcolor} style={{height: "200px"}}></div>
        </div>
      </div>
    </div>
  );
}