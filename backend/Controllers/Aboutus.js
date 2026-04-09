const About = require("../Models/Aboutus");

const CreateOrUpdate = async (req, res) => {
  try {
    const { heading, description, video, cards } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }
    let parsedCards = [];
    if (cards) {
      parsedCards = JSON.parse(cards);
    }
    let about = await About.findOne();

    if (about) {
      about.heading = heading || about.heading;
      about.description = description || about.description;
      about.video = video || about.video;
      about.image = image || about.image;

      if (parsedCards.length > 0) {
        about.cards = parsedCards;
      }
      await about.save();

      return res.status(200).json({
        success: true,
        message: "About updated successfully",
        data: about,
      });
    }

    about = await About.create({
      heading,
      description,
      video,
      image,
      cards: parsedCards,
    });

    res.status(201).json({
      success: true,
      message: "About created successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addCard = async (req, res) => {
  try {
    const { title, description } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    const newCard = {
      title,
      description,
      image,
    };

    about.cards.push(newCard);
    await about.save();

    res.status(201).json({
      success: true,
      message: "Card added successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { title, description } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    const card = about.cards.id(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    card.title = title || card.title;
    card.description = description || card.description;
    card.image = image || card.image;

    await about.save();

    res.status(200).json({
      success: true,
      message: "Card updated successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About not found",
      });
    }

    about.cards = about.cards.filter((card) => card._id.toString() !== cardId);
    await about.save();

    res.status(201).json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateOrUpdate, getAbout, updateCard, addCard, deleteCard };
