const authService = require("../services/auth.service");

const signup = async (req, res, next) => {
  try {
    const { user, token } = await authService.signup(req.body);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};

const logout = async (_req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

const me = async (req, res) => {
  res.json({
    success: true,
    data: { user: { id: req.user.id, email: req.user.email, name: req.user.name } },
  });
};

module.exports = { signup, login, logout, me };
