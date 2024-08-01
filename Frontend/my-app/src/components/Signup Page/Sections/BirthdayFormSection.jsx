import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import userContext from '../../../UserContext';
import BalloonIcon from '../../assets/BalloonIcon';
import CakeIcon from '../../assets/CakeIcon';

function BirthdayFormSection(props) {

  const { login } = useContext(userContext)
  const now = new Date()
  const months = [
    {name: 'January',value:'1',daysInMonth:31},
    {name: 'February',value:'2',daysInMonth:29},
    {name: 'March',value:'3',  daysInMonth:31},
    {name: 'April',value:'4',  daysInMonth:30 },
    {name: 'May',value:'5',     daysInMonth:31},
    {name: 'June',value:'6',    daysInMonth:30},
    {name: 'July',value:'7',    daysInMonth:31},
    {name: 'August',value:'8'   ,daysInMonth:31},
    {name: 'September',value:'9',daysInMonth:30},
    {name: 'October',value:'10',daysInMonth:31},
    {name: 'November',value:'11',daysInMonth:30},
    {name: 'December',value:'12',daysInMonth:31}
  ]

  const monthNow = months.find((month)=> month.value == now.getMonth() + 1)
  const [month, setMonth] = useState(monthNow); 
  const [date,setDate] = useState(new Date().getDate())
  const [year,setYear] = useState(new Date().getFullYear()); 
    const yearsRange = [];   
    for(let i = 1800; i<= new Date().getFullYear(); i++)
      {yearsRange.push(i)}

   const daysInMonthArray = getDaysInAMonthArray(monthNow.value)
  const [daysInMonth,setDaysInMonth] = useState(daysInMonthArray)

  function getDaysInAMonthArray(monthValue){
    const monthNow = months.find((month)=>  month.value == monthValue)
  let temp = []; 
  for(let i = 1; i <= monthNow.daysInMonth; i++){temp.push(i)}
  return temp
  }

  
  

  const handleChange = (event) => {
    const { name,value } = event.target
    if(name == 'month'){
    const targetMonth = months.find((month)=> month.value == value )
    setMonth(targetMonth);
    setDaysInMonth(getDaysInAMonthArray(targetMonth.value))
    }
    else if(name == 'day'){
      setDate(value)
    }
    else if(name == 'year'){
      setYear(value)
    }

    
  };

  async function handleBirthDay(){
     // if everything goes well
     const temp = {...props.formData,birthday:{day:date,month:month,year:year}}
     props.setFormData(temp)
     const { status } = await axios.post(`${process.env.REACT_APP_BACKENDAPI}/users`,temp)
     if(status === 201){

      await login(temp.username,temp.password)
     }

  }
  
  return (//height 580
    <div className='border text-center' style={{height:'450px'}}>
      <div className='mt-5' style={{position:'relative'}}>
        <div style={{position:'absolute',left:'95px',top:'10px',transform: 'skewY(-10deg)'}}>
          <BalloonIcon width={'70'}/>
        </div>
        <CakeIcon width={'70'}/>
        <div style={{position:'absolute',left:'205px',top:'10px',transform: 'skewY(15deg)'}}>
        <BalloonIcon width={'70'}/>
        </div>
      </div>
      <text ><br/>Add your birthday<br/><br/>This wont be a part of your public profile.</text>
          <div className="container">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <div className="row">
              <div className="col-5">
                  <Select
                  name='month'
                  placeholder={months.find((month) => (new Date().getMonth() + 1) == month.value)}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={month.value}
                  label="Month"
                  onChange={handleChange}
                  style={{width:'120px'}}
                  >
                  {months.map((month)=>(
                    <MenuItem value={month.value}>{month.name}</MenuItem>
                  ))}
              </Select>
              </div>
              <div className="col-3">
                  <Select
                  name='day'
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={date}
                  label="Day"
                  onChange={handleChange}
                  style={{width:'70px'}}
                >
                  
                  {daysInMonth && daysInMonth.map((day)=>(
                    <MenuItem value={day}>{day}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="col-4">
                  <Select
                name='year'
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={year}
                label="Year"
                onChange={handleChange}
                style={{width:'90px'}}
              >
                {yearsRange.map((year)=>(
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
              </div>
            </div>
            </FormControl>
          </div>
          <div className='mt-3' style={{height:'100px'}}>
                <button onClick={handleBirthDay} className='btn btn-info text-light' style={{width:'300px'}}>Next</button>
                <button onClick={()=>{props.setCurrentSection('signupSection')}} className='btn text-info mt-2' style={{width:'300px'}}>Go Back</button>
          </div>
          
          
          
          
          

       

    </div>
  )
}

export default BirthdayFormSection