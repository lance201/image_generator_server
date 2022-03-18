// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database images_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb+srv://lancew201:1q2w3e4r@cluster0.4mvhd.mongodb.net/images2_db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
 const imageSchema = mongoose.Schema({
    url: { type: String, required: true },
    theme: { type: String, required: true },
    color: { type: String, required: true },
    mood: { type: String, required: true },
    fav: { type: Boolean, required: true }
}, {
    versionKey: false
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Image = mongoose.model("Image", imageSchema);


/**
 * Retrive images based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */

const findImages = async (filter, projection, limit) => {
    const query = Image.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Replace the color, theme, mood, fav properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} color 
 * @param {String} theme
 * @param {String} mood
 * @param {Boolean} fav
 * @returns A promise. Resolves to the number of documents modified
 */
 const updateImage = async (_id, fav) => {
    const result = await Image.updateOne({ _id: _id }, { fav: fav });
    return result.modifiedCount;
}


export { findImages, updateImage };