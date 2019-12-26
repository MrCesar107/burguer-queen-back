const Menu = require('../db/models/menu');

module.exports = {
  index: async (req, res) => {
    const menus = await Menu.find().catch(() => {
      res.status(500).json({ error: 'An error has ocurred' });
    });

    if(menus) {
      res.json({ menus: menus });
    }
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
          .then(menu => res.json(menu))
          .catch(err => res.status(500).json({ error: err }));
      }
    });
  },

  update: async (req, res) => {
    const { name } = req.body;
    const newMenu = { name };
    await Menu.findByIdAndUpdate(req.params.menuId, newMenu);
    res.json({ message: 'The menu has sucessfully updated' });
  },

  delete: async (req, res) => {
    await Menu.findByIdAndDelete(req.params.menuId);
    res.json({ message: 'The menu has sucessfully deleted' });
  }
};
