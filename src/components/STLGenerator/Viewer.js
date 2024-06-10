import { ModelViewer } from 'react-3d-model-viewer'
import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import "./STLGenerator.css"

export default function Viewer(props) {
    useEffect(() => { }, [props.stlUrl, props.fetchStlError]);

    if (props.fetchStlError) {
        return (<>
            <Alert variant='danger'>
                Возникла ошибка генерации модели, пожалуйста, попробуйте снова.
            </Alert>
        </>)
    }

    if (props.stlUrl === '') {
        return (<>
            <Alert variant='primary'>
                Выполняется генерация модели. Процесс может занять до 1 минуты.
            </Alert>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </>)
    }
    return (
        <>
            <ModelViewer width="100%" aspectgRatio="100%" rotationSpeeds={[0, 0, 0]} initControlPosition={[0, 0, 0.4]} backgroundColor="#ffffff" url={props.stlUrl} />
        </>
    );
}
