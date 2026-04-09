const Team = require("../Models/Team");

const CreateOrUpdate = async (req, res) => {
  try {
    const { breadcrumbText, badgeText, heading, description } = req.body;
    const rightImage = req.file ? req.file.path : req.body.rightImage;

    let team = await Team.findOne();

    if (team) {
      team.breadcrumbText = breadcrumbText ?? team.breadcrumbText;
      team.badgeText = badgeText ?? team.badgeText;
      team.heading = heading ?? team.heading;
      team.description = description ?? team.description;
      team.rightImage = rightImage ?? team.rightImage;

      await team.save();

      return res.status(200).json({
        success: true,
        message: "Team updated successfully",
        data: team,
      });
    }

    team = await Team.create({
      breadcrumbText,
      badgeText,
      heading,
      description,
      rightImage,
    });

    return res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne();
    return res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const deleted = await Team.findOneAndDelete();
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateOrUpdate, getTeam, deleteTeam };

