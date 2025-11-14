import React from "react";

function formatAmount(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0";
  }

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return "0";
  }

  if (Math.abs(numAmount) >= 1000000) {
    const millions = numAmount / 1000000;
    return millions >= 10
      ? `${millions.toFixed(3)}M`
      : `${millions.toFixed(3)}M`;
  }

  if (Math.abs(numAmount) >= 1000) {
    const thousands = numAmount / 1000;
    return thousands >= 10
      ? `${thousands.toFixed(3)}K`
      : `${thousands.toFixed(3)}K`;
  }

  return numAmount % 1 === 0 ? numAmount.toString() : numAmount.toFixed(2);
}

function Amount({ amount, className = "", showCurrency = true }) {
  const formattedAmount = formatAmount(amount);
  const displayValue = showCurrency ? `€${formattedAmount}` : formattedAmount;

  return <span className={className}>{displayValue}</span>;
}

export default Amount;
