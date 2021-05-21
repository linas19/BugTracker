import React, { useState, useEffect } from 'react';

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
    const [project, setProject] = useState('')
    // const data = {}
    useEffect(() => fetchProjects(),[])
    const fetchProjects = () => {
        axios({
            url: '/api/auth/projects',
            method: 'GET',
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then((response) => {
                console.log('Projects:', response.data)
                setProject(response.data)

            })
            .catch((error) => {
                console.log(error, 'Not logged in to get projects')
            })

    }


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
            url: '/api/auth/projects',
            method: 'POST',
            data: payload,
            headers: {
                ["x-access-token"]: localStorage.getItem('x-access-token')
            }
        })
            .then(() => {
                console.log('Project data has been sent')
                resetUserInputs()
            })
            .catch(() => {
                console.log('Project data not sent')
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
                {project.length !== 0 && project.map((p, index) => (
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