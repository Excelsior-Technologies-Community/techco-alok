const Stats = require("../Models/Stats");

const createOrupdateStats = async (req, res) => {
  try {
    const { stats } = req.body;
    let parsedStats = [];
    if (stats) {
      parsedStats = JSON.parse(stats);
    }
    let rightImage = "";
    if (req.file) {
      rightImage = req.file.path;
    }
    let data = await Stats.findOne();
    if (data) {
      if (parsedStats.length > 0) {
        data.stats = parsedStats;
      }
      data.rightImage = rightImage || data.rightImage;
      await data.save();

      return res.status(200).json({
        success: true,
        message: "Stats updated successfully",
        data,
      });
    }
  } catch (error) {}
};
