
import './App.css';
import City from './components/City/City';
import Root from './components/Root/Root';
import Search from './components/Search/Search';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';


function App() {
  let router = createBrowserRouter([
    {
      path:'',
      element:<Root/>,
      children:[
        {
          path:'',
          element:<Search/>
        },
        {
          path:'city/:name',
          element:<City/>
        }
      ]
    }
  ])
  return (
    <div className="App">
        <RouterProvider router = {router}/>
    </div>
  );
}

export default App;
