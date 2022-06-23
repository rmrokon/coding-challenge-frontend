import useUsers from '../hooks/useUsers';

const FormControl = ({ setSelectedUser, setTitle, setBody, handleSubmit, errorMessage, httpError }) => {
    const [users] = useUsers();

    const handleSelectUser = (e) => {
        setSelectedUser(e.target.value);

    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <label htmlFor='selectUser'>Select User:</label>
                <br />
                <select
                    className='border-2 border-gray-400 rounded-md my-2'
                    onChange={handleSelectUser}
                    id='selectUser'
                >
                    <option></option>
                    {
                        users?.map(u => <option key={u.id} value={u.name}>{u.name}</option>)
                    }
                </select>
                <br />
                <label htmlFor="title">Title:</label> <br />
                <input className='border-2 border-gray-400 rounded-md my-2' onChange={(e) => setTitle(e.target.value)} id='title' type="text" required />
                <br />
                <label htmlFor="body">Body:</label><br />
                <textarea className='border-2 border-gray-400 rounded-md my-2' onChange={(e) => setBody(e.target.value)} id="body" required></textarea>

                {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
                {httpError && <p className='text-red-600'>{httpError}</p>}

                <input className='bg-green-400 text-white text-xl px-3 py-2 rounded-md my-2' type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default FormControl;