import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from '../FileUpload';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

describe('FileUpload Component', () => {

  // Test for file input being empty initially
  test('does not upload file if no file is selected', async () => {
    render(<FileUpload />);

    // Simulate clicking the upload button without selecting a file
    const uploadButton = screen.getByText(/upload/i);
    fireEvent.click(uploadButton);

    // Ensure that transcription is not displayed (since no file was uploaded)
    expect(screen.queryByText(/transcription:/i)).toBeNull();
  });
});
