
const Mood = require('../models/moodsModel');

// Insert one or many moods in a single DB hit
exports.createMoods = async (req, res) => {
  try {
    let moods = req.body;

    // Accept single mood object too
    if (!Array.isArray(moods)) {
      moods = [moods];
    }

    // Remove duplicates (case insensitive)
    const uniqueMoods = Array.from(
      new Map(
        moods.map(m => [m.name.toLowerCase(), { name: m.name.trim(), description: m.description || '' }])
      ).values()
    );

    if (!uniqueMoods.length) {
      return res.status(400).json({ error: 'No valid moods provided' });
    }

    // Find existing moods
    const existing = await Mood.find({
      name: { $in: uniqueMoods.map(m => m.name) }
    }).select('name');

    const existingNames = existing.map(e => e.name);
    const toInsert = uniqueMoods.filter(m => !existingNames.includes(m.name));

    if (!toInsert.length) {
      return res.status(200).json({ message: 'All moods already exist', inserted: [] });
    }

    const inserted = await Mood.insertMany(toInsert, { ordered: false });

    res.status(201).json({ insertedCount: inserted.length, inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ name: 1 });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}