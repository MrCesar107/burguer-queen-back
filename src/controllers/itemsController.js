const Item = require('../db/models/item');

module.exports = {
  index: async (req, res) => {
    const items = await Item.find().catch(() => {
      res.status(500).json({ error: 'An error has ocurred' });
    });

    if(items) {
      res.json(items);
    }
  },

  create: (req, res) => {
    Item.findOne({ name: req.body.name }).then(item => {
      if(item) {
        res.status(400).json({ error: 'This item has already been created' });
      } else {
        const newItem = new Item({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          totalUnits: req.body.totalUnits,
        });

        newItem
          .save()
          .then(item => res.json(item))
          .catch(err => res.status(500).json({ error: err }));
      }
    });
  },

  update: async (req, res) => {
    const { name, description, price, totalUnits } = req.body;
    const newItem = {
      name,
      description,
      price,
      totalUnits,
    };
    await Item.findByIdAndUpdate(req.params.itemId, newItem);
    res.json({ message: 'The item has been updated' });
  },

  delete: async (req, res) => {
    await Item.findByIdAndDelete(req.params.itemId);
    res.json({ message: 'The item has been deleted' });
  }
};
