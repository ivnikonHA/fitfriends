import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../consts';
import { MainPage } from '../pages/main';

function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path={AppRoute.Main} element={<MainPage />} />
      </Route>
    )
  )

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
