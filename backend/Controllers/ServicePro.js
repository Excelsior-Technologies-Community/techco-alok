const Process = require("../Models/ServiceProcess");

const saveProcessSections = async (req, res) => {
  try {
    const { sections } = req.body;
    const parsedSections =
      typeof sections === "string" ? JSON.parse(sections) : sections;
    let process = await Process.findOne();

    if (process) {
      process.sections = parsedSections;
      await process.save();

      return res.status(200).json({
        success: true,
        message: "Process sections updated successfully",
        data: process,
      });
    }

    process = new Process({
      sections: parsedSections,
    });

    await process.save();

    res.status(201).json({
      success: true,
      message: "Process sections created successfully",
      data: process,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProcessSection = async (req, res) => {
  try {
    const process = await Process.findOne();

    if (!process) {
      return res.status(404).json({
        success: false,
        message: "No process data found",
      });
    }

    res.status(200).json({
      success: true,
      data: process.sections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { saveProcessSections, getProcessSection };
