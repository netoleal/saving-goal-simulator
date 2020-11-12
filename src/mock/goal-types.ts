import iconCollege from '../icons/icon-college.svg';
import iconBaby from '../icons/icon-baby.svg';
import iconFund from '../icons/icon-fund.svg';
import iconVacation from '../icons/icon-vacation.svg';
import iconWedding from '../icons/icon-wedding.svg';
import iconCar from '../icons/icon-car.svg';

export type Goal = {
  id: string;
  title: string;
  icon: string;
};

const goals: Goal[] = [
  {
    id: 'college',
    title: 'college',
    icon: iconCollege
  },
  {
    id: 'baby',
    title: 'baby',
    icon: iconBaby
  },
  {
    id: 'fund',
    title: 'fund',
    icon: iconFund
  },
  {
    id: 'vacation',
    title: 'vacation',
    icon: iconVacation
  },
  {
    id: 'wedding',
    title: 'wedding',
    icon: iconWedding
  },
  {
    id: 'car',
    title: 'car',
    icon: iconCar
  }
];

export default goals;
