import React from "react"
import *  as d3 from 'd3'
import { useChartDimensions } from "./Chart"

const axisComponentsByDimension = {
    x: AxisHorizontal,
    y: AxisVertical,
}

/*
    It is important to note that the tick marks are manually adjusted within
    the respective Axis Horizontal and Axis Vertical functions ---- if you would
    like to adjust the ticks or title consult the corresponding transform option
    for the respective tags
*/

const Axis = ({ dimension, ...props }) => {
    const dimensions = useChartDimensions()
    const Component = axisComponentsByDimension[dimension]
    if (!Component) return null
  
    return (
      <Component
        dimensions={dimensions}
        {...props}
      />
    )
}

Axis.defaultProps = {
    dimension: "x",
    scale: null,
    formatTick: d3.format(","),
  }

  export default Axis


  function AxisHorizontal ({ dimensions, label, formatTick, scale, ...props }) {
    const numberOfTicks = dimensions.boundedWidth < 600
          ? dimensions.boundedWidth / 75
          : dimensions.boundedWidth / 125
  
    const ticks = scale.ticks(numberOfTicks)
  
    return (
      <g className="Axis AxisHorizontal" transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
        <line
          className="Axis__line"
          x2={dimensions.boundedWidth}
        />
  
        {/*---- Add the ticks ----*/}
        {ticks.map((tick, i) => (
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(${scale(tick)}, 25)`}
          >
            { formatTick(tick) }
          </text>
        ))}
  
        {/*---- Add the label ----*/}
        {label && (
          <text
            className="Axis__label"
            transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
          >
            { label }
          </text>
        )}
      </g>
    )
  }
  
  function AxisVertical ({ dimensions, label, formatTick, scale, ...props }) {
    const numberOfTicks = dimensions.boundedHeight / 70
  
    const ticks = scale.ticks(numberOfTicks)
  
    return (
      <g className="Axis AxisVertical" {...props}>
        <line
          className="Axis__line"
          y2={dimensions.boundedHeight}
        />
  
        {/*---- Add the ticks ----*/}
        {ticks.map((tick, i) => (
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(-34, ${scale(tick)})`}
          >
            { formatTick(tick) }
          </text>
        ))}
  
        {/*---- Add the label ----*/}
        {label && (
          <text
            className="Axis__label"
            style={{
              transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`
            }}
          >
            { label }
          </text>
        )}
      </g>
    )
  }