
import WebsiteContent from '../models/WebsiteContent.js';

// Get all content sections
export const getAllContent = async (req, res) => {
  try {
    const content = await WebsiteContent.find().sort({ section: 1, order: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get content by section
export const getContentBySection = async (req, res) => {
  try {
    const content = await WebsiteContent.find({ 
      section: req.params.section 
    }).sort({ order: 1 });
    
    if (!content.length) {
      return res.status(404).json({ message: 'Content not found for this section' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new content
export const createContent = async (req, res) => {
  try {
    const content = await WebsiteContent.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update content
export const updateContent = async (req, res) => {
  try {
    const content = await WebsiteContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  try {
    const content = await WebsiteContent.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
