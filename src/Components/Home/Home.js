import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [pic, setPic] = useState(null)

    const handleChange = (event) => {
        console.log(event.target.files);
        setPic({file: event.target.files[0]})
    }

    const handleSubmit = async () => {
        const data =  new FormData()
        data.append('files', pic.file)

        const upload_pic = await axios({
            method: 'POST',
            url: 'https://dpi-backend.herokuapp.com/upload/',
            data: data
        })

        console.log("is uploaded", upload_pic);
    }
    
    return (
      <div style={{padding: `200px 0`}}>
        <input type="file" name="image" onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
}

export default Home
