import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TranscriptionSearch from "../TranscriptionSearch"; // Adjust the import path as needed

// Mocking axios to simulate API calls
global.fetch = jest.fn();

describe("TranscriptionSearch Component", () => {
  test("renders search input and button", () => {
    render(<TranscriptionSearch />);

    const searchInput = screen.getByPlaceholderText("Search by filename...");
    const searchButton = screen.getByText("Search");

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("allows the user to type in the search input", () => {
    render(<TranscriptionSearch />);

    const searchInput = screen.getByPlaceholderText("Search by filename...");

    fireEvent.change(searchInput, { target: { value: "sample.mp3" } });
    expect(searchInput.value).toBe("sample.mp3");
  });

  test("clears the search result when the Clear button is clicked", async () => {
    const searchData = {
      results: [
        {
          filename: "sample.mp3",
          created_at: "2023-03-25T12:00:00Z",
          transcription: "This is a sample transcription.",
        },
      ],
    };

    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(searchData),
      status: 200,
    });

    render(<TranscriptionSearch />);

    const searchInput = screen.getByPlaceholderText("Search by filename...");
    const searchButton = screen.getByText("Search");
    const clearButton = screen.getByText("Clear Searched Transcriptions");

    fireEvent.change(searchInput, { target: { value: "sample.mp3" } });
    fireEvent.click(searchButton);

    // Using findByText to wait for the result to be displayed
    const result = await screen.findByText("Search Results: 1");
    expect(result).toBeInTheDocument();

    // Click the clear button
    fireEvent.click(clearButton);

    // Ensure the result is cleared
    const clearedResult = screen.queryByText("Search Results: 1");
    expect(clearedResult).toBeNull();
  });
});