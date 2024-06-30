import React,{ useState, useContext } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faPerson }  from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import FeaturedByCity from './FeaturedByCity'
import FeaturedByTypes from './FeaturedByTypes'
import FeaturedByLiked from './FeaturedByLiked'
import HotelsPageList from './HotelsPageList'
import { UserAuthContext } from '../contextApi/UserAuthContextComponent'
import { UserStatusContext } from '../contextApi/UserLogInStatusContextComponent'
import { SearchContext } from '../contextApi/SearchContextComponent'


function SearchHotel() {

  const navigate = useNavigate()
  let getLoginToken = localStorage.getItem('loginToken')
  
  let { userAuth } = useContext(UserAuthContext)
  let { isLoggedIn } = useContext(UserStatusContext)
  let { dispatch,city,options } = useContext(SearchContext)

  const [homePage, setHomePage] = useState(true)
  const [searchInputs, setSearchInputs] = useState()
  const [hotelsList, setHotelsList] = useState([])

  const [cityName, setCityName] = useState('')
  const [openOptions, setOpenOptions] = useState(false)
  const [option, setOption] = useState({ adult : 1, children : 0, room : 1 })
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      }
    })
  }

  const handleSubmit = async(e) => {
    try {
      if(isLoggedIn){
        e.preventDefault()
        const inputData = { city : cityName.toLowerCase(), dates : dates, options : option }
        dispatch({type : 'NEW_SEARCH',payload : inputData})
        if(inputData.cityName !== ""){
          console.log(`${ApiRoutes.HOTELSLIST.path}/${userAuth[0]._id}`)
          let res = await AxiosService.put(`${ApiRoutes.HOTELSLIST.path}/${userAuth[0]._id}`,inputData,{headers : { 'Authorization' : `${getLoginToken}`}})
          let result = res.data.searchResult
          setHomePage(false)
          setHotelsList(result) 
          setSearchInputs(inputData)  
        } else { 
          toast.error("City name cant be empty")
        }
      }else{
        navigate('/login')
      }
    } catch (error) {
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
            <span className='searchDateText'  onClick={()=> setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
            {
              openDate && <DateRange className='dateblock' ranges={dates} onChange={item => setDates([item.selection])} editableDateInputs={true} moveRangeOnFirstSelection={false}/>
            }
        </div>
        <div className="persons d-flex justify-content-start px-2 align-items-center">
            <FontAwesomeIcon icon={faPerson} className='personIcon me-2'/>
            <span className='personsText' onClick={()=> setOpenOptions(!openOptions)}>{`${option.adult} adult - ${option.children} chidren - ${option.room} room `}</span>
            {
              openOptions && <div className='personsOptions px-2'>
                <div className='optionItem py-1 d-flex justify-content-between align-items-center'>
                  <span>Adult</span>
                  <div >
                    <Button variant='none' className='optionCounterBtn' disabled={option.adult<=1} onClick={() => handleOption("adult", "d")}>-</Button>
                    <span className='optionValue mx-2'>{option.adult}</span>
                    <Button variant='none' className='optionCounterBtn' onClick={() => handleOption("adult", "i")}>+</Button>
                  </div>
                </div>
                <div className='optionItem py-1 d-flex justify-content-between align-items-center'>
                  <span>Children</span>
                  <div >
                    <Button variant='none' className='optionCounterBtn' disabled={option.children<=0} onClick={() => handleOption("children", "d")}>-</Button>
                    <span className='optionValue mx-2'>{option.children}</span>
                    <Button variant='none' className='optionCounterBtn' onClick={() => handleOption("children", "i")}>+</Button>
                  </div>
                </div>
                <div className='optionItem py-1 d-flex justify-content-between align-items-center'>
                  <span>room</span>
                  <div >
                    <Button variant='none' className='optionCounterBtn' disabled={option.room <=1} onClick={() => handleOption("room", "d")}>-</Button>
                    <span className='optionValue mx-2 '>{option.room}</span>
                    <Button variant='none' className='optionCounterBtn' onClick={() => handleOption("room", "i")}>+</Button>
                  </div>
                </div>
              </div>
            }
        </div>

        <Button className='searchBtn' type='submit'>Search</Button>  
      </Form>
    </div>

    {
      homePage ? 
      <Container className='homeWrapper mt-5 mb-3 mx-auto'>
        <FeaturedByCity/>
        <FeaturedByTypes/>
        <FeaturedByLiked/>
      </Container> : 
      <Container className='hotelsPage'>
        <HotelsPageList hotelsList={hotelsList} searchInputs={searchInputs}/>
      </Container>
    }
  </>
}

export default SearchHotel