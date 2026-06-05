const Service = require("../Models/Service");

const getServicePage = async (req, res) => {
  try {
    const service = await Service.findOne();
    res.status(200).json({
      success: true,
      data: service || { heading: "", description: "", image: "", cards: [] },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const upsertServicePage = async (req, res) => {
  try {
    const { heading, description } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    let service = await Service.findOne();

    if (service) {
      service.heading = heading || service.heading;
      service.description = description || service.description;
      if (image) {
        service.image = image;
      }
      await service.save();

      return res.status(200).json({
        success: true,
        message: "Service page updated successfully",
        data: service,
      });
    }

    service = await Service.create({
      heading,
      description,
      image,
      cards: [],
    });

    res.status(201).json({
      success: true,
      message: "Service page created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addServiceCard = async (req, res) => {
  try {
    const { title, tags } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Card image is required",
      });
    }

    const service = await Service.findOne();
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service page not found. Please save main content first.",
      });
    }

    let parsedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        parsedTags = tags;
      } else if (typeof tags === "string") {
        parsedTags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    const newCard = {
      title,
      image,
      tags: parsedTags,
    };

    service.cards.push(newCard);
    await service.save();

    res.status(201).json({
      success: true,
      message: "Card added successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateServiceCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { title, tags } = req.body;

    let image = "";
    if (req.file) {
      image = req.file.path;
    }

    const service = await Service.findOne();
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service page not found",
      });
    }

    const card = service.cards.id(cardId);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    card.title = title || card.title;
    if (image) {
      card.image = image;
    }

    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        card.tags = tags;
      } else if (typeof tags === "string") {
        card.tags = tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    await service.save();

    res.status(200).json({
      success: true,
      message: "Card updated successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteServiceCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const service = await Service.findOne();
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service page not found",
      });
    }

    service.cards = service.cards.filter((card) => card._id.toString() !== cardId);
    await service.save();

    res.status(200).json({
      success: true,
      message: "Card deleted successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getServicePage,
  upsertServicePage,
  addServiceCard,
  updateServiceCard,
  deleteServiceCard,
};
