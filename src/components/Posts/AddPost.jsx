import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPost = ({ loggedIn }) => {
    const [postContent, setPostContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!loggedIn) {
            window.alert("To add post you must log in");
            useNavigate('/login');
        }

        const username = localStorage.getItem('username');
        try {
            const response = await fetch('https://jachmm.pythonanywhere.com/api/posts/create/' + username , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: postContent })
            });

            if (response.status === 201) {
                window.alert('Post added successfully');
                setPostContent('');
            } else {
                const responseData = await response.json();
                window.alert(`Failed: ${responseData.error}`);
            }
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <>
            {loggedIn && (

                <div className='post'>
                    <h2>Add Post</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Write your post here..."
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            required
                        />
                        <button type="submit">Add Post</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default AddPost;
