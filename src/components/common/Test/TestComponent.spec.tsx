import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TestComponent } from './TestComponent';
import React from 'react';

const setup = () => {
  return render(<TestComponent />);
};

describe('TestComponent', () => {
  describe('render', () => {
    beforeEach(() => {
      setup();
    });
    it('shoud render title', () => {
      expect(screen.getByText('Testando 123')).toBeInTheDocument();
    });
  });
});
