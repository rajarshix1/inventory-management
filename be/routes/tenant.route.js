const express = require('express');
const tenantRoutes = express.Router();
tenantRoutes.get('/', (req, res) => {
    res.send('List of all tenants');
});

module.exports = tenantRoutes;