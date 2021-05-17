import React, { useState } from 'react';
import useAxios from 'axios-hooks';

const axios = require('axios');
const ticketState = {
    ticketName: '',
    ticketType: '',
    ticketStatus: '',
    ticketDate: '',
    ticketComment: [],
    ticketProject: '',
    ticketAuthor: '',
    ticketSolver: ''
}
function Tickets() {
    const [state, setState] = useState(ticketState);
    const resetUserInputs = () => {
        setState(ticketState)
    }
    const [{ data, loading, error }, refetch] = useAxios(
        '/api/tickets'
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            ticketName: state.ticketName,
            ticketType: state.ticketType,
            ticketStatus: state.ticketStatus,
            ticketDate: state.ticketDate,
            ticketComment: state.ticketComment,
            ticketProject: state.ticketProject,
            ticketAuthor: state.ticketAuthor,
            ticketSolver: state.ticketSolver
        };
        console.log('name: ', payload)
        axios({
            url: 'api/tickets',
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
            <h1>Tickets</h1>
            <form>
                <div>
                    <input
                        type='text'
                        name='ticketName'
                        placeholder='ticket Name'
                        value={state.ticketName}
                        onChange={e => setState({ ...state, ticketName: e.target.value })}>
                    </input>
                    {/* 'Error', 'Bug', 'Visual' */}
                    <div>
                        <select name='ticketType'>
                            <option value="Error">Error</option>
                            <option value="Bug">Bug</option>
                            <option value="Visual">Visual</option>
                        </select>
                    </div>
                    <div>
                        <select name='ticketType'>
                            <option value="Open">Open</option>
                            <option value="In Progress">In progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Additional Info Required">Additional Info Required</option>
                        </select>
                    </div>
                    <input
                        type='text'
                        name='ticketAuthor'
                        placeholder='ticket Author'
                        value={state.ticketAuthor}
                        onChange={e => setState({ ...state, ticketAuthor: e.target.value })}>
                    </input>
                </div>
                <div>
                    <textarea placeholder='ticket Description'
                        name='ticketDescription'
                        cols='30'
                        rows='10'
                        value={state.ticketDescription}
                        onChange={e => setState({ ...state, ticketDescription: e.target.value })}>
                    </textarea>
                </div>
                <button onClick={submit}>Create new ticket</button>
            </form>
            <div>
                {data.length !== 0 && data.map((p, index) => (
                    <div key={index}>
                        <h1>ticket name: {p.ticketName}</h1>
                        <div>ticket date: {p.ticketDate}</div>
                        <div>ticket author: {p.ticketAuthor}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Tickets