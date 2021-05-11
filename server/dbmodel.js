const mongoose = require('mongoose');
const keys = require('../api_keys.js');
const MONGO_URI = keys.mongoURI;

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'oneNumberDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  google_id: { type: String, required: true },
  display_name: { type: String, required: true },
  items: {
    type: [
      {
        item_id: {
          type: Schema.Types.ObjectId,
          ref: 'items',
        },
      },
    ],
    required: true,
    default: [],
  },
});

const itemSchema = new Schema({
  item_id: { type: String, required: true },
  access_token: { type: String, required: true },
  accounts: [
    {
      account_id: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
      },
    },
  ],
  securities: [
    {
      account_id: {
        type: Schema.Types.ObjectId,
        ref: 'securities',
      },
    },
  ],
});

const accountSchema = new Schema({
  account_id: { type: String, required: true },
  current_balance: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const securitySchema = new Schema({
  security_id: { type: String, required: true },
  name: { type: String, required: true },
  holdings: [
    {
      holding_id: {
        type: Schema.Types.ObjectId,
        ref: 'holdings',
      },
    },
  ],
});

const holdingSchema = new Schema({
  holding_id: { type: String, required: true },
  institution_value: { type: Number, required: true },
});

// creats a model for the all collections that will be part of the export
const User = mongoose.model('users', userSchema);
const Item = mongoose.model('items', itemSchema);
const Account = mongoose.model('accounts', accountSchema);
const Security = mongoose.model('securities', securitySchema);
const Holding = mongoose.model('holdings', holdingSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  User,
  Item,
  Account,
  Security,
  Holding,
};
