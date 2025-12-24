'use client'

import type { Post } from "@/types/posts";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function PostItem({ post }: { post: Post }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');

    try {
      const response = await fetch(`/api/posts/${post.url}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to delete post');
        setIsDeleting(false);
        return;
      }

      router.push('/posts');
      router.refresh();
    } catch (err) {
      setError('Network error. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {session && session.user?.id === post.UserId && (
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => router.push(`/posts/${post.url}/edit`)}
          >
            Редактировать
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Удалить
          </Button>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Удалить пост?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить пост "{post.title}"? Это действие необратимо.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={isDeleting}>
            Отмена
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
