import AddPost from './Posts/AddPost';
import MyFeed from './UserProfile/MyFeed';
import LandingPage from './LandingPage';

const Home = ({ loggedIn }) => {

    return (
        <div>

            {!loggedIn && (
               <LandingPage />
            )}


            {loggedIn && (
                <>
                    <MyFeed loggedIn={loggedIn} />
                </>
            )}
        </div>
    );
}

export default Home;
