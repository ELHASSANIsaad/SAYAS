import React, { useContext, useState } from 'react'
import { SettingsContext } from '../context/SettingsContext'

const SetPomodoro = () => {

    const [newTimer, setNewTimer] = useState({
        work: 90.00,
        short: 5.00,
        long: 15.00,
        active: 'work'
    })

    const {updateExecute} = useContext(SettingsContext)

    const handleChange = input => {
        const {name, value} = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        updateExecute(newTimer)
    }
    const mystyle = {
        color: "white",
        backgroundColor: "#303553",
        padding: "10px",
        fontFamily: "Arial",
        height: "80px",
        width: "80px",
        color: "#C9CCEA",
        border: "none",
  
      };
    return (

       
        <div className="form-container">
            <form noValidate onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <p>focus session &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   break</p>
                    <input className="input" type="number" name="work" onChange={handleChange} value={newTimer.work} />
                    <select className="inputchoose" name="work" id="cars" onChange={handleChange} value={newTimer.work} multiple style={mystyle}>
                        <option value="120">120</option>
                        <option value="90">90</option>
                        <option value="60">60</option>
                        <option value="40">40</option>
                        <option value="20">20</option>                        
                    </select>
                    <input className="input" type="number" name="shortBreak" onChange={handleChange} value={newTimer.short} />
                    <select class="inputchoose" name="shortBreak" id="cars" onChange={handleChange} value={newTimer.short} multiple style={mystyle}>
                        <option value="15">15</option>
                        <option value="10">10</option>
                        <option value="5">5</option>
                        <option value="3">3</option>                        
                    </select>
                    
                </div>
                

                <button type='submit'>Set Timer</button>
            </form>
        </div>
    )
}

export default SetPomodoro