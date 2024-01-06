import type { NextApiRequest, NextApiResponse } from 'next'
import {Category} from '@/types/books'
import categories from './listOfCategories';

export default function handler(req: NextApiRequest, res: NextApiResponse<Category[]>) {
  res.status(200).json(categories);
}
