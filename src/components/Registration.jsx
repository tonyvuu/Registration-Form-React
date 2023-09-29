import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import '../index.css';

export const Registration = () => {
// my useState hooks
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [anyAge, setAnyAge] = useState('');
  const [submitInfo, setSubmitInfo] = useState([]);

  const fetchApi = async () => { // my function that retrieves the api data
    const random = ['jackie chan', 'spider-man', 'hulk', 'insidious', 'frozen','spongebob','star wars']; //giving random movie into the random variable

    const randomMovie = random[Math.floor(Math.random() * random.length)];
    let response = await fetch(`https://www.omdbapi.com/?s=${randomMovie}&apikey=ae0b0db1`); 
    let data = await response.json(); // a function that reads the response like fetch and interpret it as JSON data, making it usable js object then store into data variable
    if (data.Search && data.Search.length > 0) { // if the search and length is greater than 0; we will run the condition below
      const randomMovieData = data.Search[Math.floor(Math.random() * data.Search.length)];


      const newInput = { // new variable that it will use to store user input
        firstName: firstName,
        lastName: lastName,
        anyAge: anyAge,
        anyImage: randomMovieData.Poster,
      };
      setSubmitInfo([...submitInfo, newInput]); // that newInput is going to update the submitInfo array
      // setSubmitInfo is a function that will then be responsible for updating variable submitInfo when called upon
    }
  };




  const handleSubmit = (e) => { // this function will call upon the fetchApi function
    e.preventDefault();
    fetchApi();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            placeholder="select your birthdate"
            value={anyAge}
            onChange={(e) => setAnyAge(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          SUBMIT
        </Button>

        <Carousel style={{width: "400px"}}>
          {submitInfo.map((user, index) => (
            <Carousel.Item style={{width: "400px"}} key={index}>
              <Card >
                <Card.Img src={user.anyImage} alt="Movie Poster" />
                <Card.Body>
                  <Card.Title>Full Name: {user.firstName} {user.lastName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Birthdate: {user.anyAge}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </Form>
    </div>
  );
};
