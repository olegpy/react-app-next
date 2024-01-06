import {render, screen} from '@testing-library/react';
import Footer from '../Footer';

describe('<Footer />', () => {
  test('renders footer content correctly', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(/© \d{4} Your Company Name/);
    expect(copyrightText).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Footer />);

    // Take a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
  });
});