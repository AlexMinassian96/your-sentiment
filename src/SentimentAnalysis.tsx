import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import styled from 'styled-components';
import { Col, Form, Row, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import KeywordGrid from './KeywordGrid';

interface SentimentAnalysis {
  type: string;
  score: number;
  ratio: number;
  keywords: [{word: string, score: number}];
};

const Score = styled.div`
  margin-top: 5px;
  font-size: 22px;
  font-style: bold;
`

const getOptions = (textboxValue: string): AxiosRequestConfig => {
  return {
    method: 'GET',
    params: {text: textboxValue},
    url: 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/',
    headers: {
      'X-RapidAPI-Key': "6a045506femsha1539aeb8fc2981p1a5b33jsn0c9848d07642",
      'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
    }
  }
};


function sentimentRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return (
        textboxValue: string,
        valueSetter: (sentiment: SentimentAnalysis | undefined) => void,
        errorSetter: (error: any) => void
        ) => {
            axios.request<SentimentAnalysis>(getOptions(textboxValue)).then(function(response) {
                valueSetter(response.data);
            }).catch(function(error) {
                errorSetter(error);
            });
        }
};

function SentimentalAnalysis() {
  const [textboxValue, setTextboxValue] = useState<string>('');
  const [sentiment, setSentiment] = useState<SentimentAnalysis | undefined>(undefined);
  const [error, setError] = useState(undefined);
  
  return (
  <>
    <Row>
        <Col lg='6' sm >
            <Form onSubmit={(e) => sentimentRequest(e)(textboxValue, setSentiment, setError)}>
                <Form.Group className="mb-3" controlId="textbox">
                    <Form.Label>Please enter your current thought:</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3}
                        value={textboxValue} 
                        onChange={(e) => setTextboxValue(e.target.value)}
                        />
                </Form.Group>
                <Button variant='primary' type="submit">Submit</Button>
            </Form>
        </Col>
    </Row>
    <Row>
        <Col sm>
        {sentiment 
            ? <Score>{`Your Score: ${Math.round(sentiment.score * 100)}`}</Score> 
            : <></>}
        </Col>
        <Col>
          {sentiment 
            ? <KeywordGrid keywords={sentiment.keywords}/> 
            : <></>}
        </Col>
    </Row>
</>
)};

export default SentimentalAnalysis;
