import React from 'react';
import ModelList from './Model/ModelList';
import ModelPage from './Model/ModelPage';
import './Library.css';
import { ModelContext, useModel } from './Model/ModelContext';
import { Container } from 'react-bootstrap';


export default function Library() {
  const { currentModel, setCurrentModel, cleanCurrentModel } = useModel();

  if (!currentModel) {
    return (
      <div className="wrapper">
        <ModelContext.Provider value={{ currentModel, setCurrentModel, cleanCurrentModel }} >
          <Container fluid="xl" >
            <h2>Библиотека моделей</h2>
            <ModelList />
          </Container>

        </ModelContext.Provider>
      </div >

    );
  }

  return (
    <div className="wrapper">
      <ModelContext.Provider value={{ currentModel, setCurrentModel, cleanCurrentModel }} >
        <Container fluid="xl" >
          <ModelPage />
        </Container>


      </ModelContext.Provider>
    </div>
  );
}
