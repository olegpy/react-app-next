import { render, screen, fireEvent } from '@testing-library/react';
import {ReactNode} from "react";
import Pagination from '../Pagination';

// Mock the function passed as a prop to simulate the callback behavior
const mockOnPagination = jest.fn();

// Helper function to render the Pagination component with desired props

const ITEMS_LENGTH: number = 15;

const renderPagination = (itemsLength: number, children: ReactNode) => {
  render(
    <Pagination itemsLength={itemsLength} onPagination={mockOnPagination}>
      {children}
    </Pagination>
  );
};

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  InputLabel: jest.fn(({ children, ...props }) => <label {...props}>{children}</label>),
  Select: jest.fn(({ labelId, ...props }) => <select aria-labelledby={labelId} {...props}></select>),
  MenuItem: jest.fn(({ children, ...props }) => <option {...props}>{children}</option>),
}));


describe('<Pagination />', () => {
  it('renders buttons and page size select', () => {
    renderPagination(ITEMS_LENGTH, <div>Children Content</div>);

    expect(screen.getByTestId('page-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-2')).toBeInTheDocument();
    // The 3-page button should not be present
    expect(screen.queryByText('page-3')).not.toBeInTheDocument();

    // Check if the page size select is rendered
    expect(screen.getByLabelText('Page Size')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onPagination callback on button click', () => {
    renderPagination(ITEMS_LENGTH, <div>Children Content</div>);

    // Simulate button click
    fireEvent.click(screen.getByTestId('page-2'));

    // Check if the onPagination callback is called with the correct arguments
    expect(mockOnPagination).toHaveBeenCalledWith({ startIndex: 10, endIndex: 20 });
  });

  it('should check disabled state of Pagination action buttons', () => {
    renderPagination(ITEMS_LENGTH, <div>Children Content</div>);

    expect(screen.getByTestId('KeyboardDoubleArrowLeftIcon').parentElement).toBeDisabled(); // go to first page
    expect(screen.getByTestId('KeyboardArrowLeftIcon').parentElement).toBeDisabled(); // go to prev page
    expect(screen.getByTestId('KeyboardArrowRightIcon').parentElement).not.toBeDisabled(); // go to next page
    expect(screen.getByTestId('KeyboardDoubleArrowRightIcon').parentElement).not.toBeDisabled(); // go to last page

    // Simulate button click by last page
    fireEvent.click(screen.getByTestId('page-2'));

    expect(screen.getByTestId('KeyboardDoubleArrowLeftIcon').parentElement).not.toBeDisabled(); // go to first page
    expect(screen.getByTestId('KeyboardArrowLeftIcon').parentElement).not.toBeDisabled(); // go to prev page
    expect(screen.getByTestId('KeyboardArrowRightIcon').parentElement).toBeDisabled(); // go to next page
    expect(screen.getByTestId('KeyboardDoubleArrowRightIcon').parentElement).toBeDisabled(); // go to last page
  });

  it('check change value for select with render ItemsListPagination', () => {
    renderPagination(ITEMS_LENGTH, <div>Children Content</div>);

    // Expect to see only 2 pages
    expect(screen.getByTestId('page-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-2')).toBeInTheDocument();

    const formControlSelect = screen.getByTestId('FormControlItemsListSelect');
    const selectElement = formControlSelect.querySelector('#book-size-select') as Element;

    // check that we have default value 10
    expect(selectElement).toHaveValue('10');
    expect(selectElement).not.toHaveValue('15');

    // Simulate a change in the Select value to 15 and expect the page size to change
    fireEvent.change(selectElement, { target: { value: 15 } });
    expect(selectElement).toHaveValue('15');
    expect(selectElement).not.toHaveValue('10');

    // Expect to see only 1 page
    expect(screen.getByTestId('page-1')).toBeInTheDocument();
    // The 2-page button should not be present
    expect(screen.queryByTestId('page-2')).not.toBeInTheDocument();
  });
});