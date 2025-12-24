import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, like, eq, and } from "drizzle-orm";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { PostsFilter } from './PostsFilter'
 
export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Posts({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const search = params.search as string | undefined

  const conditions = []
  if (search) {
    conditions.push(like(posts.title, `%${search}%`))
  }

  const allPosts = conditions.length > 0
    ? db.select().from(posts).where(and(...conditions)).orderBy(desc(posts.createdAt)).all()
    : db.select().from(posts).orderBy(desc(posts.createdAt)).all()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Все посты
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {search ? `Найдено постов: ${allPosts.length}` : `Всего постов: ${allPosts.length}`}
        </Typography>
      </Box>

      <PostsFilter />

      {allPosts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Постов пока нет
          </Typography>
          <Button 
            variant="contained" 
            href="/posts/create"
            sx={{ mt: 2 }}
          >
            Создать первый пост
          </Button>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3 
        }}>
          {allPosts.map(post => (
            <Card key={post.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    href={`/posts/${post.url}`}
                  >
                    Читать далее
                  </Button>
                </CardActions>
              </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
