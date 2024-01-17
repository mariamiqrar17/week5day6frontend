import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const formatNumberToK = (number) => {
  if (Math.abs(number) >= 10000) {
    return `${(number / 1000).toFixed(0)}k`;
  } else {
    return number.toFixed(2);
  }
};

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1;

  return (
    <div className="inc-exp-container">
      <div>
        <p className='text-[0.75rem] font-bold'>Income</p>
        <p className="text-[#2ecc71] font-bold money plus">
          ${numberWithCommas(formatNumberToK(income))}
        </p>
      </div>
      <div>
        <p className='text-[0.75rem] font-bold'>Expense</p>
        <p className="text-[#c0392b] font-bold money minus">
          ${numberWithCommas(formatNumberToK(expense))}
        </p>
      </div>
    </div>
  );
};
