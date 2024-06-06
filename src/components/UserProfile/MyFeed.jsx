import React, { useState, useEffect } from 'react';
import Post from '../Posts/Post';

const MyFeed = ({loggedIn}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!loggedIn) {
            window.alert("You must be logged in to see your posts");
            useNavigate('/login');
        }
        const username = localStorage.getItem('username');

        const fetchPosts = async () => {
            try {
                const response = await fetch(`https://jachmm.pythonanywhere.com/api/feed/${username}`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1 style={{color: '#004081', fontSize: 'xx-large'}}>Your Feed</h1>
            <ul>
                {posts.map(post => (
                    <Post post={post} key={post.id} username={post.username}/>
                ))}
            </ul>
        </div>
    );
}

export default MyFeed;
