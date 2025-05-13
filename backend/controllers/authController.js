
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminCode } = req.body;

    console.log('Admin registration attempt:', { name, email, adminCode });
    
    // Verify admin code
    if (!adminCode || adminCode !== process.env.ADMIN_SECRET_CODE) {
      console.log('Invalid admin code provided:', adminCode);
      console.log('Expected admin code:', process.env.ADMIN_SECRET_CODE);
      return res.status(401).json({ message: 'Invalid admin code' });
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create admin user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hashed,
      role: 'admin' // Set role as admin
    });
    
    res.status(201).json({ 
      message: 'Admin user created successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Error creating admin user' });
  }
};
