import { useState, useEffect } from 'react'
import './App.css';
import React from 'react';
import { XMLParser } from 'fast-xml-parser';
import { Button, TextField, FormControl, Select, MenuItem} from '@mui/material';


function App() {

   const [result, setResult] = useState([])
   const [currentValute, setCurrentValute] = useState(0)
   const [age, setAge] = useState('')
   const handleChange = (event) => {
      setAge(event.target.value);
   };
   const currencyList = result.map(e => {
      return <tr> <td>{e.Name}</td> <td>{e.Value}</td> </tr>
   })
   function sortName() {
      const result2 = [...result]
      result2.sort((a, b) => a.Name.localeCompare(b.Name))
      setResult(result2)
   }
   useEffect(() => {
      fetch('https://www.cbr-xml-daily.ru/daily_utf8.xml')
         .then(response => response.text())
         .then(parser => new XMLParser().parse(parser))
         .then(result => setResult(result.ValCurs.Valute))
   }, [])
const usd = Number(result.find(e => e.CharCode === 'USD')?.Value?.replace(',', '.'))


//R01235 - Доллар США
return (
   <div>
      <div className='buttonContainer'>
         <Button className="filter" variant="contained" onClick={sortName}>Filter</Button>
      </div>
      <table style={{ margin: '0 auto' }}>
         <tr>
            <td> Название </td>
            <td> Курс </td>
         </tr>
         {currencyList}
      </table>
      <div className='lowStage'>
         <TextField type="number" onChange={e => setCurrentValute(e?.target?.value)}></TextField>
         {(currentValute * usd).toFixed(2)}
      </div>
      <FormControl>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onClick={handleChange}
         >
            {result.map(menuitem => {
               return <MenuItem>{menuitem.Name}</MenuItem>
            })
            }
         </Select>
      </FormControl>
   </div>
);
}

export default App;
