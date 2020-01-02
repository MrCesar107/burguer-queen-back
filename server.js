// Uncomment this line if you are using this app on development env.
// Comment it again when you deploy to production.
// require('dotenv').config();

const app = require('./src/app');
require('./src/database');

async function main() {
  await app.listen(app.get('port'));
  console.log(`Server is running on port ${app.get('port')}`);
}

main();
