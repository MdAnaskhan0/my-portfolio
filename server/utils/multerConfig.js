import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = 'profilePicture';
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        cb(null, folderPath);
    },
    // In your multer configuration
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        // Store just the filename, not the path
        cb(null, 'profilepicture-' + uniqueSuffix + ext);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, and PNG files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
