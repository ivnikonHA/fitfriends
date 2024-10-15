import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../consts';
import { MainPage } from '../pages/main/main';
import { Intro } from '../pages/intro/intro';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';

function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route path={AppRoute.Intro} element={<Intro />}/>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<Login />} />
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
