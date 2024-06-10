import React, { useContext, useRef, useState } from "react";

export const CanvasContext = React.createContext();


export const CanvasProvider = ({ children }) => {
  const [isPrepared, setPrepared] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [stops, setStops] = useState([]);

  const prepareCanvas = () => {
    if (isPrepared) { return }
    const navbarHeight = 64;
    const canvas = canvasRef.current
    const canvasSize = Math.min(window.innerWidth, window.innerHeight - navbarHeight * 2)
    canvas.width = canvasSize * 2;
    canvas.height = canvasSize * 2;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "brown";
    context.lineWidth = 14;
    contextRef.current = context;
    setPrepared(true);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = getEventPosition(nativeEvent);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setStops([...stops, x.length - 1]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = getEventPosition(nativeEvent);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setX([...x, offsetX]);
    setY([...y, offsetY]);
  };

  const getEventPosition = (nativeEvent) => {
    if (nativeEvent.type === "mousemove" || nativeEvent.type === "mousedown") {
      const { offsetX, offsetY } = nativeEvent;
      return {offsetX, offsetY}
    } else if (nativeEvent.type === "touchstart" || nativeEvent.type === "touchmove") {
      const rect = nativeEvent.target.getBoundingClientRect(); 
      const offsetX = nativeEvent.touches[0].pageX - rect.left;
      const offsetY = nativeEvent.touches[0].pageY - rect.top;;
      return {offsetX, offsetY}
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    setX([]);
    setY([]);
    setStops([]);
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        x,
        y,
        stops,
        isPrepared,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
