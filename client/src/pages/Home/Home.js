import React, { useState } from 'react';
import useAxios from 'axios-hooks'

const axios = require('axios');

function Home() {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const resetUserInputs = () => {
        setTitle('')
        setBody('')
    }
    const [{ data, loading, error }, refetch] = useAxios(
        '/api'
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            title: title,
            body: body
        };
        axios({
            url: 'api/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent')
                resetUserInputs()
                refetch()
            })
            .catch(() => {
                console.log('Data not sent')
            })
    }
    return (
        <div>
            <h1>Home</h1>
            <form>
                <div>
                    <input
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                    </input>
                </div>
                <div>
                    <textarea placeholder='body'
                        name='body'
                        cols='30'
                        rows='10'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                </div>
                <button onClick={submit}>SUBMIT</button>
            </form>
            <div>
                {data.length !== 0 && data.map((p, index) => (
                        <div key={index}>
                            <h3>{p.title}</h3>
                            <h3>{p.body}</h3>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default Home