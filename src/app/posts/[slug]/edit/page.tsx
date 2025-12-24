import { getServerAuthSession } from '@/lib/auth'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { EditPostForm } from './EditPostForm'

export default async function EditPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const session = await getServerAuthSession()

  const post = db.select().from(posts).where(eq(posts.url, slug)).get()

  if (!post) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="error">
          Пост не найден
          <Button href="/posts" sx={{ ml: 2 }}>
            К списку постов
          </Button>
        </Alert>
      </Container>
    )
  }

  const isOwner = post.UserId === session!.user.id

  if (!isOwner) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="error">
          У вас нет прав для редактирования этого поста.
          <Button href={`/posts/${slug}`} sx={{ ml: 2 }}>
            Вернуться к посту
          </Button>
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Редактировать пост
        </Typography>

        <EditPostForm post={post} slug={slug} />
      </Paper>
    </Container>
  )
}
