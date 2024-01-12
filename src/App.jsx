import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


function App() {
  const [count, setCount] = useState(0)
  const [checkDays, setCheckDays] = useState({"Su": false, "Mo": false, "Tu": false, "We": false, "Th": false, "Fr": false, "Sa": false})
  const [rangeDay, setRangeDay] = useState({"Start": dayjs(), "End": dayjs(), "Last": [] })
  const [endDay, setEndDay] = useState("")
  const [maxTrip, setMaxTrip] = useState(0)
  const [trips, setTrips] = useState (0)
  

  function handleChange(e){
    setCheckDays({...checkDays, [e.target.id]: e.target.checked})
  }
  
  function handleStart(e){
    console.log (e)
    setRangeDay({...rangeDay, "Start": dayjs(e.$d)})
  }
  function handleEnd(e){
    setRangeDay({...rangeDay, "End": dayjs(e.$d)})
  }

  const calcTrips = (e) => {
    e.preventDefault()
    console.log (rangeDay)
    let tempDays = rangeDay.End.diff(rangeDay.Start, 'd')
    let tempTrips = maxTrip
    let trips = 0
    for (let i=0; i < tempDays+2; i++)
    {
      let thisDay = (rangeDay.Start.add(i, 'day').format('dd'))
      if(checkDays[thisDay] && tempTrips > 1){
        setRangeDay({...rangeDay, "Last": rangeDay.Start.add(i, 'day')})
        trips++;
        tempTrips -= 2;      
      }
    }

    setTrips(trips)

  }

  const maxTripChange = (e) => {
    setMaxTrip(e.target.value)
  }

  return (
    <>
    Start Date
    <DatePicker label="Start" onChange={handleStart} defaultValue={dayjs()} />
    End Date
    <DatePicker label="End" onChange={handleEnd} defaultValue={dayjs()} />    

    <form onSubmit={calcTrips}>
    <label><input id="Su" onChange={handleChange} checked={checkDays.Su} type="checkbox"/>Sunday</label>
    <label><input id="Mo" onChange={handleChange} checked={checkDays.Mo} type="checkbox"/>Monday</label>
    <label><input id="Tu" onChange={handleChange} checked={checkDays.Tu} type="checkbox"/>Tuesday</label>
    <label><input id="We" onChange={handleChange} checked={checkDays.We} type="checkbox"/>Wednesday</label>
    <label><input id="Th" onChange={handleChange} checked={checkDays.Th} type="checkbox"/>Thursday</label>
    <label><input id="Fr" onChange={handleChange} checked={checkDays.Fr} type="checkbox"/>Friday</label>
    <label><input id="Sa" onChange={handleChange} checked={checkDays.Sa} type="checkbox"/>Saturday</label>  
    <input type="text" name="maxTrip" placeholder="Max Allowed Trips (1-999)" pattern="[0-9]||[0-9]{2}||[0-9]{3}" onChange={maxTripChange}></input>
    <button>CalcTrips</button>  
    </form>

    <p>Total Appointment Days: {trips}</p>
    <p>Total Trips (Two per Day): {trips*2}</p>
    <p>Last Possible Trip: {dayjs(rangeDay.Last).format('MM/DD/YYYY')}</p>
    </>
  )
}

export default App
