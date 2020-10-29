export type SavingGoalCalculatorResult = {
  deposits: number;
  monthlyAmount: number;
};

function countMonths(fromDate: Date, toDate: Date): number {
  return (
    toDate.getMonth() -
    fromDate.getMonth() +
    12 * (toDate.getFullYear() - fromDate.getFullYear())
  );
}

export const useSavingGoalCalculator = () => (
  totalAmount: number,
  targetDate: Date
): SavingGoalCalculatorResult => {
  const deposits = Math.max(0, countMonths(new Date(), targetDate));
  if (deposits === 0) {
    return { deposits, monthlyAmount: 0 };
  }
  const monthlyAmount = Math.max(0, Math.ceil(totalAmount / deposits));
  return { deposits, monthlyAmount };
};
