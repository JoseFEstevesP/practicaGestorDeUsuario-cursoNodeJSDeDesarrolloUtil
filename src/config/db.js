import mongoose from 'mongoose';
const connectDB = (url) =>
  mongoose.connect(url).then(() => console.log('database connected'));
export default connectDB;
