
import UserSettings from '../models/UserSettings.js';
import User from '../models/User.js';

// Get user settings
export const getUserSettings = async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user._id });
    
    if (!settings) {
      // Create default settings if none exist
      const user = await User.findById(req.user._id);
      settings = await UserSettings.create({
        userId: req.user._id,
        storeName: 'YourRobotics Store',
        storeEmail: user.email,
        currency: '৳'
      });
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user settings
export const updateUserSettings = async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user._id });
    
    if (!settings) {
      // Create settings if they don't exist
      settings = await UserSettings.create({
        userId: req.user._id,
        ...req.body
      });
    } else {
      // Update existing settings
      Object.keys(req.body).forEach(key => {
        settings[key] = req.body[key];
      });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user theme preference
export const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    
    if (!theme || !['light', 'dark', 'system'].includes(theme)) {
      return res.status(400).json({ message: 'Invalid theme value' });
    }
    
    let settings = await UserSettings.findOne({ userId: req.user._id });
    
    if (!settings) {
      settings = await UserSettings.create({
        userId: req.user._id,
        theme
      });
    } else {
      settings.theme = theme;
      await settings.save();
    }
    
    res.json({ theme: settings.theme });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
