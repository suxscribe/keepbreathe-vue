const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  user: 'suxscribe',
  // Password optional, prompted if none given
  password: 'S:KLDJflk;jlkj3sd',
  host: 'vh348.timeweb.ru',
  port: 22,
  localRoot: __dirname + '/dist',
  remoteRoot: '/home/s/suxscribe/woooooh.ru/public_html/',
  include: ['*', '**/*'], // this would upload everything except dot files
  // include: ['*.php', 'dist/*', '.*'],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    'dist/**/*.map',
    'node_modules/**',
    'node_modules/**/.*',
    '.git/**',
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: true,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err));
