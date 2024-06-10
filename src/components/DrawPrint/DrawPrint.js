import React, { useContext, useState, useEffect, useReducer } from 'react';
import { UserContext } from '../App/useUser'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SettingsForm from './SettingsForm';
import { storageUserDrawingGcodeRef } from '../App/firebase'
import { fiestaCloudBackend } from '../App/config';
import PlotViewer from './PlotViewer';
import * as Sentry from "@sentry/react";


function reducer(state, item) {
  return { ...state, ...item }
}

function getGcodeUrl(uid) {
  return storageUserDrawingGcodeRef(uid).getDownloadURL()
    .catch(function (error) {
      console.log(error)
    })
}

export default function DrawPrint() {
  const { user } = useContext(UserContext);
  const user_id = user.user.uid;
  const [gcodeFileUrl, setGcodeFileUrl] = useState('#');
  const [plot, setPlot] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [drawSettings, setDrawSettings] = useReducer(reducer, {});

  function getUserDrawingPlot(uid, settings) {
    setFetchError(null);
    setFetchError(null);
    setPlot(null);
    return fetch(fiestaCloudBackend + '/api/user/' + uid + "/drawing/", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })
      .then(res => {
        if (res.status === 201 || res.status === 200) {
          return res.json()
        } else if (res.status === 204) {
          setFetchError('Рисунок не найден. Перейдите на страницу "Рисование" и отправьте рисунок в печать');
        } else {
          setFetchError('Ошибка загрузки рисунка. Попробуйте позже.');
        }
        throw new Error(res)
      })
      .then(data => {
        setPlot(JSON.parse(data))
      })
      .catch(error => {
        Sentry.captureException(new Error(error));
      })
  }

  function updatePlot() {
    getUserDrawingPlot(user_id, drawSettings)
    getGcodeUrl(user_id).then(url => setGcodeFileUrl(url));
  }

  useEffect(() => {
    let mounted = true;
    getGcodeUrl(user_id)
      .then(url => {
        if (mounted) {
          setGcodeFileUrl(url)
        }
      })
    getUserDrawingPlot(user_id, {})
    return () => mounted = false;
  }, [user_id])

  return (
    <>
      <Container fluid="xl">
        <Row>
          <Col sm={8}>
            <PlotViewer fetchError={fetchError} plotData={plot}></PlotViewer>
          </Col>
          <Col sm={4} >
            <SettingsForm updatePlot={updatePlot} setDrawSettings={setDrawSettings} />
          </Col>
        </Row>
        <Row>
          <Col >
            <Button as="a" target="_blank" href={gcodeFileUrl} className="control-button" size="lg" variant="primary" download>Скачать GCODE</Button>
            <Button as="a" target="_blank" href='/draw' className="control-button" size="lg" variant="secondary">Рисование</Button>
            <Button disabled={true} className="control-button" variant="secondary" size="lg">Отправить в печать</Button>
          </Col>
        </Row>
      </Container>

    </>
  );
}
