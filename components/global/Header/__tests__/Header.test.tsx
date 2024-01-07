import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('<Header />', () => {
  test('renders app name in the header', () => {
    render(<Header />);

    const appNameElement = screen.getByText('Your App Name');
    expect(appNameElement).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Header />);

    // Take a snapshot of the rendered component
    expect(asFragment()).toMatchSnapshot();
  });
});


