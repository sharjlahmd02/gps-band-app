const sosService = require("../services/sos.service");

const resolve = async (req, res, next) => {
  try {
    const result = await sosService.resolveSos(req.params.id, req.user.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { resolve };
