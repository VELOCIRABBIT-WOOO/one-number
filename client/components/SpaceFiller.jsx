import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { usePlaidLink } from 'react-plaid-link';
import {Helmet} from "react-helmet";

const SpaceFiller = (props) => {


  const createPlaidStuff = () => {
    // console.log(Plaid);
    fetch('/plaid/get_link_token')
      .then(response => response.json())
      .then(({linkToken}) => {
        
        const handler = Plaid.create({
          token: linkToken,
          onSuccess: (public_token, metadata) => {
            // console.log('testing if onsuccess got called');
            console.log(public_token);
            console.log(metadata);
          },
          onLoad: () => {

          },
          onExit: (error, metadata) => {
            // console.log('error occured on plaid create');
            // Save data from the onExit handler
            supportHandler.report({
              error: error,
              institution: metadata.institution,
              link_session_id: metadata.link_session_id,
              plaid_request_id: metadata.request_id,
              status: metadata.status,
            });
          },
          onEvent: (eventName, metadata) => {
            // send event and metadata to self-hosted analytics
            // console.log('event happened');
            console.log(eventName);
            console.log(metadata);
          },
          receivedRedirectUri: null,

        })
        handler.open();
        // sethandlerFunc(handler);

      });
  }

  return (
    <div>
                  <Helmet>
              <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js" type="text/javascript" />
            </Helmet>
    {/* <button onClick={() => console.log('test')}>button</button> */}
      <Button type='submit' onClick={createPlaidStuff}>
        Connect a bank account
      </Button>
    </div>
  );
};
export default SpaceFiller;
