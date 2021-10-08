import React, { useState, useEffect } from 'react'

function Api() {

    const[data, setData] = useState([])

    const apiGet = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
        })
    }

    useEffect(()=>{
        apiGet();
    },[]
    );

    return (
        <div>
            <h1>My Api</h1><br/>
            <button onClick={apiGet}>Fetch Api</button>
            <br/>
            <pre>{JSON.stringify(data, null, 1)}</pre>
            <div>
                <ul>
                    {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Api

