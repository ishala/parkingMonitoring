const bcrypt = require('bcrypt');
const Pengguna = require('../Models/pengguna');
const Sequelize = require('sequelize');

exports.register = async (req, res) => {
    try {
      const { nama, nomor_telp, nomor_polisi, detail_kendaraan, email, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const pengguna = await Pengguna.create({
        nama,
        nomor_telp,
        nomor_polisi,
        detail_kendaraan,
        email,
        username,
        password: hashedPassword,
      });
      res.status(201).send({ message: "User registered successfully", pengguna });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const pengguna = await Pengguna.findOne({
        where: {
          [Sequelize.Op.or]: [{ username }, { email: username }]
        }
      });
  
      if (!pengguna) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const match = await bcrypt.compare(password, pengguna.password);
      if (!match) {
        return res.status(401).send({ message: "Incorrect password" });
      }
  
      res.status(200).send({ message: "Login successful", pengguna });
    } catch (error) {
      res.status(500).send(error.message);
    }
};

