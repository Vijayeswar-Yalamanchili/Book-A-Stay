import React,{ useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faPerson }  from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { jwtDecode } from 'jwt-decode'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { UserAuthContext } from '../contextApi/UserAuthContextComponent'

function SearchHotel({isLoggedIn}) {

  const navigate = useNavigate()
  let getLoginToken = localStorage.getItem('loginToken')
  let {userAuth} = useContext(UserAuthContext)
  const [cityName, setCityName] = useState('')
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({ adult : 1, children : 0, room : 1 })
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const handleSubmit = async(e) => {
    try {
      if(isLoggedIn){
        e.preventDefault()
        const inputData = { cityName : cityName.toLowerCase(), day : date, persons : options }
        if(inputData.cityName !== ""){
          let res = await AxiosService.put(`${ApiRoutes.USERSEARCHDATA.path}/${userAuth[0]._id}`,inputData,{headers : { 'Authorization' : `${getLoginToken}`}})
          console.log(res.data.searchResult)
          navigate('/hotels')
        } else { 
          toast.error("City name cant be empty")
        }
      }else{
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message || error.message)
    }
  }

  return <>
    <div className="header">
      <Form onSubmit={handleSubmit} className="search mx-auto mt-5 d-flex justify-content-between align-items-center">  
        <div className="searchBar d-flex justify-content-start px-2 align-items-center">
            <FontAwesomeIcon icon={faBed} className='bedIcon me-2'/>
            <input type="text" name='city' defaultValue={cityName} placeholder='Enter the City' className='cityNameText' onChange={(e)=>setCityName(e.target.value)}/>
        </div>
        <div className="searchDate d-flex justify-content-start px-2 align-items-center">
            <FontAwesomeIcon icon={faCalendar} className='calenderIcon me-2'/>
            <span className='searchDateText'  onClick={()=> setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
            {
              openDate && <DateRange className='dateblock' ranges={date} onChange={item => setDate([item.selection])} editableDateInputs={true} moveRangeOnFirstSelection={false}/>
            }
        </div>
        <div className="persons d-flex justify-content-start px-2 align-items-center">
            <FontAwesomeIcon icon={faPerson} className='personIcon me-2'/>
            <span className='personsText' onClick={()=> setOpenOptions(!openOptions)}>{`${options.adult} adult - ${options.children} chidren - ${options.room} room `}</span>
            {
              openOptions && <div className='personsOptions px-2'>
                <div className='optionItem py-1 d-flex justify-content-between align-items-center'>
                  <span>Adult</span>
                  <div >
                    <Button variant='none' className='optionCounterBtn' disabled={options.adult<=1} onClick={() => handleOption("adult", "d")}>-</Button>
                    <span className='optionValue mx-2'>{options.adult}</span>
                    <Button variant='none' className='optionCounterBtn' onClick={() => handleOption("adult", "i")}>+</Button>
                  </div>
                </div>
                <div className='optionItem py-1 d-flex justify-content-between align-items-center'>
                  <span>Children</span>
                  <div >
                    <Button variant='none' className='optionCounterBtn' disabled={options.children<=0} onClick={() => handleOption("children", "d")}>-</Button>
                    <span className='optionValue mx-2'>{options.children}</span>
                    <Button variant='none' className='optionCounterBtn' onClick={() => handleOption("children", "i")}>+</Button>
                  </div>
                </div>
                <div className='optionItem py-1 d-flex justify-content-between align-items-center'>
                  <span>room</span>
                  <div >
                    <Button variant='none' className='optionCounterBtn' disabled={options.room <=1} onClick={() => handleOption("room", "d")}>-</Button>
                    <span className='optionValue mx-2 '>{options.room}</span>
                    <Button variant='none' className='optionCounterBtn' onClick={() => handleOption("room", "i")}>+</Button>
                  </div>
                </div>
              </div>
            }
        </div>

        <Button className='searchBtn' type='submit'>Search</Button>  
      </Form>
    </div>
  </>
}

export default SearchHotel