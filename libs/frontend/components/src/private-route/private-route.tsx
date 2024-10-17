//import styles from './private-route.module.css';
import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@fitfriends/utils';
import { useAppSelector } from '@fitfriends/hooks';
import { getAuthorizationStatus } from '@fitfriends/store';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Intro} />
  );
}

export default PrivateRoute;
