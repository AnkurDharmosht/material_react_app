export const getSecondaryColor = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#DC5F5F";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#6faa01";
  }
};
export const getTertiaryColor = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#00bf78";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#dc5f5f";
  }
};

export const getActiveColor = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#6059C9";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#6faa01";
  }
};

export const getHoverActive = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#DC5F5F";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#6faa01";
  }
};
export const getHoverInActive = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#8e8acd";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#91de00dd";
  }
};

export const getTableHeadRowColor = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#6059C9";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#6faa01";
  }
};
export const getTableHeadRowHoverColor = () => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    return "#6059C9";
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    return "#b2f92eb4";
  }
};

// user icon bg color change functions . . . .
export const getUserColor = (role) => {
  if (process.env.REACT_APP_TITLE === "BiggPay") {
    if (role === "Asm") {
      return "#6059C9";
    } else if (role === "Ad") {
      return "#f48f26";
    } else if (role === "Ret") {
      return "#00BF78";
    } else if (role === "Dd") {
      return "#6059C9";
    } else if (role === "Api") {
      return "#ff9800";
    }
  } else if (process.env.REACT_APP_TITLE === "Impex") {
    if (role === "Asm") {
      return "#f48f26";
    } else if (role === "Ad") {
      return "#6faa01";
    } else if (role === "Ret") {
      return "#dc5f5f";
    } else if (role === "Dd") {
      return "#00BF78";
    } else if (role === "Api") {
      return "#ff9800";
    }
  }
};
