const express = require('express');
const router = express.Router();

// Import the getPropertyList function correctly
const { getPropertyList,addProperty, deleteProperty, editProperty } = require('../controller/PropertyController');

// Define the route for getting the property list
router.get("/getpropertylist", getPropertyList);
router.post("/addproperty", addProperty);
router.post("/deleteproperty", deleteProperty);
router.put("/editproperty",editProperty)

module.exports = router;
