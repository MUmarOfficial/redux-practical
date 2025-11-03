import { RouterProvider } from 'react-router-dom'
import './App.css'
import appRouter from './routes'
import Loader from './components/Loader';
import { useAppSelector } from './store/hooks';
import { selectApiCallInProgress } from './store/contactsSlice';

function App() {
  const isLoading = useAppSelector(selectApiCallInProgress);

  return <>
    {
      isLoading && <Loader />
    }
    <RouterProvider router={appRouter} />
  </>
}

export default App
