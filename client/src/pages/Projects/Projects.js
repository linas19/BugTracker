import React, { useState } from 'react';
import useAxios from 'axios-hooks';

const axios = require('axios');
const projectState = {

    projectName: '',
    projectDescription: '',
    projectAuthor: '',
    projectDate: ''

}
function Projects() {
    const [state, setState] = useState(projectState);
    const resetUserInputs = () => {
        setState(projectState)
    }
    const [{ data, loading, error }, refetch] = useAxios(
        '/api/projects'
    )
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            projectName: state.projectName,
            projectDescription: state.projectDescription,
            projectAuthor: state.projectAuthor,
            projectDate: state.projectDate
        };
        console.log('name: ', payload)
        axios({
            url: 'api/projects',
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
            <h1>Projects</h1>
            <form>
                <div>
                    <input
                        type='text'
                        name='projectName'
                        placeholder='Project Name'
                        value={state.projectName}
                        onChange={e => setState({ ...state, projectName: e.target.value })}>
                    </input>
                    <input
                        type='text'
                        name='projectAuthor'
                        placeholder='Project Author'
                        value={state.projectAuthor}
                        onChange={e => setState({ ...state, projectAuthor: e.target.value })}>
                    </input>
                </div>
                <div>
                    <textarea placeholder='Project Description'
                        name='projectDescription'
                        cols='30'
                        rows='10'
                        value={state.projectDescription}
                        onChange={e => setState({ ...state, projectDescription: e.target.value })}>
                    </textarea>
                </div>
                <button onClick={submit}>Create new project</button>
            </form>
            <div>
                {data.length !== 0 && data.map((p, index) => (
                    <div key={index}>
                        <h1>Project name: {p.projectName}</h1>
                        <h3>Description: {p.projectDescription}</h3>
                        <div>Project date: {p.projectDate}</div>
                        <div>Project author: {p.projectAuthor}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Projects