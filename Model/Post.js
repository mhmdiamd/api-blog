import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true,
    },
    author: {
      type: String,
      required: [true, 'Author is Required!'],
    },
    categories: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
