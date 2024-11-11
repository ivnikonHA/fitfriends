import { AuthorizationStatus, NameSpace } from '@fitfriends/utils';
import { State } from '../state';
import { LoggedUserRdo, UserRdo } from '@fitfriends/user';

type UserState = Pick<State, NameSpace.User>

const getAuthorizationStatus = (state: UserState): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
const getIsAuthorized = (state: UserState): boolean =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
const getUserData = (state: UserState): LoggedUserRdo => state[NameSpace.User].userData;
const getUserInfo = (state: UserState): UserRdo => state[NameSpace.User].userInfo;

export { getAuthorizationStatus, getIsAuthorized, getUserData, getUserInfo };
