const Feedback = require("../models/feedback");
const User = require("../models/user");

const createFeedback = async (userId, type, description) => {
  try {
    const feedbackDetails = new Feedback({
      userId,
      type,
      description,
    });
    const savedFeedback = await feedbackDetails.save();
    const feedbackId = savedFeedback._id;
    await User.findByIdAndUpdate(userId, { $push: { feedback: feedbackId } });
    const data = "Feedback created successfully!!";
    return data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = { createFeedback };
