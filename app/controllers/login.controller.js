module.exports = {
  userData: (req, res) => {
         res.json({
          message: `Logged in as ${req.identity.name}`,
          email: req.identity.email
        });
      }
}