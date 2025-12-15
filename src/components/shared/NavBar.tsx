'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    handleClose()
    await signOut({ callbackUrl: '/' })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          href="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            cursor: 'pointer'
          }}
        >
          Blog
        </Typography>

        <Button 
          color="inherit" 
          component={Link} 
          href="/posts"
        >
          Посты
        </Button>

        {session ? (
          <>
            <Button 
              color="inherit" 
              component={Link} 
              href="/posts/create"
            >
              Создать пост
            </Button>
            
            <Box sx={{ ml: 2 }}>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar 
                  alt={session.user?.name || 'User'} 
                  src={session.user?.image || undefined}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {session.user?.email}
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  Выйти
                </MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <Button 
            color="inherit" 
            component={Link} 
            href="/auth/signin"
          >
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
