import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { uploadFile } from "../api/fileUploadApi";
import { CloudUpload } from "@mui/icons-material";

const FileUploadButton: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    console.log("Uploading file: ", file.name);

    try {
      setUploading(true);
      await uploadFile(file);
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        accept=".csv"
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUpload />}
        >
          Upload CSV
        </Button>
      </label>
      {uploading && <CircularProgress size={24} />}
      {uploadSuccess === true && (
        <Typography color="success">Upload Successful</Typography>
      )}
      {uploadSuccess === false && (
        <Typography color="error">Upload Failed</Typography>
      )}
    </>
  );
};

export default FileUploadButton;
