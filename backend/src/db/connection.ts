import mongoose from 'mongoose';

(async () => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    console.log('Mongodb connected');
  } catch (error) {
    console.log('error connecting to DB', error);
  }
})();
