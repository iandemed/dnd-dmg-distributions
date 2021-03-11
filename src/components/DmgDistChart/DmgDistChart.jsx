import React from 'react'
import * as d3 from "d3"

import './DmgDistChart.css';

import Chart from "../shared/Chart"
import Bars from "../shared/Bars"
import Axis from "../shared/Axis"

import {useChartDimensions} from '../../scripts/utils.js'

const DmgDistChart = ({data, xAccessor, label}) => {
    
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 77,
  })

    const numberOfThresholds = 9

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice(numberOfThresholds)
    
      const binsGenerator = d3.histogram()
        .domain(xScale.domain())
        .value(xAccessor)
        .thresholds(xScale.ticks(numberOfThresholds))

    console.log(xScale)

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