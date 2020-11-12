import * as React from 'react';
import { GoalSelectorGrid } from '../../components/GoalSelectorGrid';
import './Landing.page.scss';
import { useIntl } from 'react-intl';

export const LandingPage: React.FC = () => {
  const {
    messages: {
      landing: { title }
    }
  } = useIntl();

  return (
    <section className="landingPage">
      <h1>{title}</h1>
      <GoalSelectorGrid />
    </section>
  );
};
