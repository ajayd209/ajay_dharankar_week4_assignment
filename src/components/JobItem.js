import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box } from '@mui/material';
import ApplyForm from './ApplyForm';

const JobItem = ({ job }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5">{job.title}</Typography>
          <Typography color="text.secondary">{job.company}</Typography>
          <Typography color="text.secondary">{job.location}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {job.description}
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpen}>
            Apply
          </Button>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ApplyForm jobTitle={job.title} handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default JobItem;
