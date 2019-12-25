const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Waiter model
const Waiter = require('../db/models/waiter')

// Load validation
const validateRegisterInput = require('../../src/validation/register');
const validateLoginInput = require('../../src/validation/login');

module.exports = {
  create: (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Waiter.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newWaiter = new Waiter({
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          employeeNumber: req.body.employeeNumber,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newWaiter.password, salt, (err, hash) => {
            if (err) throw err;
            newWaiter.password = hash;
            newWaiter
              .save()
              .then(waiter => res.json(waiter))
              .catch(err => console.error(err));
          });
        });
      }
    });
  },

  authenticate: (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Waiter.findOne({ email }).then(waiter => {
      if(!waiter) {
        return res.status(404).json({ error: "Email not found" });
      }

      bcrypt.compare(password, waiter.password).then(isMatch => {
        if(isMatch) {
          // Create JWT payload
          const payload = {
            id: waiter.id,
            name: waiter.name,
          };

          jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {
              expiresIn: 31556926 // TODO: Change this
            },
            (err, token) => {
              res.json({
                success: true,
                token: token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ error: "Password incorrect" });
        }
      })
    });
  },
};
