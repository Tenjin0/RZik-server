var path = require('path');

var config = {
    UPLOAD_PATH: process.env.UPLOAD_PATH || '/var/www/uploads/rzik/',
    EMAIL_PASS : process.env.EMAIL_PASS || 'pass',
    SMTP_URL : 'smtp.gmail.com' ,
    EMAIL_ADDR : 'petitpatrice@gmail.com',
}
config.UPLOAD_COVERS_PATH = path.join(config.UPLOAD_PATH, 'images', 'cover')
config.UPLOAD_IMAGES_PATH = path.join(config.UPLOAD_PATH, 'images', 'cover')
config.UPLOAD_AUDIOS_PATH = path.join(config.UPLOAD_PATH, 'audios')

module.exports = config;
