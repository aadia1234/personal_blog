import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import LatestPostsView from './LatestsPostsView'


function HomeView() {
  // const [darkMode, setDarkMode] = useState(0);

  return (
    <>
    <div class="m-5 p-4 text-center">
      <h1>Welcome to My Blog!</h1>
      <h6>Here's the most recent posts I've made</h6>
    </div>
    <hr/>
    <LatestPostsView></LatestPostsView>
    <hr/>
    </>
  );
}

export default HomeView
