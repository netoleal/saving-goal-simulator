import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Layout } from './Layout';

const childrenMessage = 'test-content';
const setup = () => {
  return render(
    <Layout>
      <button>{childrenMessage}</button>
    </Layout>
  );
};

describe('Layout', () => {
  const { getByAltText, getByRole } = screen;
  describe('rendering', () => {
    beforeEach(() => {
      setup();
    });
    it('should render logo', () => {
      expect(getByAltText('Origin Logo')).toBeInTheDocument();
    });
    it('should render children', () => {
      expect(
        getByRole('button', { name: childrenMessage })
      ).toBeInTheDocument();
    });
  });
});
