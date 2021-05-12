var express = require("express");
var router = express.Router();
const plaid = require("plaid");

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", function (req, res) {
  res.send("Birds home page");
});
// define the about route
router.get("/about", function (req, res) {
  res.send("About birds");
});

router.get("/get_link_token", async (req, res) => {
  // console.log('req.user', req.user);
  const response = await client
    .createLinkToken({
      user: {
        client_user_id: "this is the user id lol",
      },
      client_name: "OneNumber",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    })
    .catch((err) => {
      console.log(err);
    });
  const linkToken = response.link_token;

  res.json({ linkToken });
});

router.post("/plaid_token_exchange", async (req, res) => {
  const { public_token } = req.body;
  const { access_token } = await client
    .exchangePublicToken(public_token)
    .catch((e) => console.log(e));
  const { accounts, item } = await client
    .getAccounts(access_token)
    .catch((e) => console.log(e));
  return res.status(200).json({ access_token });
});

module.exports = router;
