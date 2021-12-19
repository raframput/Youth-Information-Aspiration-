const adminAspiration = require('../models/AdminAspirationModel');

// PROSES CREATE
exports.create = async (req, res) => {
    // ambil data dari nama field 
    const { aspiration_title, aspiration_image, aspiration_description } = req.body;
  
    try {
      // kirim respon error jika field tidak ditemukan
      if (aspiration_title === undefined || aspiration_image === undefined || aspiration_description === undefined) {
        return res.status(422).json({ message: 'Unsuccessfully Create Data.' });
      }
  
      // buat dokumen baru
      const admin = await adminAspiration.create({ aspiration_title, aspiration_image, aspiration_description });
  
      // kirim respon dengan payload nya dokumen yang baru dibuat
      return res.status(201).json(admin);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }


//   PROSES READ ALL
exports.getAllAdminAspiration = async (req, res) => {
    try {
      // ambil semua data
      const admin1 = await adminAspiration.find();
  
      return res.json(admin1);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  // PROSES READ BY ID
  exports.getOne = async (req, res) => {
    // kita ambil parameter id dari url
    const { id } = req.params;
  
    try {
      // jika parameter id tidak ada, kirim respon error
      if (id === undefined) {
        return res.status(422).json({ message: 'ID Not Found.' });
      }
    
      // ambil data berdasar id
      const admin = await adminAspiration.findOne({ _id: id });
  
      // jika data tidak ditemukan kirim respon status 404
      if ( ! admin) {
        return res.status(404).json({ message: 'Data Not Found.' });
      }
    
      return res.json(admin);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }


  // PROSES UPDATE
exports.update = async (req, res) => {
    try {
      // ambil parameter id
      const { id } = req.params;
  
      // ambil data dari nama field text dan checked
      const { aspiration_title, aspiration_image, aspiration_description } = req.body;
  
      // kirim respon error jika field tidak ditemukan
      if (aspiration_title === undefined || aspiration_image === undefined || aspiration_description === undefined) {
        return res.status(422).json({ message: 'Data Not Found.' });
      }
  
      // UPDATE DATA
      const admin = await adminAspiration.updateOne(
        {
          _id: id
        },
        {
            aspiration_title, 
            aspiration_image, 
            aspiration_description
        });
  
      // jika tidak ada perubahan pada suatu dokumen, berarti dokumen tidak ditemukan
      // kirim respon status 404
      if (admin.nModified === 0) {
        return res.status(404).json({ message: 'Data Not Found.' });
      }
  
      return res.json({ message: 'Data Successfully Updated.' });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }


  // PROSES DELETED
exports.delete = async (req, res) => {
    // ambil parameter id
    const { id } = req.params;
  
    try {
      // hapus data
      const admin = await adminAspiration.deleteOne({ _id: id });
  
      // jika tidak ada dokumen yang berhasil dihapus, berarti data tidak ditemukan
      // kirim respon status 404
      if (admin.deletedCount === 0) {
        return res.status(404).json({ message: 'Data Unsuccessfully Deleted.' })
      }
  
      return res.json({ message: 'Data Successfully Deleted.' });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }