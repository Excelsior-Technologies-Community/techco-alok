const Stats = require("../Models/Stats");

const createOrUpdateStats = async (req, res) => {
  try {
    const { stats, heading, description, ratingValue, ratingText } = req.body;
    const rightImage = req.file ? req.file.path : req.body.rightImage;

    let parsedStats = stats;
    if (typeof stats === "string" && stats.trim() !== "") {
      parsedStats = JSON.parse(stats);
    }

    let data = await Stats.findOne();

    if (data) {
      if (Array.isArray(parsedStats) && parsedStats.length > 0) {
        data.stats = parsedStats;
      }
      data.rightImage = rightImage ?? data.rightImage;
      data.heading = heading ?? data.heading;
      data.description = description ?? data.description;
      data.ratingValue = ratingValue ?? data.ratingValue;
      data.ratingText = ratingText ?? data.ratingText;

      await data.save();

      return res.status(200).json({
        success: true,
        message: "Stats updated successfully",
        data,
      });
    }

    data = await Stats.create({
      stats: parsedStats || [],
      rightImage: rightImage || "",
      heading: heading || "",
      description: description || "",
      ratingValue: ratingValue || "",
      ratingText: ratingText || "",
    });

    return res.status(201).json({
      success: true,
      message: "Stats created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStats = async (req, res) => {
  try {
    const data = await Stats.findOne();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addStatItem = async (req, res) => {
  try {
    const { number, suffix, text } = req.body;
    const icon = req.file ? req.file.path : req.body.icon;

    const data = await Stats.findOne();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    data.stats.push({
      number,
      suffix,
      text,
      icon: icon || "",
    });

    await data.save();

    return res.status(201).json({
      success: true,
      message: "Stat item added successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatItem = async (req, res) => {
  try {
    const { statItemId } = req.params;
    const { number, suffix, text } = req.body;
    const icon = req.file ? req.file.path : req.body.icon;

    const data = await Stats.findOne();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    const item = data.stats.id(statItemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Stat item not found",
      });
    }

    item.number = number ?? item.number;
    item.suffix = suffix ?? item.suffix;
    item.text = text ?? item.text;
    item.icon = icon ?? item.icon;

    await data.save();

    return res.status(200).json({
      success: true,
      message: "Stat item updated successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteStatItem = async (req, res) => {
  try {
    const { statItemId } = req.params;

    const data = await Stats.findOne();
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    const exists = data.stats.some(
      (item) => item && item._id && item._id.toString() === statItemId
    );
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Stat item not found",
      });
    }

    data.stats = data.stats.filter(
      (item) => item._id.toString() !== statItemId
    );
    await data.save();

    return res.status(200).json({
      success: true,
      message: "Stat item deleted successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteStats = async (req, res) => {
  try {
    const deleted = await Stats.findOneAndDelete();
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Stats not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stats deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrUpdateStats,
  getStats,
  addStatItem,
  updateStatItem,
  deleteStatItem,
  deleteStats,
};

