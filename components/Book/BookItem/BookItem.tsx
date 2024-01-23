import {FC} from 'react';
import { Card, Grid, CardContent, Typography, Box, Button, TextField } from '@mui/material';
import { Book } from '@/types/books';

type BookItemProps = {
  book: Book;
  onRemoveClick: (book: Book) => void;
  onEditClick: (book: Book) => void;
}

const BookItem: FC<BookItemProps> = ({ book, onRemoveClick, onEditClick}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ padding: '0 5px 5px', display: 'flex', flexDirection: 'row' }}>
      <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent style={{ flex: '1 0 auto' }}>
          <Box>
            <Typography variant="h6">{book.name}</Typography>
            <Typography variant="body1">{book.description}</Typography>
            <Typography variant="body2">Price: ${book.price}</Typography>
            <Typography variant="caption">Category: {book.category.map(cat => cat.name).join(', ')}</Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" color="primary" onClick={() => onEditClick(book)}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => onRemoveClick(book)}>
              Remove
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookItem;