const Property = require('../models/Property');

// Get the list of properties
const getPropertyList = async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find();

    // Send response with the property list
    res.status(200).json(properties);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error fetching property list', error: error.message });
  }
};

const addProperty = async (req, res) => {
    try {
      // Extract data from the request body
      const {
        link,
        ownerName = "",
        description = "",
        rent = "",
        maintenance = "",
        furnishing = "",
        deposit = "",
        considering = "",
        location = "",
        distanceBusStop = "",
        brokerNo = "",
        considered = "",
        visited = "",
        distanceOracle = "",
        distanceFlipkart = "",
        comments = "",
        area = "",
        gatedSecurity = "",
      } = req.body;
  
      // Validate that the link is provided
      if (!link) {
        return res.status(400).json({ message: 'Link is required' });
      }
  
      // Check for existing property (optional duplicate check)
      const existingProperty = await Property.findOne({ link });
      if (existingProperty) {
        return res.status(400).json({ message: 'Property with this link already exists' });
      }
  
      // Create a new property document
      const newProperty = new Property({
        link,
        ownerName,
        description,
        rent,
        maintenance,
        furnishing,
        deposit,
        considering,
        location,
        distanceBusStop,
        brokerNo,
        considered,
        visited,
        distanceOracle,
        distanceFlipkart,
        comments,
        area,
        gatedSecurity,
      });
  
      // Save the new property to the database
      await newProperty.save();
  
      // Respond with the newly created property
      res.status(201).json(newProperty);
    } catch (error) {
      // Handle database or validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: error.message });
      }
  
      // Log and handle any unexpected errors
      console.error('Unexpected error:', error);
      res.status(500).json({ message: 'Error adding new property', error: error.message });
    }
  };

  const deleteProperty = (req, res) => {
    const propertyId = req.body.id; // Assuming the ID is sent in the request body
  
    // Ensure the property ID exists
    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }
  
    // Perform the deletion in your database
    // Here we're using a placeholder for the database query
    // Replace it with your actual database model or query
    Property.findByIdAndDelete(propertyId)
      .then((deletedProperty) => {
        if (!deletedProperty) {
          return res.status(404).json({ message: "Property not found" });
        }
  
        // Return a success response
        res.status(200).json({ message: "Property deleted successfully", deletedProperty });
      })
      .catch((error) => {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting property:", error);
        res.status(500).json({ message: "An error occurred while deleting the property" });
      });
  };

  const editProperty = async (req, res) => {
    const { propertyId, updatedProperty } = req.body;
    
    try {
      const property = await Property.findByIdAndUpdate(propertyId, updatedProperty, { new: true });
      if (property) {
        res.status(200).json({ message: 'Property updated successfully', property });
      } else {
        res.status(404).json({ message: 'Property not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  
  
module.exports = {
  getPropertyList,
  addProperty,
  deleteProperty,
  editProperty
};
