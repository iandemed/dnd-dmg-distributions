import React from "react"
import * as d3 from "d3"

const Line = ({type, data, xAccessor, yAccessor, y0Accessor, interpolation, ...props}) =>{
    
    // Turn our dataset into a d string for our <path>
    const lineGenerator = d3[type]()
        .x(xAccessor)
        .y(yAccessor)
        .curve(interpolation)

    if (type === "area") {
        lineGenerator
            .y0(y0Accessor)
            .y1(yAccessor)
    }
    
    return(
        <path {...props}
            className={`Line Line--type-${type}`}
            d={lineGenerator(data)}
        />
    )
}

export default Line