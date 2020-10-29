import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

const childrenMessage = 'test-content';
const setup = () => {
  return render(
    <Card>
      <button>{childrenMessage}</button>
    </Card>
  );
};

describe('Card', () => {
  const { getByRole } = screen;
  describe('rendering', () => {
    beforeEach(() => {
      setup();
    });
    it('should render children', () => {
      expect(
        getByRole('button', { name: childrenMessage })
      ).toBeInTheDocument();
    });
  });
});
