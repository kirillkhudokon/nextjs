import type { Post } from "@/types/posts";
import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
 
export const dynamic = 'force-dynamic'

export default async function Posts(){
  const allPosts = db.select().from(posts).orderBy(desc(posts.createdAt)).all()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Все посты
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Всего постов: {allPosts.length}
        </Typography>
      </Box>

      {allPosts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Постов пока нет
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            href="/posts/create"
            sx={{ mt: 2 }}
          >
            Создать первый пост
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {allPosts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 150)}...
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                    {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    href={`/posts/${post.url}`}
                  >
                    Читать далее
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
