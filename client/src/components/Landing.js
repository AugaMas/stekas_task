import React from 'react';
import { Container } from 'react-bootstrap';

function Landing() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Stekas užduotis</h1>
      <p>
        Vartotojas suveda savo rekvizitus (vardas, pavardė), pristatymo datą bei
        prekes ir jų kiekius. <br />
        Prekių vienam užsakymui galima įvesti daug. Vartotojas gali redaguoti
        užsakymą: <br />* Pridėti/ištrinti prekių; <br />* Redaguoti pristatymo
        datą.
        <br /> Taip pat reikalingas užsakymų sąrašo langas su minimaliomis
        filtravimo galimybėmis.
      </p>
    </Container>
  );
}

export default Landing;
