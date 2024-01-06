import {FC} from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Book } from '@/types/books';

type BookItemProps = {
  book: Book;
}

const BookItem: FC<BookItemProps> = ({ book}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{book.name}</Typography>
        <Typography variant="body1">{book.description}</Typography>
        <Typography variant="body2">Price: ${book.price}</Typography>
        <Typography variant="caption">Category: {book.category.map(cat => cat.name).join(', ')}</Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" color="primary">
            Edit
          </Button>
          <Button variant="outlined" color="secondary">
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookItem;