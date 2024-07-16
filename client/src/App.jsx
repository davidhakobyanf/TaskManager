import './App.css';
import Home from './components/Home/Home';
import Task from './components/Task/Task';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Content from "./components/Content/Content";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

const router = createBrowserRouter([
  {
    path:'/',
    element: <Content/>,
    children:[
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tasks',
        element:<Task />
      },
      {
        path: '/about',
        element:<About />
      },
      {
        path: '/contact',
        element:<Contact />
      },
    ]
  }
]);



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
