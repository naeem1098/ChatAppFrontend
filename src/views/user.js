import React from 'react'
import './user.css';

function User(props) {
    // console.log(props);
    return (
        <div className="row rounded shadow-sm bg-white mt-2">

            <img id="friendImage" src={"http://localhost:3100/userImage/" + props.user.userImage} width="40px" height="40px" alt="..." className=" rounded-circle border m-1" />
            <span id="online" className="bg-success"></span>
            <div className="">
                <strong className="mt-1">{props.user.username}</strong>
                <br/>
                <small className="">{props.user.description}</small>
            </div>
            <div className="m-2 ml-auto">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => props.chatWith(props.user.userId)}>Chat</button>
            </div>
        </div>
    )
}

export default User;