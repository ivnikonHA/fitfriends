import { render } from '@testing-library/react';

import Training from './training';

describe('Training', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Training />);
    expect(baseElement).toBeTruthy();
  });
});
