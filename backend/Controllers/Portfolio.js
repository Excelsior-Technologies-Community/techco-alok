const Portfolio = require("../Models/Portfolio");

const createPortfolio = async (req, res) => {
  try {
    let data = req.body;
    if (typeof data.content === "string") {
      data.content = JSON.parse(data.content);
    }

    const portfolio = await Portfolio.create(data);

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getallPortfolio = async (req, res) => {
  try {
    const { category, tag } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (tag) {
      filter.tags = tag;
    }

    const portfolios = await Portfolio.find(filter)
      .select("title slug category tags thumbnail shortDescription")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const portfolio = await Portfolio.findOne({ slug });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }
    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    let data = req.body;

    if (typeof data.content === "string") {
      data.content = JSON.parse(data.content);
    }

    const updated = await Portfolio.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Portfolio.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPortfolio,
  getallPortfolio,
  getPortfolioBySlug,
  updatePortfolio,
  deletePortfolio,
};
