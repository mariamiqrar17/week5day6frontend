import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [textError, setTextError] = useState('');
  const [amountError, setAmountError] = useState('');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    // Reset previous 
    setTextError('');
    setAmountError('');

    // Validation for text
    if (!text.trim()) {
      setTextError('Text cannot be empty');
    } else if (!/^[A-Za-z\s]+$/.test(text)) {
      setTextError('Text must be alphabetic');
    }

    // Validation for amount
    if (!amount.trim()) {
      setAmountError('Amount cannot be empty');
    } else if (isNaN(amount) || !Number.isInteger(Number(amount))) {
      setAmountError('Amount must be a valid integer');
    }

    if (textError || amountError) {
      return;
    }

    const newTransaction = {
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);

    setText('');
    setAmount('');
  };

  return (
    <>
      <p className="font-bold text-white">Add new transaction</p>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text" className="font-bold text-white">
            Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`rounded-md px-3 py-2 outline-none`}
            placeholder="Enter text..."
          />
          {textError && <p className="error" style={{ color: '#b91c1c' }}>{textError}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="amount" className="text-white">
            <span className="font-bold">Amount</span> <br />
            <span className="text-sm">(negative - expense, positive - income)</span>
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
          {amountError && <p className="error" style={{ color: '#b91c1c' }}>{amountError}</p>}
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
