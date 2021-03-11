
import React, {useState, useRef, useEffect} from "react"

/* 
    Helper function so that we can programatically call the different types of 
    Accessors available in d3
*/
export const callAccessor = (accessor, d, i) => (
    typeof accessor === "function" ? accessor(d, i) : accessor
)


/*
  Cobmine the dynamic chart dimensions with the margins that we specified 
  manually.
*/
export const combineChartDimensions = dimensions => {
    let parsedDimensions = {
      marginTop: 40,
      marginRight: 30,
      marginBottom: 40,
      marginLeft: 75,
      ...dimensions,
    }
  
    return {
      ...parsedDimensions,
      boundedHeight: Math.max(parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom, 0),
      boundedWidth: Math.max(parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0),
    }
  }

/*
  Set the chart dimensions based on the current size of the chart and dynamically
  update the bounds as we resize.
*/
export const useChartDimensions = passedSettings => {
    const ref = useRef()
    const dimensions = combineChartDimensions(passedSettings)

    const [width, changeWidth] = useState(0)
    const [height, changeHeight] = useState(0)

    useEffect(() => {
        if (dimensions.width && dimensions.height) return [ref, dimensions]

        const element = ref.current

        /*
            Callback function that resizes our width and height dimensions
            when we resize the window

            ResizeObserver is used to avoid infinite loops and cyclic dependenices 
            when we try to resize with our callback function. See link for 
            additional documentation:
                + https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
        */

        
        const resizeObserver = new ResizeObserver(entries => {
            
            
            // Returns undefined if entries is not an array
            if (!Array.isArray(entries)) return
            // Returns undefined if entries is an empty array
            if (!entries.length) return


            const entry = entries[0]
            
            // Change the width and height of the chart to the current element
            if (width !== entry.contentRect.width) changeWidth(entry.contentRect.width)
            if (height !== entry.contentRect.height) changeHeight(entry.contentRect.height)
        })

        resizeObserver.observe(element)

        return () => resizeObserver.unobserve(element)

    }, [passedSettings, height, width, dimensions])

    const newSettings = combineChartDimensions({
        ...dimensions,
        width: dimensions.width || width,
        height: dimensions.height || height,
    })

    return [ref, newSettings]
}