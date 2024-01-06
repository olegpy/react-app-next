import {render, screen, fireEvent} from '@testing-library/react';
import BookItem from '../BookItem';
import {Book} from "@/types/books";

const mockBook: Book = {
  id: '1',
  name: 'Test Book',
  description: 'Book description',
  price: 20,
  category: [{ id: '1', name: 'Fiction' }],
};

describe('<BookItem />', () => {

  test('renders book item correctly', async () => {
    render(<BookItem
      book={mockBook}
      onRemoveClick={() => {}}
    />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Book description')).toBeInTheDocument();
    expect(screen.getByText('Price: $20')).toBeInTheDocument();
    expect(screen.getByText('Category: Fiction')).toBeInTheDocument();
  });

  test('renders book item with two categories list', () => {
    const newMockBook: Book = {
      ...mockBook,
      category: [
        { id: '1', name: 'Fiction 1' },
        { id: '2', name: 'Fiction 2' },
      ],
    };
    render(<BookItem book={newMockBook} onRemoveClick={() => {}}/>);

    expect(screen.getByText('Category: Fiction 1, Fiction 2')).toBeInTheDocument();
  });

  test('calls "Remove" buttons is clicked', () => {
    const mockOnRemoveEventClick = jest.fn();

    render(
      <BookItem
        book={mockBook}
        onRemoveClick={mockOnRemoveEventClick}
      />
    );

    fireEvent.click(screen.getByText('Remove'));
    expect(mockOnRemoveEventClick).toHaveBeenCalledWith(mockBook);
  });
});