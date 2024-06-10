import React, { useContext, useState, useEffect, useReducer } from 'react';
import { UserContext } from '../App/useUser'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import SettingsForm from './SettingsForm';
import "./STLGenerator.css"
import { fiestaCloudBackend } from '../App/config';
import Viewer from './Viewer';
import * as Sentry from "@sentry/react";


function reducer(state, item) {
  return { ...state, ...item }
}

function fetchRetry(url, options = {}, retries = 3) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      if (retries > 0) {
        return fetchRetry(url, options, retries - 1)
      } else {
        throw new Error(res)
      }
    })
    .catch(error => {
      if (retries > 0) {
        return fetchRetry(url, options, retries - 1)
      } else {
        throw new Error(error)
      }
    }
    )
}

export default function STLGenerator() {
  const { user } = useContext(UserContext);
  const user_id = user.user.uid;
  const [stlUrl, setStlUrl] = useState('');
  const [stlSettings, setStlSettings] = useReducer(reducer, {});
  const [fetchStlError, setfetchStlError] = useState(false);

  function sendGenerateSTL(uid, settings) {
    setStlUrl('');
    setfetchStlError(false);
    return fetchRetry(fiestaCloudBackend + '/api/stl-generator/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
      .then(data => {
        if (data) {
          setStlUrl(data.url)
        } else {
          setfetchStlError(true);
          Sentry.captureException(new Error(data));
        }
      })
      .catch(error => {
        setfetchStlError(true);
        Sentry.captureException(new Error(error));
      })
  }

  function updateSTL() {
    sendGenerateSTL(user_id, stlSettings);
  }

  useEffect(() => {
    let mounted = true;
    sendGenerateSTL(user_id, {}).then(data => {
      if (mounted && data != null) {
        setStlUrl(data.url)
      }
    });
    return () => mounted = false;
  }, [user_id])

  return (
    <>
      <Container fluid="xl" className="stl-generator-wrapper">
        <Row>
          <Col sm={7}>
            <Viewer fetchStlError={fetchStlError} stlUrl={stlUrl}></Viewer>
          </Col>
          <Col sm={5} >
            <SettingsForm updateSTL={updateSTL} setStlSettings={setStlSettings} />
          </Col>
        </Row>
        <Row>
          <Col >
            <Button as="a" target="_blank" href={stlUrl} className="control-button" size="lg" variant="primary" download>Download STL</Button>
            <Button disabled={true} className="control-button" size="lg" variant="primary">Send to printer</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
