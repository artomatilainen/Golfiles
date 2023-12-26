// /server/index.js

const app = require('./src');  // Assumes your main server setup is in /server/src/index.js

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});