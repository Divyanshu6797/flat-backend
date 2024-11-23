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
    try {
      // Extract the updated property data from the request body
      const updatedProperty = req.body;
  
      // Find the property by its ID (or another identifier, like `link`, depending on your use case)
      const property = await Property.findById(updatedProperty._id);
  
      if (!property) {
        // If the property does not exist, return a 404 error
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Update the property details
      property.link = updatedProperty.link || property.link;
      property.ownerName = updatedProperty.ownerName || property.ownerName;
      property.description = updatedProperty.description || property.description;
      property.rent = updatedProperty.rent || property.rent;
      property.maintenance = updatedProperty.maintenance || property.maintenance;
      property.furnishing = updatedProperty.furnishing || property.furnishing;
      property.deposit = updatedProperty.deposit || property.deposit;
      property.considering = updatedProperty.considering || property.considering;
      property.location = updatedProperty.location || property.location;
      property.distanceBusStop = updatedProperty.distanceBusStop || property.distanceBusStop;
      property.brokerNo = updatedProperty.brokerNo || property.brokerNo;
      property.considered = updatedProperty.considered || property.considered;
      property.visited = updatedProperty.visited || property.visited;
      property.distanceOracle = updatedProperty.distanceOracle || property.distanceOracle;
      property.distanceFlipkart = updatedProperty.distanceFlipkart || property.distanceFlipkart;
      property.comments = updatedProperty.comments || property.comments;
      property.area = updatedProperty.area || property.area;
      property.gatedSecurity = updatedProperty.gatedSecurity || property.gatedSecurity;
  
      // Save the updated property back to the database
      const updated = await property.save();
  
      // Respond with a success message
      res.status(200).json({
        message: 'Property details updated successfully',
        updatedProperty: updated,
      });
    } catch (error) {
      // Handle errors (e.g., if there is an issue with the database or request)
      console.error('Error updating property:', error);
      res.status(500).json({ message: 'Failed to update property details' });
    }
  };
  
  
  
  
module.exports = {
  getPropertyList,
  addProperty,
  deleteProperty,
  editProperty
};