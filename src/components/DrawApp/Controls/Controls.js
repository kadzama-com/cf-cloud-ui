import React from "react";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Controls.css"
import { useCanvas } from '../Canvas/CanvasContext'
import { SendToPrintButton } from "./SendToPrintButton";

export function Controls() {
  const { x, clearCanvas } = useCanvas()
  return (
    <>
      <div className="controls-wrapper">
        <Navbar fixed="bottom" bg="dark" className="justify-content-center">
          <Nav>
            <Button onClick={clearCanvas} disabled={x.length === 0} className="control-button" size="lg" variant="light">Очистить</Button>
            <SendToPrintButton />
          </Nav>
        </Navbar>
      </div>
    </>
  );
}
