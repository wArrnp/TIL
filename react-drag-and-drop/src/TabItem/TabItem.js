import React from "react";
import styled from "styled-components";

const TabItemSpan = styled.span`
  display: inline-block;
  padding: 10px;
  border: 1px solid black;
  margin: 2px;
  width: 50px;
  text-align: center;
`;

function TabItem({
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  label,
  isDragOverTab
}) {
  return (
    <TabItemSpan
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {isDragOverTab ? "Drag here !" : label}
    </TabItemSpan>
  );
}

export default TabItem;
