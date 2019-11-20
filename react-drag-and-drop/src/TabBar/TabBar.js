import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import TabItem from "../TabItem/TabItem";

const TabBarDiv = styled.div`
  margin: 30px;
  min-height: 120px;
  border: 1px solid black;
`;

function TabBar() {
  let dragTabIndex = useRef();
  let dragOverTabIndex = useRef();
  console.log(dragTabIndex.current);
  console.log(dragOverTabIndex.current);

  const [tabItems, setTabItems] = useState(["A", "B", "C", "D"]);
  const [newTab, setNewTab] = useState("");

  const handleDragStart = useCallback((index, event) => {
    console.log(dragOverTabIndex, dragTabIndex);

    dragTabIndex.current = index;
  }, []);

  const handleDragOver = useCallback((index, event) => {
    event.preventDefault();
    console.log(dragOverTabIndex, dragTabIndex);
    dragOverTabIndex.current = index;
  }, []);

  const handleDragEnd = useCallback(
    (index, event) => {
      console.log(dragOverTabIndex.current, dragTabIndex.current);
      if (
        dragTabIndex.current !== undefined &&
        dragOverTabIndex.current !== undefined &&
        dragTabIndex.current !== dragOverTabIndex.current
      ) {
        // if (dragTabIndex < dragOverTabIndex) dragOverTabIndex--;
        const newTabItems = [...tabItems];
        newTabItems.splice(
          dragOverTabIndex.current,
          0,
          newTabItems.splice(dragTabIndex.current, 1)[0]
        );
        setTabItems(newTabItems);
      }

      dragTabIndex.current = undefined;
      dragOverTabIndex.current = undefined;
    },
    [tabItems]
  );

  const TabItems = tabItems.map((d, i) => {
    console.log(d, i);
    return (
      <TabItem
        kay={`tab-${d}`}
        handleDragStart={e => handleDragStart(i, e)}
        handleDragOver={e => handleDragOver(i, e)}
        handleDragEnd={e => handleDragEnd(i, e)}
        isDragOverTab={dragOverTabIndex.current === i}
        label={d}
      />
    );
  });
  console.log(tabItems);
  return (
    <>
      <TabBarDiv>{TabItems}</TabBarDiv>
      <input
        type="text"
        onChange={e => setNewTab(e.target.value)}
        value={newTab}
      />
      <button
        onClick={() => {
          setTabItems([...tabItems, newTab]);
          setNewTab("");
        }}
      >
        추가
      </button>
    </>
  );
}

export default TabBar;
