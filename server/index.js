const path = require('path');
express = require ('express');
const app = express();

const publicPath = path.join(__dirname, '..', 'client');

const router = require('./router');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static(publicPath)); // Serving static files

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`); // eslint-disable-line no-console
});