import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileUpload from "../FileUpload";
import axios from "axios";

// Mock the axios module
jest.mock("axios");

describe("FileUpload Component", () => {
  // Test for file input being empty initially
  test("does not upload file if no file is selected", async () => {
    render(<FileUpload />);

    // Simulate clicking the upload button without selecting a file
    const uploadButton = screen.getByText(/upload/i);
    fireEvent.click(uploadButton);

    // Ensure that transcription is not displayed (since no file was uploaded)
    expect(screen.queryByText(/transcription:/i)).toBeNull();
  });

  test("should upload a file and display the transcription", async () => {
    const mockFile = new File(["test content"], "test-file.txt", {
      type: "text/plain",
    });
    const mockTranscription = {
      filename: "test-file.txt",
      transcription: "This is a mock transcription.",
    };

    axios.post.mockResolvedValueOnce({ data: mockTranscription });

    const mockOnFileUpload = jest.fn();
    render(<FileUpload onFileUpload={mockOnFileUpload} />);

    // Simulate file selection
    const fileInput = screen.getByTestId("file-input");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    // Simulate upload button click
    fireEvent.click(screen.getByText(/Upload/i));

    // Wait for the API response and UI update
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Check if the UI updates with the transcription result
    expect(
      await screen.findByText(/File uploaded successfully!/i)
    ).toBeInTheDocument();

    // Check if the Filename is displayed correctly
    expect(screen.getByText(/Filename:/i)).toBeInTheDocument();
    expect(screen.getByText("test-file.txt")).toBeInTheDocument();

    // Check if the Transcription is displayed correctly
    expect(screen.getByText(/Transcription:/i)).toBeInTheDocument();
    expect(
      screen.getByText("This is a mock transcription.")
    ).toBeInTheDocument();

    // Ensure callback function is called with correct data
    expect(mockOnFileUpload).toHaveBeenCalledWith(mockTranscription);
  });
});