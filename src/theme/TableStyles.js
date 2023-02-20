import {
  getTableHeadRowColor,
  getTableHeadRowHoverColor,
} from "./setThemeColor";

export const customStyles = {
  table: {},
  tableWrapper: {
    style: {
      display: "table",
      borderRadius: "0px",
    },
  },
  headRow: {
    style: {
      border: "none",
      color: "#fff",
      backgroundColor: getTableHeadRowColor(),
      fontFamily: "Poppins",
      paddingLeft: "8px",
      minHeight: "38px",
      maxHeight: "45px",
      borderBottom: "0.5px solid #DBDDDF",
      paddingBottom: "4px",
      paddingTop: "4px",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      fontSize: "13px",
      paddingLeft: "0px",
      fontWeight: "bold",
      justifyContent: "flex-start",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "0px",
      margin: "0px",
      justifyContent: "flex-start",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: getTableHeadRowHoverColor(),
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #ffffff",
    },
    style: {
      minHeight: "50px",
      padding: "8px",
      fontSize: "12px",
      textTransform: "capitalize",
      border: "none",
    },
  },
};

export const massegetable = {
  table: {},
  tableWrapper: {
    style: {
      display: "table",
      backgroundColor: "black",
      borderRadius: "10px",
    },
  },
  headRow: {
    style: {
      border: "none",
      color: "#fff",
      backgroundColor: getTableHeadRowColor(),
      fontFamily: "Poppins",
      paddingLeft: "8px",
      minHeight: "37px",
      borderBottom: "0.5px solid #DBDDDF",
      paddingBottom: "8px",
      paddingTop: "8px",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      fontSize: "13px",
      paddingLeft: "4px",
      fontWeight: "bold",
      justifyContent: "start",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "0px",
      margin: "0px",
      justifyContent: "start",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#6059c939",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #ffffff",
    },
    style: {
      minHeight: "50px",
      padding: "4px",
      fontSize: "12px",
      textTransform: "capitalize",
      border: "none",
    },
  },
};
export const businessTableStyle = {
  table: {
    style: {
      color: "black",
    },
  },
  tableWrapper: {
    style: {
      display: "table",
      backgroundColor: "black",
    },
  },
  headRow: {
    style: {
      border: "none",
      color: "#4F5E74",
      backgroundColor: "#F7F7F7",
      paddingLeft: "4px",
      minHeight: "50px",
      borderBottom: "0.5px solid #B9B9B9",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "400",
    },
  },
  headCells: {
    style: {
      color: "#000",
      fontSize: "13px",
      paddingLeft: "4px",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "0px",
      margin: "0px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#D5F5E3",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #ffffff",
    },
    style: {
      minHeight: "50px",
      padding: "4px",
      fontSize: "12px",
      textTransform: "capitalize",
      cursor: "pointer",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};
