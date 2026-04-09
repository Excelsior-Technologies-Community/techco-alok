const Better = require("../Models/Better");

const CreateOrUpdate = async (req, res) => {
  try {
    const { badgeText, breadcrumbText, heading, features } = req.body;

    const leftImage = req.file ? req.file.path : req.body.leftImage;

    let parsedFeatures = features;
    if (typeof features === "string") {
      parsedFeatures = JSON.parse(features);
    }

    let better = await Better.findOne();

    if (better) {
      better.badgeText = badgeText ?? better.badgeText;
      better.breadcrumbText = breadcrumbText ?? better.breadcrumbText;
      better.heading = heading ?? better.heading;
      better.leftImage = leftImage ?? better.leftImage;

      if (Array.isArray(parsedFeatures) && parsedFeatures.length > 0) {
        better.features = parsedFeatures;
      }

      await better.save();

      return res.status(200).json({
        success: true,
        message: "Better updated successfully",
        data: better,
      });
    }

    better = await Better.create({
      badgeText,
      breadcrumbText,
      heading,
      leftImage,
      features: parsedFeatures,
    });

    return res.status(201).json({
      success: true,
      message: "Better created successfully",
      data: better,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addFeature = async (req, res) => {
  try {
    const { title } = req.body;
    const icon = req.file ? req.file.path : req.body.icon;

    const better = await Better.findOne();
    if (!better) {
      return res.status(404).json({
        success: false,
        message: "Better not found",
      });
    }

    better.features.push({
      title,
      icon,
    });

    await better.save();

    return res.status(201).json({
      success: true,
      message: "Feature added successfully",
      data: better,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFeature = async (req, res) => {
  try {
    const { featureId } = req.params;
    const { title } = req.body;
    const icon = req.file ? req.file.path : req.body.icon;

    const better = await Better.findOne();
    if (!better) {
      return res.status(404).json({
        success: false,
        message: "Better not found",
      });
    }

    const feature = better.features.id(featureId);
    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found",
      });
    }

    feature.title = title ?? feature.title;
    feature.icon = icon ?? feature.icon;

    await better.save();

    return res.status(200).json({
      success: true,
      message: "Feature updated successfully",
      data: better,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFeature = async (req, res) => {
  try {
    const { featureId } = req.params;

    const better = await Better.findOne();
    if (!better) {
      return res.status(404).json({
        success: false,
        message: "Better not found",
      });
    }

    const exists = better.features.some(
      (f) => f && f._id && f._id.toString() === featureId
    );
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Feature not found",
      });
    }

    better.features = better.features.filter(
      (f) => f._id.toString() !== featureId
    );
    await better.save();

    return res.status(200).json({
      success: true,
      message: "Feature deleted successfully",
      data: better,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBetter = async (req, res) => {
  try {
    const better = await Better.findOne();
    return res.status(200).json({
      success: true,
      data: better,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBetter = async (req, res) => {
  try {
    const deleted = await Better.findOneAndDelete();
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Better not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Better deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  CreateOrUpdate,
  getBetter,
  deleteBetter,
  addFeature,
  updateFeature,
  deleteFeature,
};
