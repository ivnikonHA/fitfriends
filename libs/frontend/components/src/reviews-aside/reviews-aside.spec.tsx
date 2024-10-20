import { render } from '@testing-library/react';

import ReviewsAside from './reviews-aside';

describe('ReviewsAside', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReviewsAside />);
    expect(baseElement).toBeTruthy();
  });
});
