import { render } from '@testing-library/react';

import TrainingCard from './training-card';

describe('TrainingCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainingCard />);
    expect(baseElement).toBeTruthy();
  });
});
