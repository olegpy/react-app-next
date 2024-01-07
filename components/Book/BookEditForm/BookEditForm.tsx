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
import CategorySelect from './CategoriesSelect';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Book, Category } from '@/types/books';
import { updateBook } from '@/redux/actions/bookActions';

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
            <TextField {...register('name', { required: 'Name is required' })} label="Name" fullWidth margin="normal" />
            {errors.name && <span>{errors.name.message}</span>}

            <TextField {...register('description', { required: 'Description is required' })} label="Description" fullWidth margin="normal" />
            {errors.description && <span>{errors.description.message}</span>}

            <TextField {...register('price', { required: 'Price is required', valueAsNumber: true })} label="Price" type="number" fullWidth margin="normal" />
            {errors.price && <span>{errors.price.message}</span>}

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
            {errors.category && <span>{errors.category.message}</span>}

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