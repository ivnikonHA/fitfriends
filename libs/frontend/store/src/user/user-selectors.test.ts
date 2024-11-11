import { AuthorizationStatus } from '/home/ivnikon/projects/HTMLAcademy/nx-test/fitfriends/libs/frontend/utils/src/index.js';
import { Level, Location, Role, Sex, Time } from '/home/ivnikon/projects/HTMLAcademy/nx-test/fitfriends/libs/shared/core/src/index.js';
import { getAuthorizationStatus } from './user-selectors';

describe('Users selectors', () => {
  it('should return authorizationStatus from state', () => {
    const state = {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          accessToken: '',
          refreshToken: '',
          email: '',
          id: ''
        },
        userInfo: {
          id: '',
          name: '',
          email: '',
          avatar: '',
          sex: Sex.DONT_MATTER,
          dateOfBirth: new Date(),
          description: '',
          location: Location.PETROGRADSKAYA,
          picture: '',
          createdAt: new Date(),
          level: Level.AMATEUR,
          trainingTypes: [],
          trainingTime: Time.EXTRA,
          caloriesAll: 0,
          caloriesPerDay: 0,
          role: Role.COACH
        }
      }
    }
    const result = getAuthorizationStatus(state);
    expect(result).toBe(AuthorizationStatus.Auth);
  });
})
