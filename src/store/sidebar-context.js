import React, { useState } from "react";

const SideBarContext = React.createContext({
  title: "",
  setTitle: (val) => {},
  actIndex: 0,
  setActiveIndex: (val) => {},
});

export const SideBarContextProvider = (props) => {
  const initialTitle = localStorage.getItem("title");
  const [title, setTitle] = useState();
  const inititalIndex = localStorage.getItem("index");
  const inititalSubIndex = localStorage.getItem("subIndex");
  const [actIndex, setActIndex] = React.useState({
    index: inititalIndex,
    subIndex: inititalSubIndex,
  });

  const titleHandler = (title) => {
    setTitle(title);
    localStorage.setItem("title", title);
  };
  const indexHandler = (index, subIndex = -1) => {
    setActIndex({
      index: index,
      subIndex: subIndex,
    });
    localStorage.setItem("index", index);
    localStorage.setItem("subIndex", subIndex);
  };
  const contextValue = {
    title: title,
    setTitle: titleHandler,
    actIndex: actIndex,
    setActiveIndex: indexHandler,
  };

  return (
    <SideBarContext.Provider value={contextValue}>
      {props.children}
    </SideBarContext.Provider>
  );
};

export default SideBarContext;
