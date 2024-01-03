import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


function App() {
  const [count, setCount] = useState(0)
  const [checkDays, setCheckDays] = useState({"Su": false, "Mo": false, "Tu": false, "We": false, "Th": false, "Fr": false, "Sa": false})
  const [startDay, setStartDay] = useState("")
  const [endDay, setEndDay] = useState("")
  const [trips, setTrips] = useState (0)

  function handleChange(e){
    setCheckDays({...checkDays, [e.target.id]: e.target.checked})
  }
  
  function handleStart(e){
    setStartDay(dayjs(e.$d))
  }
  function handleEnd(e){
    setEndDay(dayjs(e.$d))
  }

  const calcTrips = (e) => {
    e.preventDefault()

    let tempDays = endDay.diff(startDay, 'd')
    let trips = 0
    for (let i=0; i < tempDays+1; i++)
    {
      let thisDay = (startDay.add(i, 'day').format('dd'))
      if(checkDays[thisDay]){
        trips++;
      }
    }

    setTrips(trips)

  }

  return (
    <>
    Start Date
    <DatePicker label="Start" onChange={handleStart} defaultValue={dayjs('2024-01-01')} />
    End Date
    <DatePicker label="End" onChange={handleEnd} defaultValue={dayjs('2024-01-02')} />    

    <form onSubmit={calcTrips}>
    <label><input id="Su" onChange={handleChange} checked={checkDays.Su} type="checkbox"/>Sunday</label>
    <label><input id="Mo" onChange={handleChange} checked={checkDays.Mo} type="checkbox"/>Monday</label>
    <label><input id="Tu" onChange={handleChange} checked={checkDays.Tu} type="checkbox"/>Tuesday</label>
    <label><input id="We" onChange={handleChange} checked={checkDays.We} type="checkbox"/>Wednesday</label>
    <label><input id="Th" onChange={handleChange} checked={checkDays.Th} type="checkbox"/>Thursday</label>
    <label><input id="Fr" onChange={handleChange} checked={checkDays.Fr} type="checkbox"/>Friday</label>
    <label><input id="Sa" onChange={handleChange} checked={checkDays.Sa} type="checkbox"/>Saturday</label>    
    <button>CalcTrips</button>  
    </form>

    <p>Total Days {trips} and Total Trips if 2 per Day {trips*2}.</p>
    </>
  )
}

export default App
