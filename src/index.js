import router from './controllers/APIController';
import https from 'https';
const port = 3000;

console.log(`Now listening on port ${port}...`);
router.listen(port);
