import React from 'react';
import { useState } from 'react'
import FormControl from './FormControl';
import UserOnMap from './UserOnMap';
import './main.css';

const Home = () => {
    const [selectedUser, setSelectedUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [httpError, setHttpError] = useState("");


    const validateForm = () => {
        if (!selectedUser) {
            setErrorMessage("Please select a user");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        if (selectedUser) {
            setErrorMessage("");
            const data = {
                title,
                body,
                userId: selectedUser.id
            }
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 400) {
                        setHttpError("400 | Bad Request");
                    }
                    if (res.status === 403) {
                        setHttpError("403 | Forbidden");
                    }
                    if (res.status === 401) {
                        setHttpError("401 | Unauthorized");
                    }
                    if (res.status === 404) {
                        setHttpError("404 | Not Found");
                    }
                    return res.json();
                })
                .then(data => console.log(data));
        }

    }
    return (
        <div className=''>
            <div className='shadow-lg shadow-slate-400 rounded-md w-1/4 p-12 my-12'>
                <FormControl
                    setSelectedUser={setSelectedUser}
                    setBody={setBody}
                    setTitle={setTitle}
                    errorMessage={errorMessage}
                    handleSubmit={handleSubmit}
                    httpError={httpError}
                ></FormControl>
            </div>

            <div>
                {
                    selectedUser && <div>
                        <UserOnMap
                            selectedUser={selectedUser}
                        ></UserOnMap>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;