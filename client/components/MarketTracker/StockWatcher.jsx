import React from 'react';
import { Container, Row, Col, Grow, Button } from 'react-bootstrap';


const StockWatcher = () => {

  function myToggleFunction3() {
    var x = document.getElementById("myDIV3");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  return (
    <Container>
      {/* <Row height="20">
        <Col height="20">
        </Col>
      </Row> */}
       {/*  */}
      <Row style={{ padding: '0.5rem' }}>
        <Col>
          <Button variant="outline-success" width={4} onClick={e => myToggleFunction3(e)}>Watch your Stock</Button>
        </Col>
      </Row>
          <div id="myDIV3" style={{ display: 'none' }} size={12}>
      <Row size={12} variant='light'  fill="true" >

            <iframe src="http://stocksdemo.herokuapp.com" width="100%" border="0" height="750" marginHeight="0" marginWidth="0" scrolling="no"/>
      </Row>
          </div>
    </Container>
  );
};
export default StockWatcher;
