import type { NextApiRequest, NextApiResponse } from 'next'
import { Book } from '@/types/books'
import books from './listOfBooks'

export default function handler(req: NextApiRequest, res: NextApiResponse<Book[]>) {
  res.status(200).json(books);
}
