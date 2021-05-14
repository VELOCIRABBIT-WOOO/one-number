import React from 'react';
import { Jumbotron, Button, Container, Carousel } from 'react-bootstrap';

const LandingContainer = () => {
  return (
    <Container>
      <Jumbotron>
        
        <Carousel  fade>
  {/* <Carousel.Item interval={2000}> */}
  <Carousel.Item interval={5000}>
    <img
      className="d-block w-100"
      src="https://filmdaily.co/wp-content/uploads/2021/04/finance-02.jpg"
      height="650"
      // src="../src/finance1.png"
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
          Get Started
        </Button>
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={4000}>
    <img
      className="d-block w-100"
      src="https://www.wbcsd.org/var/site/storage/images/media/images/finance_img/25992-1-eng-GB/finance_img_i1140.jpg"
      height="650"
      // src="../src/finance2.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      <div variant="dark">
      <h3>Quick overview of your finances</h3>
      <p>Let's compare your assets vs. liabilities. Visualize your financial situation.</p>
      </div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://therbootcamp.github.io/R4DS_2019Feb/_sessions/CaseStudies/image/finance.png"
      height="650"
      // src="../src/finance3.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Investment opportunities</h3>
      <p>Follow the market, and take action towards your finanacial</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
      </Jumbotron>
    </Container>
  );
};

export default LandingContainer;
