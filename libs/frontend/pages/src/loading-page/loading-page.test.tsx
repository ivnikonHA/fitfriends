import { render, screen } from '@testing-library/react'

import LoadingPage from './loading-page';

describe('Page: loading-page', () => {
  it('should render successfully', () => {
    const expectedText = /Loading/i;

    render(<LoadingPage />);

    expect(screen.getByText(expectedText)).toBeTruthy();
  })
})
