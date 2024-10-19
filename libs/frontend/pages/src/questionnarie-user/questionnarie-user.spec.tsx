import { render } from '@testing-library/react';

import QuestionnarieUser from './questionnarie-user';

describe('QuestionnarieUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionnarieUser />);
    expect(baseElement).toBeTruthy();
  });
});
