import { Request, Response } from 'express';
import Trek from '../models/trekModel';

// @desc    Fetch all treks
// @route   GET /api/treks
// @access  Public
export const getTreks = async (req: Request, res: Response) => {
  try {
    const treks = await Trek.find({});
    res.json(treks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single trek
// @route   GET /api/treks/:id
// @access  Public
export const getTrekById = async (req: Request, res: Response) => {
  try {
    const trek = await Trek.findById(req.params.id);

    if (trek) {
      res.json(trek);
    } else {
      res.status(404).json({ message: 'Trek not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import { uploadToCloudinary } from '../utils/cloudinary';

// @desc    Create a trek
// @route   POST /api/treks
// @access  Private/Admin
export const createTrek = async (req: Request, res: Response) => {
  try {
    const { title, price, days, rating, diff, category, description, date, inclusions, exclusions, itinerary, imageLink, imagesLinks } = req.body;
    
    let mainImageUrl = imageLink || '';
    let additionalImageUrls: string[] = [];

    if (imagesLinks) {
      if (Array.isArray(imagesLinks)) {
        additionalImageUrls.push(...imagesLinks);
      } else {
        additionalImageUrls.push(imagesLinks);
      }
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (files?.image && files.image.length > 0) {
      const uploadRes = await uploadToCloudinary(files.image[0].buffer, 'parvat/treks');
      mainImageUrl = uploadRes.secure_url;
    }

    if (files?.images && files.images.length > 0) {
      const uploadPromises = files.images.map(file => uploadToCloudinary(file.buffer, 'parvat/treks/gallery'));
      const uploadResults = await Promise.all(uploadPromises);
      additionalImageUrls = uploadResults.map(result => result.secure_url);
    }

    const trek = new Trek({
      title,
      price,
      days,
      rating: rating || 0,
      image: mainImageUrl,
      images: additionalImageUrls,
      diff,
      category,
      description,
      date: new Date(date),
      inclusions: inclusions ? JSON.parse(inclusions) : [],
      exclusions: exclusions ? JSON.parse(exclusions) : [],
      itinerary: itinerary ? JSON.parse(itinerary) : []
    });

    const createdTrek = await trek.save();
    res.status(201).json(createdTrek);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a trek
// @route   PUT /api/treks/:id
// @access  Private/Admin
export const updateTrek = async (req: Request, res: Response) => {
  try {
    const { title, price, days, rating, diff, category, description, date, inclusions, exclusions, itinerary, imageLink, imagesLinks } = req.body;
    const trek = await Trek.findById(req.params.id);

    if (!trek) {
      return res.status(404).json({ message: 'Trek not found' });
    }

    let mainImageUrl = imageLink || trek.image;
    let additionalImageUrls = trek.images;

    if (imagesLinks) {
      if (Array.isArray(imagesLinks)) {
        additionalImageUrls = [...additionalImageUrls, ...imagesLinks];
      } else {
        additionalImageUrls.push(imagesLinks);
      }
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    if (files?.image && files.image.length > 0) {
      const uploadRes = await uploadToCloudinary(files.image[0].buffer, 'parvat/treks');
      mainImageUrl = uploadRes.secure_url;
    }

    if (files?.images && files.images.length > 0) {
      const uploadPromises = files.images.map(file => uploadToCloudinary(file.buffer, 'parvat/treks/gallery'));
      const uploadResults = await Promise.all(uploadPromises);
      additionalImageUrls = [...additionalImageUrls, ...uploadResults.map(result => result.secure_url)];
    }

    trek.title = title || trek.title;
    trek.price = price || trek.price;
    trek.days = days || trek.days;
    trek.rating = rating !== undefined ? rating : trek.rating;
    trek.image = mainImageUrl;
    trek.images = additionalImageUrls;
    trek.diff = diff || trek.diff;
    trek.category = category || trek.category;
    trek.description = description || trek.description;
    if (date) trek.date = new Date(date);
    if (inclusions) trek.inclusions = JSON.parse(inclusions);
    if (exclusions) trek.exclusions = JSON.parse(exclusions);
    trek.itinerary = itinerary ? JSON.parse(itinerary) : trek.itinerary;

    const updatedTrek = await trek.save();
    res.json(updatedTrek);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a trek
// @route   DELETE /api/treks/:id
// @access  Private/Admin
export const deleteTrek = async (req: Request, res: Response) => {
  try {
    const trek = await Trek.findById(req.params.id);

    if (!trek) {
      return res.status(404).json({ message: 'Trek not found' });
    }

    await Trek.deleteOne({ _id: trek._id });
    res.json({ message: 'Trek removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
