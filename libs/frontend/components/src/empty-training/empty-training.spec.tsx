import { render } from '@testing-library/react';

import EmptyTraining from './empty-training';

describe('EmptyTraining', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmptyTraining />);
    expect(baseElement).toBeTruthy();
  });
});
