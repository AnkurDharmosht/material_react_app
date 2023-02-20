export function capitalize1(str) {
  if (!str || str === "") {
    return "";
  }
  const arr = str.split(" ");
  let res = "";
  arr.forEach((element) => {
    res +=
      element.charAt(0).toUpperCase() +
      element.substr(1, element.length).toLowerCase() +
      " ";
  });
  return res;
}

export const concatString = (text1, text2) => {
  return text1.concat(" ", text2);
};
export const stringUpper = (text) => {
  if (text) return text.toUpperCase();
  else return null;
};

export const toInt = (text) => {
  return parseInt(text);
};

export const repSpace = (text) => {
  if (!text || text === "") {
    return "";
  }
  let new_text = text.replace(" ", "_");
  return new_text;
};
