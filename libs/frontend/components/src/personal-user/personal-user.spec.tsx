import { render } from '@testing-library/react';

import PersonalUser from './personal-user';

describe('PersonalUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PersonalUser />);
    expect(baseElement).toBeTruthy();
  });
});
