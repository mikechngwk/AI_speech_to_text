import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TranscriptionList from "../TranscriptionList";

// Mocking fetch and clipboard
global.fetch = jest.fn();
global.navigator.clipboard = {
  writeText: jest.fn().mockResolvedValue(true),
};

describe("TranscriptionList Component", () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear previous mocks
    navigator.clipboard.writeText.mockClear();
  });

  test("renders Get All Transcriptions and Clear All Transcriptions buttons", () => {
    render(<TranscriptionList />);

    // Check if the buttons are rendered
    expect(screen.getByText(/Get All Transcriptions/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear all transcriptions/i)).toBeInTheDocument();
  });

  test("fetches and displays transcriptions when Get All Transcriptions is clicked", async () => {
    // Mock response data
    const mockTranscriptions = [
      {
        filename: "file1.mp3",
        created_at: "2025-03-25",
        transcription: "Transcription content 1",
      },
      {
        filename: "file2.mp3",
        created_at: "2025-03-26",
        transcription: "Transcription content 2",
      },
    ];

    // Mock the fetch function to return the mock transcriptions
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        transcriptions: mockTranscriptions,
      }),
    });

    render(<TranscriptionList />);

    // Simulate clicking the "Get All Transcriptions" button
    fireEvent.click(screen.getByText(/Get All Transcriptions/i));

    // Wait for transcriptions to be loaded
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if the transcription list is displayed
    expect(
      await screen.findByText(/Transcription Results: 2/i)
    ).toBeInTheDocument();
    expect(screen.getByText("file1.mp3")).toBeInTheDocument();
    expect(screen.getByText("Transcription content 1")).toBeInTheDocument();
    expect(screen.getByText("file2.mp3")).toBeInTheDocument();
    expect(screen.getByText("Transcription content 2")).toBeInTheDocument();
  });

  test("clears all transcriptions when Clear all transcriptions button is clicked", async () => {
    const mockTranscriptions = [
      {
        filename: "file1.mp3",
        created_at: "2025-03-25",
        transcription: "Transcription 1",
      },
    ];

    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ transcriptions: mockTranscriptions }),
    });

    render(<TranscriptionList />);

    // Fetch data first
    fireEvent.click(screen.getByText(/Get All Transcriptions/i));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Clear all transcriptions
    fireEvent.click(screen.getByText(/Clear all transcriptions/i));

    // Check if transcriptions are cleared
    expect(screen.queryByText("file1.mp3")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Transcription content 1")
    ).not.toBeInTheDocument();
  });
});