const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };
  // Utilisation de memoryStorage() pour stocker temporairement en mémoire
const storage = multer.memoryStorage(); 

const upload = multer({ storage }).single('image')

// Middleware pour traiter et compresser l'image avec Sharp
const compressImage = async (req, res, next) => {
  if (!req.file) return next(); // Si aucun fichier, passe à la suite

  try {
      //const extension = MIME_TYPES[req.file.mimetype] || 'jpg'; // Format par défaut
      const fileName = `compressed-${Date.now()}.webp`;
      const outputPath = path.join(__dirname, '../images', fileName);

      // Vérifier si le dossier existe, sinon le créer
      if (!fs.existsSync(path.join(__dirname, '../images'))) {
          fs.mkdirSync(path.join(__dirname, '../images'), { recursive: true });
      }

      // Compression avec Sharp
      await sharp(req.file.buffer)
          .resize(500) // Redimensionne l'image à 800px de large max
          .toFormat('webp') // Convertit en WebP pour une meilleure compression
          .webp({ quality: 80 }) // Compression avec une qualité de 80%
          .toFile(outputPath); // Sauvegarde l'image traitée

      // Mise à jour de req.file pour garder les infos du fichier
      req.file.filename = fileName;
      req.file.path = `/images/${fileName}`;

      next();
  } catch (error) {
      console.error("Erreur de compression :", error);
      res.status(500).json({ message: "Erreur lors du traitement de l'image" });
  }
};

module.exports = { upload, compressImage };
  /*
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  });
  
  module.exports = multer({storage: storage}).single('image');*/