const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const jwt = require('jsonwebtoken');
const secretAccessKey = process.env.secretAccessKey || 'SecretAccessKey';

// To mock any NPM module make sure that you are not destructuring them while requiring them in your file.
// For example - If we use 
// const {verify} = require('jwt'); in place of const jwt = require();
// Jest would not be able to mock destructured modules. So, always keep in mind while writing your code to not to use destructured imports

app.get('/verify-access-token', (req, res) => {
    const accessToken = req.headers['access-token'];
    try {
        jwt.verify(accessToken, secretAccessKey);
        return res.status(200).send({ message: 'Access token is verified' });
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

module.exports = app;
