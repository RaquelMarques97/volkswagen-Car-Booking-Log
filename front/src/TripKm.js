import React , { useState }  from 'react';
import Button from './Button';
import './triplog.css';
import './TripKm.css';


const TripKm = (props) => {
    const [km, setKm] = useState(0);
    const [stageMoment, setStageMoment] = useState('');

    const id = props.id;
    const data = props.data;
    const trip = data.find(element => element.id === +id);
    const startkm = trip.start_km;
    const endkm = trip.end_km;
    let stage = '';
    if(!startkm){
        stage = 'start';
    } else if(startkm && !endkm){
        stage = 'end';
    } else {
        stage = 'crash'
    }
    const updateKm = (e) => {
        setKm(e.target.value);
        setStageMoment(e.target.name);      
    }

    const handleSubmit = (e) => {
         
        const url = 'http://localhost:5000/';
        let putMethod = {};
        if(stageMoment==='start_km'){
            putMethod = {
                method: 'PUT', // Method itself
                headers: {
                 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
                body: JSON.stringify({
                    start_km: km,
                    id: props.id
                }) // We send data in JSON format
            }
        }else {
            putMethod = {
                method: 'PUT', // Method itself
                headers: {
                 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
                body: JSON.stringify({
                    end_km: km,
                    id: props.id
                }) // We send data in JSON format
            }
        }
        console.log('putMethod: ', putMethod)
          
        fetch(url, putMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error

        e.preventDefault();
    }

    return(
        <div className='enterKm'>
            <h1>Trip info</h1>
            <div className='destinationKm'>Destination: {trip.destination}</div>
            
            <form onSubmit={handleSubmit}>
                <div className='enter'>Enter {stage} Kms</div>
                <input type="text" value={km} name={`${stage}_km`} onChange={updateKm}/>
                <Button type='submit'>
                    Save
                </Button>
            </form>
            
        </div>
    )
}

export default TripKm;