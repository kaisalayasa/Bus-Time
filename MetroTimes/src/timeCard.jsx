import React from 'react'
import { useState,useEffect } from 'react'
function TimeCard(props) {

    const url = `https://svc.metrotransit.org/nextripv2/${props.id} `;
    const [times,setTimes] = useState(null);
    const [firstBusTime,setFirstBusTime]= useState('loading');
    const [nextBusTime,setNextBusTime]= useState('loading');


    useEffect(()=>{


      const fetchdata =  async ()=>{
            try{
                const respone = await fetch(url);
                const data = await respone.json()
                setTimes(data)
                console.log(times)

            }
            catch(error){
                console.error(error)
            }
                


        }


        fetchdata()
    },[])

useEffect(() => {
    if(times?.departures?.[0].route_short_name == 'A Line' && times?.departures?.[1].route_short_name == 'A Line' ){
        setFirstBusTime(times?.departures?.[0].departure_text);
        setNextBusTime(times?.departures?.[1].departure_text);
        
    
    }
    else if(times?.departures?.[0].route_short_name == 'A Line' && times?.departures?.[1].route_short_name == '74' ){
        setFirstBusTime(times?.departures?.[0].departure_text);
        setNextBusTime(times?.departures?.[2].departure_text);
    
    }
    else if(times?.departures?.[0].route_short_name == '74' && times?.departures?.[1].route_short_name == 'A Line' ){
        setFirstBusTime(times?.departures?.[1].departure_text);
        setNextBusTime(times?.departures?.[2].departure_text);
    
    }
    
},[times])



    
const containerStyle = {
    backgroundColor: '#003B77',
    color: 'white',
    margin: '20px',
    border:'5px solid #FF6720',
    borderRadius:'5px',
    padding:'10px'
    
};

  return (
    <div>
        
        <div  style={containerStyle}>
        
        <div>
        <p>{props.location} Station</p>
            <h1>bus time: {firstBusTime}</h1>
            <hr />
            <br />
            <h1>Next bus time : {nextBusTime}</h1>
            <hr />
        </div>
            
        </div>
        
    </div>
  )

}
export default TimeCard