import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GenericField } from './GenericField';

const startComponent = <div>start</div>;
const endComponent = <div>end</div>;

describe('GenericField', () => {
  describe('rendering', () => {
    describe('When extra components is not assigned', () => {
      it('Should render children', () => {
        const { unmount } = render(
          <GenericField>
            <div>some text</div>
          </GenericField>
        );
        expect(screen.getByText('some text')).toBeInTheDocument();
        unmount();
      });
    });
    describe('When pass label', () => {
      it('should render label', () => {
        const { unmount } = render(
          <GenericField label="label">
            <div>some text</div>
          </GenericField>
        );
        expect(screen.getByText('label')).toBeInTheDocument();
        unmount();
      });
    });
    describe('When pass extra components', () => {
      describe('When start is assigned', () => {
        let unmount: () => void;
        beforeEach(() => {
          unmount = render(
            <GenericField extraComponents={{ start: startComponent }}>
              <div>some text</div>
            </GenericField>
          ).unmount;
        });
        afterEach(() => {
          unmount();
        });
        it('Should render start component', () => {
          expect(screen.getByText('start')).toBeInTheDocument();
        });
        it('Should render children', () => {
          expect(screen.getByText('some text')).toBeInTheDocument();
        });
      });

      describe('When end is assigned', () => {
        let unmount: () => void;
        beforeEach(() => {
          unmount = render(
            <GenericField extraComponents={{ end: endComponent }}>
              <div>some text</div>
            </GenericField>
          ).unmount;
        });
        afterEach(() => {
          unmount();
        });
        it('Should render end component', () => {
          expect(screen.getByText('end')).toBeInTheDocument();
        });
        it('Should render children', () => {
          expect(screen.getByText('some text')).toBeInTheDocument();
        });
      });
    });
  });
});
