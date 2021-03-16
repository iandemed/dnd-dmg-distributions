import React, {createContext, useContext} from 'react'

/* 
Create this context to avoid passing a large number of props to other
components that care about the size of the chart (axes, labels, etc.)
*/
const ChartContext = createContext()
export const useChartDimensions = () => useContext(ChartContext)


const Chart = ({dimensions, children}) => {
    
    return(
        <ChartContext.Provider value={dimensions}>
            {/*---- Create the chart tableau ----*/}
            <svg 
                className="Chart"
                width={dimensions.width}
                height={dimensions.height}
            >
                {/*---- Create the bounds of the chart ----*/}
                <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
                    {children}
                </g>
                
            </svg>
        </ChartContext.Provider>
    )
}

export default Chart