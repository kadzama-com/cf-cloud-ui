import React from 'react'
import { Canvas } from './Canvas/Canvas'
import { Controls } from './Controls/Controls'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { CanvasProvider } from "./Canvas/CanvasContext";
import { firebaseConfig } from '../App/firebase'
import { FirestoreProvider } from "@react-firebase/firestore";
import "./DrawApp.css"
import { Header } from './Header/Header';


function DrawApp() {
  return (
    <>
    <div className="draw-app-wrapper">
      <FirestoreProvider {...firebaseConfig} firebase={firebase}>
        <CanvasProvider>
          <Header />
          <Canvas />
          <Controls />
        </CanvasProvider>
      </FirestoreProvider>
      </div>
    </>
  );
}

export default DrawApp;
