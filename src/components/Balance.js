import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const formatNumberToK = (number) => {
  if (Math.abs(number) >= 1000000) {
    return `${(number / 1000000).toFixed(0)}k`;
  } else {
    return number.toFixed(2);
  }
};

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <p className='text-[1rem] font-bold text-white'>Your Balance</p>
      <p className='text-[1.5rem] text-[white] font-bold'>
        ${numberWithCommas(formatNumberToK(total))}
      </p>
    </>
  );
};
