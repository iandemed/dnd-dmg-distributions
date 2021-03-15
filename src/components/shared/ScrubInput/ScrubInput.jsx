import React, {useState} from 'react'

import './ScrubInput.css'

const ScrubInput = () => {

    const [val, setVal] = useState(12)

    const inputFillStyle = {
        height: '100%',
        backgroundColor: '#d81921',
        width: `${Math.min((val/35)*100, 100)}%`,
    }

    return(
        <div className="input-container">
           
            <input 
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
                />
            <div style={inputFillStyle}>
            </div>

        </div>
    )    

}

export default ScrubInput