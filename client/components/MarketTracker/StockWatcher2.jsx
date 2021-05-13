import React from 'react';
import { Container } from 'react-bootstrap';


const StockWatcher2 = () => {

  return (
    <Container  fill="true" >
            <iframe src="http://stocksdemo.herokuapp.com" width="100%" border="0" height="750" marginHeight="0" marginWidth="0" scrolling="no"/>
    </Container>
  );
};
export default StockWatcher2;
