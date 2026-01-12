import type { Post } from "@/types/posts";
import PostItem from "./PostItem";
import Gallery from "@/components/shared/Gallery";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const dynamic = 'force-dynamic'

export default async function Post({ params } : PageProps<'/posts/[slug]'>){
  const { slug } = await params;
  
  const post = db.select().from(posts).where(eq(posts.url, slug)).get()
  
  if (!post) {
    notFound()
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        href="/posts"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад к постам
      </Button>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Опубликовано: {new Date(post.createdAt).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>

        {post.imageUrl && (
          <Box
            component="img"
            src={post.imageUrl}
            alt={post.title}
            sx={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'contain',
              borderRadius: 2,
              mb: 3
            }}
          />
        )}

        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
          {post.content}
        </Typography>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <PostItem post={post} />
      </Box>
    </Container>
  );
}
