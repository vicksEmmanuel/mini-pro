import React from 'react';
import { Link } from 'react-router-dom'
import ProjectSummary from './ProjectSummary';
const ProjectList = ({projects}) => {
    return (
        <div className='project-list section'>
            { projects && projects.map((element)=> {
                console.log(element);
                return (
                    <Link to={'/project/'+element.id} key={element.id}>
                        <ProjectSummary project={element} />
                    </Link>
                )
            })}
        </div>
    )
}

export default ProjectList;