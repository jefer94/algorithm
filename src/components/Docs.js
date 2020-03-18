import React from 'react'
import { IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonListHeader, IonGrid, IonRow, IonCol } from '@ionic/react'
import './Docs.sass'
import keychain from '../libs/keychain'

function addDoc(name, description, content) {
  return {
    id: keychain('doc'),
    name,
    description,
    content
  }
}

export default function () {
  const docs = [
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
    addDoc('hola', 'asdasdsaddsasddsadsadaddsaa')
  ]
  return (
    <div className="algorithm-docs-wrapper">
      <IonSearchbar mode="ios" />
      <IonGrid>
        <IonRow>
          <IonCol size-xs="12" size-lg="6">
            <IonList>
              <IonListHeader mode="ios">Save</IonListHeader>
              {docs.map(({ id, name, description }) => (
                <IonItem key={id}>
                  <IonLabel>
                    <h1>{name}</h1>
                    <p>{description}</p>
                  </IonLabel>
                  {/* <IonButton slot="end" color="tertiary">Delete</IonButton> */}

                  <IonButton slot="end">Load</IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
          <IonCol size-xs="12" size-lg="6">
            <IonList>
              <IonListHeader mode="ios">Tutorial</IonListHeader>
              {docs.map(({ id, name, description }) => (
                <IonItem key={id}>
                  <IonLabel>
                    <h1>{name}</h1>
                    <p>{description}</p>
                  </IonLabel>
                  <IonButton slot="end">Load</IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}
