import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Home from '@/app/page';
import { advocateData } from '@/db/seed/advocates';


describe('Home Page', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock successful fetch by default
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: advocateData }),
    });
  });

  it('renders the page title', () => {
    render(<Home />);
    expect(screen.getByText('Solace Advocates')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<Home />);
    expect(screen.getByText('Loading advocates...')).toBeInTheDocument();
  });

  it('displays advocates after loading', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Now we can make our assertions
    expect(screen.queryByText('Loading advocates...')).not.toBeInTheDocument();
    expect(screen.getByText(advocateData[0].firstName)).toBeInTheDocument();
  });

  it('filters advocates based on search input', async () => {
    await act(async () => {
      render(<Home />);
    });
  
    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading advocates...')).not.toBeInTheDocument();
    });
  
    const searchInput = screen.getByPlaceholderText('Search by name, city, specialty, etc.');
    const searchValue = advocateData[0].firstName;
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: searchValue } });
    });
  
    // Find all table cells (td elements) that contain the search value
    const matchingCells = screen.getAllByRole('cell', { name: searchValue });
    
    expect(matchingCells.length).toBeGreaterThan(0);
  
    // Verify that advocates with non-matching names are not in the table
    const nonMatchingAdvocate = advocateData.find(
      advocate => advocate.firstName.toLowerCase() !== searchValue.toLowerCase()
    );
  
    if (nonMatchingAdvocate) {
      // Check that the non-matching name is not present in any table cell
      const nonMatchingCells = screen.queryAllByRole('cell', { 
        name: nonMatchingAdvocate.firstName 
      });
      expect(nonMatchingCells).toHaveLength(0);
    }
  });

  it('resets search when reset button is clicked', async () => {
    await act(async () => {
      render(<Home />);
    });

    const searchInput = screen.getByPlaceholderText('Search by name, city, specialty, etc.');
    const resetButton = screen.getByText('Reset Search');

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: advocateData[0].firstName } });
    });

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(searchInput).toHaveValue('');
  });

  it('handles API error gracefully', async () => {
    // Mock fetch to return an error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<Home />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('searches across all advocate fields', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.queryByText('Loading advocates...')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name, city, specialty, etc.');

    // Test searching by different fields
    const testCases = [
      { 
        field: 'city', 
        value: 'New York',
        // Count advocates in New York
        expectedCount: advocateData.filter(a => 
          a.city.toLowerCase() === 'new york'.toLowerCase()
        ).length
      },
      { 
        field: 'specialty', 
        value: 'Trauma & PTSD',
        // Count advocates with this specialty
        expectedCount: advocateData.filter(a => 
          a.specialties.some(s => s.toLowerCase() === 'trauma & ptsd'.toLowerCase())
        ).length
      },
      {
        field: 'degree',
        value: 'MD',
        // Count advocates with MD degree
        expectedCount: advocateData.filter(a => 
          a.degree.toLowerCase() === 'md'.toLowerCase()
        ).length
      }
    ];

    for (const { value, expectedCount } of testCases) {
      fireEvent.change(searchInput, { target: { value } });
      // Get all elements with the text
      const elements = screen.getAllByText(value, { exact: false });
      // +1 accounts for the search status
      expect(elements).toHaveLength(expectedCount + 1);
    }

    const resetButton = screen.getByText('Reset Search');

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(searchInput).toHaveValue('');

  });
});