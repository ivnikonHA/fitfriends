import { render } from '@testing-library/react';

import Questionnarie from './questionnarie';

describe('QuestionnarieUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Questionnarie />);
    expect(baseElement).toBeTruthy();
  });
});
