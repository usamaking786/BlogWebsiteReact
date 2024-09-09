
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'


const router = createBrowserRouter([
  {
    path : "/",
    element :<App/>,
    children : [
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/signup",
        element: <Signup/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/add-post",
        element: <AddPost/>,
      },
      {
        path:"/all-posts",
        element: <Home/>
      },
      {
        path : "post/:slug",
        element : <Post/>,
      },
      {
        path : "*",
        element : <h1>404 Page Not Found</h1>
      },
      {
        path : "edit-post/:slug",
        element : <EditPost/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
</Provider>
)
