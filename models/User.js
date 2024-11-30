import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            console.log('Hashed password:', this.password);
        } catch (error) {
            console.error('Error hashing password:', error.message);
            next(error);
        }
    }
    next();
});

export default mongoose.model('User', userSchema);
