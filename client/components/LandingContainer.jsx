import React from 'react';
import { Jumbotron, Button, Container, Carousel } from 'react-bootstrap';

const LandingContainer = () => {
  return (
    <Container>
      <Jumbotron>
        
        <Carousel  fade>
  <Carousel.Item interval={10000}>
    <img
      className="d-block w-100"
      height="650"
      src="http://carlosandresbotero.com/velocirabbit/finance1.png"
      alt="First slide"
      position="fixed"
    />
    <Carousel.Caption>
    <h1>Welcome!</h1>

      <p>
        This is One Number, a simple web app that uses the Plaid api to pull
        your real time financial data. This allows you to get a better picture
        of your financial health, narrowed down to one number.
      </p>
      <p>
        <Button href="/auth/google" variant="secondary">
          Let's Get Started
        </Button>
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={10000}>
    <img
      className="d-block w-100"
      height="650"
      src="http://carlosandresbotero.com/velocirabbit/finance2.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      <div variant="dark">
      <h3>Quick overview of your finances</h3>
      <p>Let's compare your assets vs. liabilities. Visualize your financial situation.</p>
      <p>
        <Button href="/dashboard" variant="secondary">
          Real Time Analisis
        </Button>
      </p>
      </div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={10000}>
    <img
      className="d-block w-100"
      height="650"
      src="http://carlosandresbotero.com/velocirabbit/finance3.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Investment opportunities</h3>
      <p>Follow the market, and take action towards your finanacial</p>
      <p>
        <Button href="/market" variant="dark">
          Stock Market
        </Button>
      </p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
      </Jumbotron>
    </Container>
  );
};

export default LandingContainer;
