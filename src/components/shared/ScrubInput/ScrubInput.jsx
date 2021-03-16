import React, {useState} from 'react'

import './ScrubInput.css'

const ScrubInput = () => {

    const [val, setVal] = useState(12)
    
    // Using a side-effect rather than a state variable
    let lastX = 0
    
    const scrub = (e) =>
    {
        let num = (e.clientX - lastX)/10
        console.log(num)

    }

    const handleMouseDown = (e) =>
    {
    
        console.log("Mouse Down")
        const inputBox=e.target

        lastX = e.clientX

        inputBox.addEventListener('mousemove', scrub)
        

        e.preventDefault()
    }

    // Stop dragging once we leave the box to prevent calling and MouseUp event
    // on the document
    const handleMouseLeave = (e) => {

        console.log("Mouse Left")

        const input = e.target.children[0]
        input.blur()
        
        const inputBox = e.target
        inputBox.removeEventListener('mousemove',scrub)
        
        e.preventDefault()

        
    }

    const handleMouseUp = (e) =>{

        console.log("Mouse Up")
        const inputBox = e.target
        
        inputBox.removeEventListener('mousemove',scrub)

        e.preventDefault()
    }



    const inputFillStyle = {
        height: '100%',
        backgroundColor: '#6B6B6B',
        width: `${Math.min((val/35)*100, 100)}%`,
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
        >
            
            <label className="input-label">
                Test:
                <input
                    className="input"
                    type="number" 
                    min="1" 
                    step="1" 
                    value={val}
                    onChange={(e) => {
                        setVal(e.target.value)
                        console.log(Math.min(val/35*100, 100))
                    }}
                />
            </label>
            <div style={inputFillStyle}></div>
            <div className="input-background"></div>

        </div>
    )    

}

export default ScrubInput