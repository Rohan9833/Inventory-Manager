const authService = require("../services/auth.service");

const loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.user
    });
}

module.exports = {
  loginUser,
  getProfile,
};