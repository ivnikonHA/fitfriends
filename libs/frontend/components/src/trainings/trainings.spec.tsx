import { render } from '@testing-library/react';

import Trainings from './trainings';

describe('Trainings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Trainings />);
    expect(baseElement).toBeTruthy();
  });
});
