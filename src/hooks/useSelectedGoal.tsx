import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getGoals, getSetup } from '../store/goals/selectors';

export function useSelectedGoal() {
  const router = useRouteMatch<{ id: string }>();
  const goals = useSelector(getGoals);
  const setups = useSelector(getSetup);

  const selected = goals.find(item => item.id === router.params.id);
  const setup = setups.find(item => item.id === router.params.id)?.setup;

  return { selected, setup };
}
