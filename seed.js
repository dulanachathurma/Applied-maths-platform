const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/applied-maths";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  image: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    const hashedPassword = await bcrypt.hash('1234', 10);
    
    await User.findOneAndUpdate(
      { email: 'admin@gmail.com' },
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'ADMIN',
        image: ''
      },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user successfully created/updated!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
