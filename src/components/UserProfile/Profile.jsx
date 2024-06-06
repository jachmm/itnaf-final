import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Posts/Post';
import AddPost from '../Posts/AddPost';

const Profile = ({ loggedUserData, refreshUserData }) => {
    const { username } = useParams();
    const [userData, setUserData] = useState({
        following: [],
        username: username,
        posts: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://jachmm.pythonanywhere.com/api/users/${username}`);
                if (!response.ok) {
                    throw new Error(`Error fetching user data: ${response.statusText}`);
                }
                const data = await response.json();
                const sortedPosts = data.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setUserData({ ...data, posts: sortedPosts });
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        setLoggedUser(localStorage.getItem('username'));
        fetchUserData();
    }, [username]);

    const handleFollow = async () => {
        if (!loggedUser) {
            window.alert("You must be logged in to follow users.");
            return;
        }

        try {
            const response = await fetch(`https://jachmm.pythonanywhere.com/api/follow/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ follower: loggedUser })
            });

            if (response.ok) {  
                const data = await response.json();
                window.alert(data.message);
                refreshUserData();
            } else {
                const data = await response.json();
                window.alert(data.error);
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        if (!loggedUser) {
            window.alert("You must be logged in to unfollow users.");
            return;
        }

        try {
            const response = await fetch(`https://jachmm.pythonanywhere.com/api/unfollow/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ follower: loggedUser })
            });

            if (response.ok) {
                const data = await response.json();
                window.alert(data.message);
                refreshUserData();
            } else {
                const data = await response.json();
                window.alert(data.error);
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading profile...</p>
            ) : (
                <>
                    <div className='userCard'>
                        <div className='userCard1'>
                            <h1>{userData.username}</h1>
                        </div>
                        <div className='userCard2'>
                            <h2>Following: {userData.following.length}</h2>
                            {loggedUser && loggedUser !== username && (
                                loggedUserData.following.includes(username) ? (
                                    <button onClick={handleUnfollow} className='UnfollowButton'>Unfollow</button>
                                ) : (
                                    <button onClick={handleFollow} className='FollowButton'>Follow</button>
                                )
                            )}
                        </div>
                    </div>

                    {loggedUser === username && <AddPost loggedIn={true} />}

                    {userData.posts && userData.posts.length > 0 ? (
                        <div>
                            {userData.posts.map(data => (
                                <Post post={data} key={data.id} username={userData.username} />
                            ))}
                        </div>
                    ) : (
                        <h1 style={{margin: '5% 0 0 0'}}>This User has no posts created.</h1>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
