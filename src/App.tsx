import * as React from 'react';
import { Layout } from './components/common/Layout';
import { SavingGoalSimulator } from './components/SavingGoalSimulator';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from './pages/Landing';

const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/setup/:id">
            <SavingGoalSimulator />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
