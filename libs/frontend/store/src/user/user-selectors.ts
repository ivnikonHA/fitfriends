import { AuthorizationStatus, NameSpace } from '@fitfriends/utils';
import { State } from '../state';
import { LoggedUserRdo, UserRdo } from '@fitfriends/user';

const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
const getIsAuthorized = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
const getUserData = (state: State): LoggedUserRdo => state[NameSpace.User].userData;
const getUserInfo = (state: State): UserRdo => state[NameSpace.User].userInfo;

export { getAuthorizationStatus, getIsAuthorized, getUserData, getUserInfo };
