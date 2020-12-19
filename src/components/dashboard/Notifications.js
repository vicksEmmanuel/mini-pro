import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import { compose } from 'redux';
import moment from 'moment';

const Notifications = ({notifications}) => {
    return (
        <div className='container section'>
            <div className='card z-depth-0'>
                    <div className='card-content'>
                        <span className='card-title'>Notifications</span>
                        <ul className='notifications'>
                        { notifications && notifications.map((element)=> {
                            console.log(element);
                            return (
                                <li key={element.id}>
                                    <span className='pink-text'>{element.user}</span>
                                    <span>{element.content}</span>
                                    <div className='grey-texxt note-date'>
                                        {moment(element.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                        })}
                        </ul>
                    </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        notifications : state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection : 'notifications',
            limit: 3,
            orderBy: ['time', 'desc']
        }
    ])
)(Notifications);