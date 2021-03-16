import React, {useState} from 'react'

import './ScrubInput.css'

const ScrubInput = () => {

    const [val, setVal] = useState(12)

    const inputFillStyle = {
        height: '100%',
        backgroundColor: '#d81921',
        width: `${Math.min((val/35)*100, 100)}%`,
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,

    }

    return(
        <div className="input-container">
            
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
                    onMouseDown={(e) =>{
                        console.log("Mouse Down")
                    }}
                    style={{}}
                />
            </label>
            <div style={inputFillStyle}></div>
            <div className="input-background"></div>

        </div>
    )    

}

export default ScrubInput