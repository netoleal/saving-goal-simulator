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
  const deposits = countMonths(new Date(), targetDate);
  const monthlyAmount = Math.ceil(totalAmount / deposits);
  return { deposits, monthlyAmount };
};
