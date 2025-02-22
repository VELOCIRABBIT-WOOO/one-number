import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { usePlaidLink } from "react-plaid-link";
import { Helmet } from "react-helmet";

const SpaceFiller = (props) => {

  const createPlaidStuff = () => {

    fetch("/plaid/get_link_token")
      .then((response) => response.json())
      .then(({ linkToken }) => {
        const handler = Plaid.create({
          token: linkToken,
          onSuccess: (public_token, metadata) => {
            fetch("/plaid/plaid_token_exchange", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                public_token,
              }),
            })
              .then((data) => data.json())
              .then((resp) => console.log(resp))
              .catch((e) => console.log(e));
          },
          onLoad: () => {},
          onExit: (error, metadata) => {
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

          },
          receivedRedirectUri: null,
        });
        handler.open();
      })
  };





  return (
    <div>
      <Helmet>
        <script
          src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
          type="text/javascript"
        />
      </Helmet>
      {/* <button onClick={() => console.log('test')}>button</button> */}
      <Button type="submit" onClick={createPlaidStuff} variant='light'>
        Connect a bank account
      </Button>
    </div>
  );
};
export default SpaceFiller;
