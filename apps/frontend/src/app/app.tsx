import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '@fitfriends/utils';
import { Intro, Login, Main, Register } from '@fitfriends/pages';
import { PrivateRoute, PublicRoute } from '@fitfriends/components';

function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path={AppRoute.Intro} element={<Intro />}/>
        <Route
          path={AppRoute.Main}
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path={AppRoute.Register} element={<Register />} />
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
