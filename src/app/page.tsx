import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Добро пожаловать в Blog
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            href="/posts"
            sx={{ mr: 2 }}
          >
            Посмотреть посты
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            href="/posts/create"
          >
            Создать пост
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
