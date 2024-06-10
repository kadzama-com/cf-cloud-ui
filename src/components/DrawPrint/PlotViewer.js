import React, {useEffect} from 'react';
import Plot from 'react-plotly.js';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';


export default function PlotViewer(props) {
    useEffect(() => {}, [props.plotData, props.fetchError]); 

    if (props.fetchError) {
        return (<>
            <Alert variant='danger'>
                {props.fetchError}
            </Alert>
        </>)
    }

    if (!props.plotData) {
        return (<>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </>)
      }
  return (
    <>
        <Plot data={props.plotData.data} layout={{ showlegend: false, xaxis: { scaleanchor: "y", scaleratio: 1 }, height: window.innerHeight * 0.6 }} />
    </>
  );
}
