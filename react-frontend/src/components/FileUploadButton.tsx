import React, { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { uploadFile } from "../api/fileUploadApi";
import { CloudUpload } from "@mui/icons-material";

const FileUploadButton: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(
    undefined
  );

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
      event.target.value = "";
    }
  };

  const handleClose = () => {
    setUploadSuccess(undefined);
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
      <Snackbar
        autoHideDuration={5000}
        open={uploadSuccess}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          File uploaded successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={5000}
        open={uploadSuccess === false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          File upload failed!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FileUploadButton;
