exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
}

exports.userInfo = (req, res) => {
  res.status(200).send("User Content");
}