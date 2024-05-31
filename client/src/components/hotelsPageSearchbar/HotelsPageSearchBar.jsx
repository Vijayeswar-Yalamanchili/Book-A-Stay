import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

function HotelsPageSearchBar() {
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  return <>
    <div className='searchFilterBlock d-flex mt-3 p-3'>
      <h4 style={{marginLeft : "40%"}}>Find</h4>
      <input type="text" placeholder='Enter Destiation City' className='p-2 destinationInput'/>
      <div className='searchDateArea pt-1 px-2 my-3'>
          <span className='dateText' onClick={()=> setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
          {
            openDate && <DateRange className='dateblock' ranges={date} onChange={item => setDate([item.selection])} editableDateInputs={true} moveRangeOnFirstSelection={false}/>
          }
      </div>
      <div>
          <div className='d-flex justify-content-between align-items-center'>
            <span>Adult</span>
            <input type="text" maxLength={1} defaultValue={1} className='pplData'/>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <span>Children</span>
            <input type="text" maxLength={1} defaultValue={0} className='pplData'/>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <span>Room</span>
            <input type="text" maxLength={1} defaultValue={1} className='pplData'/>
          </div>
      </div>
      <Button style={{width : "100%"}}>Search</Button>
    </div>
  </>
}

export default HotelsPageSearchBar