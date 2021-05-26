import React, { useState, useEffect } from 'react';

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
    const [ticket, setTicket] = useState('')

    useEffect(() => fetchTickets(),[])
    const fetchTickets = () => {
        axios({
            url: '/api/auth/tickets',
            method: 'GET',
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                setTicket(response.data)
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get tickets')
            })

    }
    const submit = (e) => {
        e.preventDefault();
        const payload = {
            ticketName: state.ticketName,
            ticketType: state.ticketType,
            ticketStatus: state.ticketStatus,
            ticketDate: state.ticketDate,
            ticketComment: state.ticketComment,
            ticketProject: state.ticketProject,
            ticketSolver: state.ticketSolver
        };
        axios({
            url: '/api/auth/tickets',
            method: 'POST',
            data: payload,
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then(() => {
                resetUserInputs();
                fetchTickets();
                window.location.reload(true);
            })
            .catch(() => {
                console.log('Ticket data not sent')
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
                {ticket.length !== 0 && ticket.map((p, index) => (
                    <div key={index}>
                        <h1>ticket name: {p.ticketName}</h1>
                        <div>ticket date: {p.ticketDate}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Tickets