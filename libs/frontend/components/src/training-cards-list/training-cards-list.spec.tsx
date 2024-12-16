import { render } from '@testing-library/react';

import TrainingCardsList from './training-cards-list';

describe('TrainingCardsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainingCardsList />);
    expect(baseElement).toBeTruthy();
  });
});
