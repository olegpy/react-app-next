import { useEffect, FC, useState } from 'react';
import {
  Modal,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CategorySelect from './CategoriesSelect';
import { Book, Category } from '@/types/books';
import {addBook, updateBook} from '@/redux/actions/bookActions';

interface BookFormProps {
  onOpen: boolean;
  editForm: boolean;
  onClose: () => void;
}

const BookEditForm: FC<BookFormProps> = ({ onOpen, onClose, editForm }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const [book, setBook] = useState<Book | undefined>(undefined)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset
  } = useForm<Book>();

  const selectedBook = useSelector((state: { books: {book: Book } }) => state.books.book);

  const getFormTitle = () => {
    return book ? `Edit Book - ${book.name}` : 'Add Book';
  }

  useEffect(() => {
    const handleCategoriesList = async () => {
      const res = await fetch('/api/categories');
      const categories: Category[]  = await res.json();

      setCategories(categories)
    };

    handleCategoriesList();

  }, []);

  useEffect(() => {
    if (!editForm || !selectedBook) {
      setBook(undefined); // Reset the book state
      reset(); // Reset form values
      return;
    }

    // Set form values when editing a book
    setBook(selectedBook);
    setValue('name', selectedBook.name);
    setValue('description', selectedBook.description);
    setValue('price', selectedBook.price);
    setValue('category', selectedBook.category);

  }, [editForm, selectedBook, setValue, reset]);

  const onSubmit: SubmitHandler<Book> = (data) => {
    const newBook: Book = {
      id: book ? book.id : String(Date.now()), // Use current timestamp as ID if adding a new book
      ...data,
    };

    if (book) {
      dispatch(updateBook(newBook));
    } else {
      dispatch(addBook(newBook));
    }

    // Close modal after submit
    handleModalClose();
  };

  const handleModalClose = () => {
    // handle modal close
    onClose();

    // reset form after submit
    reset();
  };

  const onError: SubmitErrorHandler<Book> = (errors) => {
    console.error(errors);
  };

  return (
    <Modal
      open={onOpen}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Paper elevation={3} sx={{ padding: 3, width: 600 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">{getFormTitle()}</Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <TextField
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 5, message: 'Name should be at least 5 characters long' },
                maxLength: { value: 40, message: 'Name should be at most 40 characters long' }
              })}
              label="Name"
              fullWidth
              margin="normal"
            />
            {errors.name && <span className='error-message'>{errors.name.message}</span>}

            <TextField
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 55, message: 'Description should be at least 55 characters long' },
                maxLength: { value: 100, message: 'Description should be at most 100 characters long' }
              })}
              label="Description"
              multiline
              rows={3} // Adjust the number of rows as needed
              fullWidth
              margin="normal"
            />
            {errors.description && <span className='error-message'>{errors.description.message}</span>}

            <TextField
              {...register('price', {
                required: 'Price is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Price should be at least 1' },
                max: { value: 10000, message: 'Price should be at most 10,000' }
              })}
              label="Price"
              type="number"
              fullWidth
              margin="normal"
            />
            {errors.price && <span className='error-message'>{errors.price.message}</span>}

            <Controller
              name="category"
              control={control}
              defaultValue={[]}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <CategorySelect
                  labelId="select-label"
                  id="select"
                  value={field.value}
                  items={categories}
                  onChange={(category) => field.onChange(category)}
                />
              )}
            />
            {errors.category && <span className='error-message'>{errors.category.message}</span>}

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ margin: '8px 0'}}>
              Save
            </Button>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default BookEditForm;