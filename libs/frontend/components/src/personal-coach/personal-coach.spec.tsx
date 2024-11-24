import { render } from '@testing-library/react';

import PersonalCoach from './personal-coach';

describe('PersonalCoach', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PersonalCoach />);
    expect(baseElement).toBeTruthy();
  });
});
