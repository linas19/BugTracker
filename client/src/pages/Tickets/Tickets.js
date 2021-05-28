import React, { useState, useEffect } from 'react';
import styles from './Ticket.module.scss'
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

    useEffect(() => fetchTickets(), [])
    const fetchTickets = () => {
        axios({
            url: '/api/auth/tickets',
            method: 'GET',
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                console.log('response:',response.data)
                setTicket(response.data)
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get tickets')
            })

    }
    const [project, setProject] = useState('')

    useEffect(() => fetchProjects(), [])
    const fetchProjects = () => {
        axios({
            url: '/api/auth/projects',
            method: 'GET',
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                setProject(response.data)
            })
            .catch((error) => {
                console.log(error, 'Not logged in to get projects')
            })
    }
    const selectProject = (e) => {

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
        console.log(payload)
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
            })
            .catch(() => {
                console.log('Ticket data not sent')
            })
    }
    console.log('pppproject:',project)
    return (
        <div>
            <h1>Tickets</h1>
            <div>Select a project to create a ticket: </div>
            <select placeholder="Select a project" onChange={e => {
                console.log('sd',e.target.value)
                setState({ ...state, ticketProject: e.target.value })
            }} value={state.ticketProject}>
                {project.length !== 0 && project.map((p, index) => (
                    <option key={index} value={p._id} defaultValue>{p.projectName}</option>
                ))}
            </select>
            <form>
                <div>
                    <input
                        type='text'
                        name='ticketName'
                        placeholder='ticket Name'
                        value={state.ticketName}
                        onChange={e => setState({ ...state, ticketName: e.target.value })}>
                    </input>
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
            <div className={styles.ticketContainer}>
                {ticket.length !== 0 && ticket.map((p, index) => (
                    <div className={styles.ticket} key={index}>
                        <div>Ticket project: {p.ticketProject}</div>
                        <div>Ticket name: {p.ticketName}</div>
                        <div>Ticket date: {p.ticketDate}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Tickets