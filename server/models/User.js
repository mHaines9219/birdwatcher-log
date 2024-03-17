import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  // Check if the password has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);
