const User = require('../models/User');
const bcrypt = require('bcrypt');
const WrongUserCredentialsException = require('../exceptions/WrongUserCredentialsException');

const saltRound = 10;

const userRegistrationJsonSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 2 },
    lastName: { type: 'string', minLength: 2 },
    password: { type: 'string', minLength: 6 },
  },
};

const userCredentialsJsonSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
};

async function createUser(user) {
  const passwordHash = await bcrypt.hash(user.password, saltRound);

  const newUser = new User({
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    passwordHash,
  });

  const savedUser = await newUser.save();

  return savedUser;
}

async function checkUserCredentials(userCredentials) {
  const user = await User.findOne({ email: userCredentials.email }).lean();
  if (user) {
    const isPasswordMatching = await bcrypt.compare(
      userCredentials.password,
      user.passwordHash
    );
    if (isPasswordMatching) return user;
    else {
      throw new WrongUserCredentialsException();
    }
  }
  throw new WrongUserCredentialsException();
}

async function getUser(id) {
  const user = await User.findById(id).select('-passwordHash').lean();
  //   if (!user) {
  //     throw new Error();
  //   }
  return user;
}

module.exports = {
  createUser,
  checkUserCredentials,
  userRegistrationJsonSchema,
  userCredentialsJsonSchema,
  getUser,
};
