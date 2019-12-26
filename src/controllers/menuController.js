const Menu = require('../db/models/menu');

module.exports = {
  index: (req, res) => {
    Menu.find({}).then((menus) =>  {
      res.json({
        menus: menus,
      })
    });
  },

  create: (req, res) => {
    Menu.findOne({ name: req.body.name }).then(menu => {
      if (menu) {
        return res.status(400)
          .json({ error: 'This menu has already created' });
      } else {
        const newMenu = new Menu({
          name: req.body.name,
        });

        newMenu
          .save()
          .then(menu => {
            res.json({ menu: menu });
        }).catch(err => {
          res.status(500).json({ error: err })
        });
      }
    });
  },

  update: (req, res) => {
    Menu.findByIdAndUpdate(req.params.menuId, {
      $set: req.body
    }).then(err => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.json({ message: 'The menu has updated sucessfully' });
      }
    });
  },

  delete: (req, res) => {
    Menu.findByIdAndDelete(req.params.menuId).then(err => {
      if (err) {
        req.status(400).json({ error: err });
      } else {
        req.json({ message: 'The menu has sucessfully deleted' });
      }
    });
  }
};
