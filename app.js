const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const jwt = require('jsonwebtoken');
const secretAccessKey = process.env.secretAccessKey || 'SecretAccessKey';

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