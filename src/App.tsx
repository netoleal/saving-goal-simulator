import * as React from 'react';
import { Layout } from './components/common/Layout';
import { SavingGoalSimulator } from './components/SavingGoalSimulator';

const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <SavingGoalSimulator />
    </Layout>
  );
};

export default App;
