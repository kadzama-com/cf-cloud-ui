import React, { useContext, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

import "./Controls.css"
import { useCanvas } from '../Canvas/CanvasContext'
import { UserContext } from '../../App/useUser';
import { firestoreUserDrawingDocument } from '../../App/firebase'


export function SendToPrintButton() {
  const { user } = useContext(UserContext);
  const { x, y, stops } = useCanvas();
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [x])

  function sendToDB() {
    return firestoreUserDrawingDocument(user.user.uid)
      .set({
        x: x,
        y: y,
        stops: stops
      })
  }

  function SendButton() {
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
      if (isLoading) {
        sendToDB().then(() => {
          setLoading(false);
          setDisabled(true);
        });
      }
    }, [isLoading]);

    const handleClick = () => {
      setLoading(true);
    }

    return (
      <Button
        disabled={isLoading || isDisabled || x.length === 0}
        className="control-button" size="lg" variant="success"
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Отправка...' : isDisabled ? 'Отправлено' : 'Отправить в печать'}
      </Button>
    );
  }

  return (<SendButton />);
}
