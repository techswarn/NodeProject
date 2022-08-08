const Client = require('ssh2-sftp-client');
const dotenv = require('dotenv')

dotenv.config({path: './../config.env'})
const config = {
  host: '159.65.149.157',
  port: 21,
  username: 'root',
  password: process.env.DROPLET_PASSWORD
};
console.log(process.env.DROPLET_PASSWORD)

let sftp = new Client;

sftp.connect(config)
  .then(() => {
    return sftp.list('/path/to/remote/dir');
  })
  .then(data => {
    console.log(data);
  })
  .then(() => {
    sftp.end();
  })
  .catch(err => {
    console.error(err.message);
  });