const Menu = require('../db/models/menu');

const addItemsToMenu = (itemsData, menuData) => {
  return new Promise((resolve, reject) => {
    itemsData.forEach(item => {
      Menu.findByIdAndUpdate(
        menuData.id,
        { $push: { items: item.id } },
        { new: true }
      ).exec()
       .then()
       .catch((err) => reject(err));
    });
  });
}

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
    const { name, items } = req.body;
    Menu.findOne({ name: name })
      .then(async (menu) => {
        if(menu) {
          res.status(500).json({ error: 'Menu already exists' });
        } else {
          const newMenu = new Menu({ name });
          await newMenu.save();
          addItemsToMenu(items, newMenu);
          res.json(newMenu);
        }
      })
  },

  update: async (req, res) => {
    const { name, items } = req.body;
    await Menu.findByIdAndUpdate(req.params.menuId,
      { $set: { items: [] } },
      { multi: true }
    ).catch(err => res.status(500).json({ error: err }));
    await Menu.findByIdAndUpdate(req.params.menuId,
      { name: name,
        $push: { items: { $each: items } }
      }
    ).catch(err => res.status(500).json({ error: err }));
    res.json({ message: 'The menu has sucessfully updated' });
  },

  delete: async (req, res) => {
    await Menu.findByIdAndDelete(req.params.menuId);
    res.json({ message: 'The menu has sucessfully deleted' });
  },
};
