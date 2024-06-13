import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import './Search.css'

function Search() {
    let [search,setSearch] = useState('')
    let navigate = useNavigate();

    const change = ()=>{
        let textSearch = document.getElementById('city').value 
        setSearch(textSearch)
        console.log(search)
        if(search!=='')
            navigate(`/city/${textSearch}`)
    }
    return (
        <div className="main-content">
            <div>
            <h1 className="display-1 text-strong top-text">By 22071A0531</h1>
            <h1 className="display-1 text-strong " style = {{color:'grey'}}>Search For a city data</h1>
            </div>
            <div className="textfield mt-5">
            <input type="text" className="textfieldbar" id="city" placeholder="Search City"/>
            <div className="input-group-append">
                <button className="btn but" onClick={change} type="button">Search</button>
            </div>
            </div>
        </div>
    )
}

export default Search
