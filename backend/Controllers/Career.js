const Career = require("../Models/Career");

const CreateOrUpdate = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    let career = await Career.findOne();

    if (career) {
      career.heading = heading;
      career.paragraph = paragraph;

      if (image) {
        career.image = image;
      }

      await career.save();

      return res.status(200).json({
        success: true,
        message: "Career updated successfully",
        data: career,
      });
    }

    career = new Career({
      image,
      heading,
      paragraph,
    });
    await career.save();
    res.status(201).json({
      success: true,
      message: "Career created successfully",
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCareer = async (req, res) => {
  try {
    const career = await Career.findOne();

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    res.status(200).json({
      success: true,
      count: career.length,
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateOrUpdate, getCareer };
