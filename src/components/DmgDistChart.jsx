import React from 'react'
import * as d3 from "d3"

import '../styles/DmgDistChart.css';

import Chart from "./shared/Chart"
import Bars from "./shared/Bars"
import Axis from "./shared/Axis"

import {useChartDimensions} from '../scripts/utils'

/**
 * React component to generate a histogram using D3
 * 
 * @param {Object} data - a JSON-formated object containing the data that you wish to visualize
 * @param {function} xAccessor - An accessor function for the data displayed on the x-axis
 * @param {string} label - X-axis label
 * 
 * @returns React element object
 * 
 * @requires Chart - React component used to create the canvas
 * @requires Axis - React component used to draw the axes
 * @requires Bars - React component used to draw the bars of the histogram
 * 
 */

const DmgDistChart = ({data, xAccessor, label}) => {
  

  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
    marginRight: 10
  })

    /* Set the number of of bars in the generation of our chart */
    const numberOfThresholds = 12

    /*---- Create the scales ----*/
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice(numberOfThresholds)
    
      const binsGenerator = d3.histogram()
        .domain(xScale.domain())
        .value(xAccessor)
        .thresholds(xScale.ticks(numberOfThresholds))

    const bins = binsGenerator(data)

    const yAccessor = d => d.length
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, yAccessor)])
      .range([dimensions.boundedHeight, 0])
      .nice()

    const barPadding = 2

    const xAccessorScaled = d => xScale(d.x0) + barPadding
    const yAccessorScaled = d => yScale(yAccessor(d))
    const widthAccessorScaled = d => xScale(d.x1) - xScale(d.x0) - barPadding
    const heightAccessorScaled = d => dimensions.boundedHeight - yScale(yAccessor(d))
    const keyAccessor = (d, i) => i

    return(
      <div className="DmgDist" ref={ref}>
        {/*---- Draw the Canvas ----*/}
        <Chart dimensions={dimensions}>
          <Axis
            dimensions={dimensions}
            dimension="x"
            scale={xScale}
            label={label}
          />
          <Axis
            dimensions={dimensions}
            dimension="y"
            scale={yScale}
            label="Count"
          />
          <Bars
            data={bins}
            keyAccessor={keyAccessor}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            widthAccessor={widthAccessorScaled}
            heightAccessor={heightAccessorScaled}
          />
        </Chart>
      </div>
    )

}

DmgDistChart.defaultProps = {
  xAccessor: d => d.x,
  yAccessor: d => d.y,
}

export default DmgDistChart