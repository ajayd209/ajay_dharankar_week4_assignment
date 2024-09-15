import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ApplyForm = ({ jobTitle, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Application Submitted!
        </Typography>
        <Typography variant="body2">Thank you for applying to {jobTitle}.</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
          Close
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Apply for {jobTitle}
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Resume URL"
        variant="outlined"
        fullWidth
        required
        sx={{ mb: 2 }}
        value={formData.resume}
        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
      />
      <Button type="submit" variant="contained" fullWidth>
        Submit Application
      </Button>
    </Box>
  );
};

export default ApplyForm;
