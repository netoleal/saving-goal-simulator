import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

jest.mock('../Test/TestComponent', () => ({
  TestComponent: () => <div>neto</div>
}));

const childrenMessage = 'test-content';
const setup = () => {
  return render(
    <Card>
      <button>{childrenMessage}</button>
    </Card>
  );
};

describe('Card', () => {
  const { getByRole, getByText } = screen;
  describe('rendering', () => {
    beforeEach(() => {
      setup();
    });
    // it('should render test component', () => {
    //   expect(getByText('neto')).toBeInTheDocument();
    // });
    it('should render children', () => {
      expect(
        getByRole('button', { name: childrenMessage })
      ).toBeInTheDocument();
    });
  });
});
