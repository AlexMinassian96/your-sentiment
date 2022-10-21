import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SentimentalAnalysis from './SentimentAnalysis';

function App() {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col><h1>Your Sentiment</h1></Col>
      </Row>
      <SentimentalAnalysis />
    </Container>
  )
};

export default App;
