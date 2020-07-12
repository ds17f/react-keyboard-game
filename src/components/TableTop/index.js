import React from "react";
import useDimensions from "react-use-dimensions";

import "./styles.css"

export const TableTop = ({gameBoard, top, bottom}) => {
  const [ref, {width, height}] = useDimensions();
  const GameBoard = gameBoard;
  const style = {
    height: window.innerHeight
  };
  return (
    <table style={style} className="TableTop">
      <tbody>
      <tr>
        <td className="TopPanel">
          {top}
        </td>
      </tr>
      <tr>
        <td className="GameBoard" ref={ref}>
          <GameBoard width={width} height={height} />
        </td>
      </tr>
      <tr>
        <td className="BottomPanel">
          {bottom}
        </td>
      </tr>
      </tbody>
    </table>
  )

};
