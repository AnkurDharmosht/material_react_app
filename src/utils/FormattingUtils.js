export const cardNumberFormat = (cardNumber) => {
  let num = cardNumber.replace(/-/g, "");
  let len = num.length;
  console.log("length ", len);
  if (len !== 0 && len !== 16 && len % 4 === 0) {
    if (cardNumber.charAt(cardNumber.length - 1) === "-") {
      let card = cardNumber.slice(0, cardNumber.length - 1);
      console.log("cardnumber", card);
      return card;
    }
    return cardNumber + "-";
  }
};
export const adhaarNumberFormat = (cardNumber) => {
  let num = cardNumber.replace(/-/g, "");
  let len = num.length;
  console.log("length ", len);
  if (len !== 0 && len !== 12 && len % 4 === 0) {
    if (cardNumber.charAt(cardNumber.length - 1) === "-") {
      let card = cardNumber.slice(0, cardNumber.length - 1);
      console.log("cardnumber", card);
      return card;
    }
    return cardNumber + "-";
  }
};

export const capitalize = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};
