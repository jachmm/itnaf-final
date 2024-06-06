import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setQuery(newValue);
        setSelectedUser(null);
    };

    const handleSelectUser = (event, newValue) => {
        setSelectedUser(newValue);
        if (newValue !== null) {
            navigate(`/users/${newValue}`);
        }
    };

    const handleFocus = (e) => {
        e.preventDefault();
    };

    const searchUsers = async (searchQuery) => {
        try {
            const response = await fetch(`https://jachmm.pythonanywhere.com/api/search/${searchQuery}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            setUsers([]);
        }
    };

    useEffect(() => {
        if (query === '') {
            setUsers([]);
            return;
        }
        searchUsers(query);
    }, [query]);

    return (
        <div style={{padding: '1% 0 2% 0'}}>

            <Autocomplete
                value={selectedUser}
                onChange={handleSelectUser}
                inputValue={query}
                onInputChange={handleChange}
                options={users}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search users..."
                        variant="outlined"
                        onFocus={handleFocus}
                    />
                )}
            />
        </div>
    );
};

export default SearchBar;
