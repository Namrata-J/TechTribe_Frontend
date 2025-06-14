'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function LoginModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Goes back to landing page
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {/* Your login form here */}
      </DialogContent>
    </Dialog>
  );
}
