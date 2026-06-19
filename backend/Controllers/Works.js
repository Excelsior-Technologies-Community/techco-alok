const Works = require("../Models/Works");

const getWorksPage = async (req, res) => {
  try {
    const works = await Works.findOne();
    res.status(200).json({
      success: true,
      data: works || { heading: "Our Recent Best Works", description: "Our recent projects highlight our expertise in delivering tailored solutions that meet the unique needs and objectives of our clients,custom software.", cards: [] },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const upsertWorksPage = async (req, res) => {
  try {
    const { heading, description } = req.body;

    let works = await Works.findOne();

    if (works) {
      works.heading = heading || works.heading;
      works.description = description || works.description;
      await works.save();

      return res.status(200).json({
        success: true,
        message: "Works section updated successfully",
        data: works,
      });
    }

    works = await Works.create({
      heading: heading || "Our Recent Best Works",
      description: description || "Our recent projects highlight our expertise in delivering tailored solutions that meet the unique needs and objectives of our clients,custom software.",
      cards: [],
    });

    res.status(201).json({
      success: true,
      message: "Works section created successfully",
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addWorksCard = async (req, res) => {
  try {
    const { title, tag } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Work image is required",
      });
    }

    let works = await Works.findOne();
    if (!works) {
      works = await Works.create({
        heading: "Our Recent Best Works",
        description: "Our recent projects highlight our expertise in delivering tailored solutions that meet the unique needs and objectives of our clients,custom software.",
        cards: [],
      });
    }

    const newCard = {
      title,
      tag,
      image,
    };

    works.cards.push(newCard);
    await works.save();

    res.status(201).json({
      success: true,
      message: "Work item added successfully",
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateWorksCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { title, tag } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    const works = await Works.findOne();
    if (!works) {
      return res.status(404).json({
        success: false,
        message: "Works section not found",
      });
    }

    const card = works.cards.id(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    card.title = title || card.title;
    card.tag = tag || card.tag;
    if (image) {
      card.image = image;
    }

    await works.save();

    res.status(200).json({
      success: true,
      message: "Work item updated successfully",
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteWorksCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const works = await Works.findOne();
    if (!works) {
      return res.status(404).json({
        success: false,
        message: "Works section not found",
      });
    }

    works.cards = works.cards.filter((card) => card._id.toString() !== cardId);
    await works.save();

    res.status(200).json({
      success: true,
      message: "Work item deleted successfully",
      data: works,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWorksPage,
  upsertWorksPage,
  addWorksCard,
  updateWorksCard,
  deleteWorksCard,
};
