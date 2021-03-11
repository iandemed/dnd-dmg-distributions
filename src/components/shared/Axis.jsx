import React from "react"
import *  as d3 from 'd3'
import { useChartDimensions } from "./Chart"

const axisComponentsByDimension = {
    x: AxisHorizontal,
    y: AxisVertical,
}


const Axis = ({ dimension, scale, ...props}) => {
    const dimensions = useChartDimensions()
    const Component = axisComponentsByDimension[dimension] 
    if (!Component) return null  

    
    return (
        <Component 
            {...props}
            dimensions={dimensions}
        />
    )
}

function AxisHorizontal({dimensions, label, formatTick, scale, ...props}){

    // Programitcally generate the number of ticks
    const numberOfTicks = dimensions.boundedWidth < 600
        ? dimensions.boundedWidth / 100
        : dimensions.boundedWidth / 250

    const ticks = scale.ticks(numberOfTicks)

    
    return(
        <g 
            className="Axis AxisHorizontal"
            transform={`translate(0, ${dimensions.boundedHeight})`}
            {...props}
        >
            <line
                className="Axis__line"
                x2={dimensions.boundedWidth}
            />

            {ticks.map((tick, i) => {
                <text
                    key={tick}
                    className="Axis__tick"
                    transform={`translate(${scale(tick)}, 25)`}
                >
                    {formatTick(tick)}
                </text>
            })}

            {label && (
                // 60 is an arbitrary number of pixels
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

function AxisVertical({dimensions, label, formatTick, scale, ...props}){

    // Programitcally generate the number of ticks
    const numberOfTicks = dimensions.boundedWidth / 70

    const ticks = scale.ticks(numberOfTicks)
    
    return(
        <g 
            className="Axis AxisHorizontal"
            {...props}
        >
            <line
                className="Axis__line"
                y2={dimensions.boundedHeight}
            />

            {ticks.map((tick, i) => {
                <text
                    key={tick}
                    className="Axis__tick"
                    transform={`translate(-16, ${scale(tick)})`}
                >
                    {formatTick(tick)}
                </text>
            })}

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

export default Axis