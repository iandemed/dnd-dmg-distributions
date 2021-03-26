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
            inputBox.current.addEventListener('touchmove', onScrub)
        } else {
            inputBox.current.removeEventListener('mousemove', onScrub)
            inputBox.current.removeEventListener('touchmove', onScrub)
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
        let delta = (e.type !== "touchmove") ? (e.clientX - lastX)/10 : (e.targetTouches[0].clientX  - lastX)/10

        let tgt_value = stateVar+Math.round(delta)

        console.log(tgt_value)

        if (tgt_value >= min_value) setStateVar(tgt_value)

        e.stopPropagation()
        if (e.type !== "touchmove") e.preventDefault()
    }

    const handleStartScrub = (e) => {
        
        if (e.target === numInput.current) return

        let newLastX =  (e.type !== "touchstart") ? e.clientX : e.targetTouches[0].clientX

        setLastX(newLastX)
        setScrubbing(true)

        e.stopPropagation()
        if (e.type !== "touchstart") {
            e.preventDefault()
        }
    }


    const handleStopScrub = (e) =>{

        if (e.target === numInput.current && !scrubbing) return

        setScrubbing(false)
        
        e.stopPropagation()
        if (e.type !== "touchend") e.preventDefault()
        
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
        onMouseDown={handleStartScrub}
        onTouchStart={handleStartScrub}
        onMouseUp={handleStopScrub}
        onTouchEnd={handleStopScrub}
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