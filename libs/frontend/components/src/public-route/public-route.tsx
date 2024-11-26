import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '@fitfriends/utils';
import { getAuthorizationStatus } from '@fitfriends/store';
import { useAppSelector } from '@fitfriends/hooks';

type PublicRouteProps = {
  children: JSX.Element;
};

export function PublicRoute({children}: PublicRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.NoAuth ? (
    children
  ) : (
    <Navigate to={AppRoute.Main} />
  );
}
