import { render } from '@testing-library/react';

import PopupBuy from './popup-buy';

describe('PopupBuy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopupBuy />);
    expect(baseElement).toBeTruthy();
  });
});
