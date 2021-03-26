import React, {useState, useRef, useCallback, useEffect} from 'react'

import '../../styles/ScrubInput.css'

const ScrubInput = ({label, stateVar, setStateVar, visual_max = 35, min_value = 1}) => {


    /*---- Intialize state variables and references ----*/
    const [lastX, setLastX] = useState(0)
    const [scrubbing, setScrubbing] = useState(false)


    /* 
        Allows me to reference specific elements in the DOM using React, in
        particular attaching and removing the mousemove event listeners
    */
    const inputBox = useRef(null)
    const numInput = useRef(null)
    
    useEffect(() => {
        if (scrubbing) {
            inputBox.current.addEventListener('mousemove', onScrub)
        } else {
            inputBox.current.removeEventListener('mousemove', onScrub)
        }
    }, [scrubbing])

    /* 
        If we do not specify lastX in our dependency array, then it will cache
        the value of lastX on render and use it everytime scrub() is called
    */
    const onScrub = useCallback((e) => { 
        scrub(e)
    }, [lastX])
    
    /*---- Event Handler functions ----*/ 

    const scrub = (e) => {

        let delta = (e.clientX - lastX)/10
        let tgt_value = stateVar+Math.round(delta)

        if (tgt_value >= min_value) setStateVar(tgt_value)

        e.stopPropagation()
        e.preventDefault()

    }

    const handleMouseDown = (e) => {
    
        if (e.target === numInput.current) return

        setLastX(e.clientX)
        setScrubbing(true)

        e.stopPropagation()
        e.preventDefault()
    }


    const handleMouseUp = (e) =>{

        if (e.target === numInput.current && !scrubbing) return
        
        setScrubbing(false)
        
        e.stopPropagation()
        e.preventDefault()
    }

    /*
        Stop dragging once we leave the box to prevent calling and MouseUp event
        on the document.
    */
    const handleMouseLeave = (e) => {
        
        setScrubbing(false)
        
        e.stopPropagation()
        e.preventDefault()
        
    }


    /*---- Generate style and render the componenet ----*/

    /*
        Create a style object in order to programatically adjust the width of
        our div
    */
    const inputFillStyle = {
        height: '100%',
        backgroundColor: '#6B6B6B',
        width: `${Math.min((stateVar/visual_max)*100, 100)}%`,
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,

    }

    return(
        <div 
        className="input-container"
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave} // mouseleave does not bubble, meaning it is fired when pointer has exited element AND all descendants
        ref={inputBox}
        >
            
            <label className="input-label">
                {`${label}:`}
                <input
                    className="input"
                    type="number" 
                    min={min_value} 
                    step="1" 
                    value={stateVar}
                    onChange={(e) => {
                        setStateVar(parseInt(e.target.value)) // need to coerce to int
                    }}
                    ref={numInput}
                />
            </label>
            
            <div style={inputFillStyle}></div>
            <div className="input-background"></div>

            
        </div>
    )    

}

export default ScrubInput