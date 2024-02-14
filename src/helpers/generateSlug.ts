import { Model } from 'mongoose';

export async function generateUniqueSlug<T>(
  originalString: string,
  model: Model<T>,
): Promise<string> {
  let slug = createSlug(originalString);

  // Count the number of documents with a slug that starts with the generated slug
  const existingSlugCount = await model.countDocuments({
    slug: new RegExp(`^${slug}(-[0-9]*)?$`, 'i'),
  });

  // If there are any existing slugs, append the count to the slug
  if (existingSlugCount > 0) {
    slug = `${slug}-${existingSlugCount}`;
  }

  return slug;
}

// normalize("NFD") function to decompose accented characters into their base characters and combining diacritical marks, and then removes the diacritical marks with a regular expression. This will convert characters like “é” into “e”.
function createSlug(text: string): string {
  const slug = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
  return slug
    .replace(/[^a-z0-9 -]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace multiple spaces with single hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphens
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}
