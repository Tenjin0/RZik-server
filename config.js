var config = {
    UPLOAD_PATH: process.env.UPLOAD_PATH || '/var/www/uploads',
    EMAIL_PASS : process.env.EMAIL_PASS || 'pass',
    SMTP_URL : 'smtp.gmail.com' ,
    EMAIL_ADDR : 'petitpatrice@gmail.com'
}

module.exports = config;
