import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Trek from './models/trekModel';
import User from './models/userModel';
import { connectDB } from './config/db';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Trek.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@parvatexploration.com',
      password: 'password123',
      role: 'admin',
    });

    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setMonth(now.getMonth() - 1);
    const futureDate1 = new Date(now);
    futureDate1.setMonth(now.getMonth() + 1);
    const futureDate2 = new Date(now);
    futureDate2.setMonth(now.getMonth() + 2);

    const baseInclusions = ['Accommodation in tents/homestays', 'All meals during the trek', 'Trekking permits', 'Expert Trek Leader'];
    const baseExclusions = ['Transport to base camp', 'Offloading of backpack', 'Personal expenses'];
    const baseItinerary = [
      { day: 1, title: 'Arrival at Base Camp', details: 'Reach the base camp and acclimatize.' },
      { day: 2, title: 'Trek to Camp 1', details: 'Start early and reach the first camp by afternoon.' }
    ];

    const sampleTreks = [
      { title: 'Kedarkantha Trek', price: '₹8,500', days: '6 Days', rating: 4.9, image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Moderate', category: 'Winter Trek', date: futureDate1, inclusions: baseInclusions, exclusions: baseExclusions, itinerary: baseItinerary },
      { title: 'Hampta Pass Trek', price: '₹9,500', days: '5 Days', rating: 4.8, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Moderate', category: 'Summer Trek', date: pastDate, inclusions: baseInclusions, exclusions: baseExclusions, itinerary: baseItinerary },
      { title: 'Kashmir Great Lakes', price: '₹14,500', days: '7 Days', rating: 5.0, image: 'https://prismic-io.s3.amazonaws.com/indiahike/8984f508-0053-4b04-ad01-14372310d402_DSCF4168.jpg', diff: 'Difficult', category: 'Monsoon Trek', date: futureDate2, inclusions: baseInclusions, exclusions: baseExclusions, itinerary: baseItinerary },
      { title: 'Goechala Trek', price: '₹16,500', days: '11 Days', rating: 4.9, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Difficult', category: 'Spring Trek', date: futureDate1, inclusions: baseInclusions, exclusions: baseExclusions, itinerary: baseItinerary },
      { title: 'Buran Ghati Pass', price: '₹12,000', days: '7 Days', rating: 4.7, image: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', diff: 'Moderate-Difficult', category: 'Summer Trek', date: pastDate, inclusions: baseInclusions, exclusions: baseExclusions, itinerary: baseItinerary },
      { title: 'Rupin Pass Trek', price: '₹13,500', days: '8 Days', rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROl07is-LLW42lRjKt5914EHe0wHiE5a8ayg&s', diff: 'Difficult', category: 'Summer Trek', date: futureDate2, inclusions: baseInclusions, exclusions: baseExclusions, itinerary: baseItinerary },
    ];

    await Trek.insertMany(sampleTreks);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

seedData();
