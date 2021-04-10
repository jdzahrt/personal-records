import React from 'react';
import AlcoholClock from './alcohol-clock';

const AlcoholHistory = ({history}) => {
    return (
        <div>
            <center><h1>Alcohol History List</h1></center>
            {history.map((record) => (
                <ul key={record._id}>
                    <AlcoholClock quitDate={record.quitDate}/>
                </ul>
            ))}
        </div>
    );
}

export default AlcoholHistory