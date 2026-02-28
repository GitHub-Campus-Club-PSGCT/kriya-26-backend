import AlgorithmCard from "../models/AlgorithmCard.js";

// Create a new algorithm card
export const createCard = async (req, res) => {
  try {
    const card = new AlgorithmCard(req.body);
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(400).json({ msg: "Error creating card", error: err });
  }
};

// Update an existing algorithm card
export const updateCard = async (req, res) => {
  try {
    const card = await AlgorithmCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ msg: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(400).json({ msg: "Error updating card", error: err });
  }
};

// Delete an algorithm card
export const deleteCard = async (req, res) => {
  try {
    const card = await AlgorithmCard.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ msg: "Card not found" });
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Error deleting card", error: err });
  }
};

// Get all algorithm cards
export const getCards = async (_req, res) => {
  try {
    const cards = await AlgorithmCard.find();
    res.json(cards);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching cards", error: err });
  }
};

// Get a specific algorithm card by ID
export const getCard = async (req, res) => {
  try {
    const card = await AlgorithmCard.findById(req.params.id);
    if (!card) return res.status(404).json({ msg: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching card", error: err });
  }
};
