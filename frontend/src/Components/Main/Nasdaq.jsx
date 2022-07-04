import React from 'react'
import { useEffect,useState } from 'react';
import style from "./Nasdaq.module.css"
import { useNavigate } from 'react-router-dom';

export const Nasdaq = () => {

    const [companies, setCompanies] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [display, setDisplay] = useState("");
    const [date, setDate] = useState("2020-09-14");

    const navigate = useNavigate()

    useEffect(() => {
      fetch(`https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=800&apiKey=uCecbe3ppEd1MPMCi2rhYPbx9CNpdRWj`)


      .then((res)=> res.json())
      .then((data)=>setCompanies(data.results))
      .catch((err=>console.log(err)))
    
    }, [])

    
    const handleSelect =(e)=>{

        setCompanyName(e.currentTarget.value);
    }

    const fetchData=()=>{

    

            fetch(`https://api.polygon.io/v1/open-close/${companyName}/${date}?adjusted=true&apiKey=uCecbe3ppEd1MPMCi2rhYPbx9CNpdRWj`)

            .then((res)=> res.json())
            .then((data)=>setDisplay(data))
            .catch((err)=>console.log(err))
        
        
    }

    const handleDate=(e)=>{

        setDate(e.currentTarget.value);

        
        
    }

    const handleSearch =()=>{

       

        fetchData();

    }


    const handleLogout = () => {
		localStorage.removeItem("token");
        navigate("/login")
	};


    

  return (
    <>

        <div className={style.nav}>
            <h2>NasDaq</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>

        <div  className={style.buttonBox}>

            <select value={companyName} onChange={handleSelect}  className={style.select}>
            <option value="">Choose Company...</option>
                {
                    
                    companies!==undefined?companies.map((item)=>{

                        return (

                            <option value={item.ticker} key={item.ticker}>{item.name}</option>
                        )
                    })
                    :
                    <option value="">Api hits more than 5 times in a minute plz wait & refresh after 1min..</option>
        
                    
                }
            </select>
            <input type="date" value={date} onChange={handleDate} min="2018-09-14" max="2022-04-14"  className={style.date}/><br/>

            <button onClick={handleSearch}  className={style.button}>Search</button>

        </div>
        <div  className={style.tableBox}>

                <table className={style.table}>
                    <thead>
                        <tr  >

                            <th className={style.headings}>Symbol</th>
                            <th className={style.headings}>Open</th>
                            <th className={style.headings}>Pre-Market</th>
                            <th className={style.headings}>Low</th>
                            <th className={style.headings}>High</th>
                            <th className={style.headings}>After-Hours</th>
                            <th className={style.headings}>Close</th>
                            <th className={style.headings}>Volume</th>


                        </tr>

                    </thead>
                    <tbody>

                        <tr style={{textAlign:"center"}}>
                            <td style={{color:"blue"}}>
                                {display.symbol}
                            </td >
                            <td style={{color:"#4CAF50"}}>
                                {display.open}
                            </td>
                            <td >
                                {display.preMarket}
                            </td>
                            <td style={{color:"red"}}>
                                {display.low}
                            </td>
                            <td style={{color:"#4CAF50"}}>
                                {display.high}
                            </td>
                            <td >
                                {display.afterHours}
                            </td>
                            
                            <td style={{color:"#4CAF50"}}>
                                {display.close}
                            </td>
                            <td>
                                {display.volume}
                            </td>
                        </tr>


                    </tbody>
                </table>

            </div>
    </>
  )
}
