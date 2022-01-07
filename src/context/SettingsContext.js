import { useState, createContext } from "react";

export const SettingsContext = createContext()

function SettingsContextProvider(props) {

    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExecuting] = useState({})
    const [startAnimate, setStartAnimate] = useState(false)

    function setCurrentTimer (active_state) {
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }

    // start animation fn 
    function startTimer() {
        setStartAnimate(true)
    }
    // pause animation fn 
    function pauseTimer() {
    setStartAnimate(false)
    }
    // pass time to counter 
    const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    if(seconds < 10 || minutes < 10)
    {
        if(seconds < 10 && minutes < 10)
        {
            return `0${minutes}:0${seconds}`
        }else if(seconds < 10)
        {
            return `${minutes}:0${seconds}`

        }
        else if(minutes < 10)
        {
            return `0${minutes}:${seconds}`
            
        }
        

    }else
    {
        return `${minutes}:${seconds}`

    }
    
    }

    // clear session storage 
    const SettingsBtn = () => {
        setExecuting({})
        setPomodoro(0)
    }

    const updateExecute = updatedSettings => {
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
    }

    const setTimerTime = (evaluate) => {
        switch (evaluate.active) {
            case 'work':
                setPomodoro(evaluate.work)
                break;
            case 'short':
                setPomodoro(evaluate.short)
                break;
                default:
                    setPomodoro(0)
                break;
        }
    }

    function stopAimate() {
        setStartAnimate(false)
    }

    return (
        <SettingsContext.Provider value={{
            pomodoro, 
            executing,
            updateExecute, 
            startAnimate, 
            startTimer,
            pauseTimer,
            children,
            SettingsBtn,
            setCurrentTimer,
            stopAimate
        }}>
            {props.children}
        </SettingsContext.Provider>
    )

}

export default SettingsContextProvider