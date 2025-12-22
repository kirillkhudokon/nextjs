'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

export function PostsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams()
      if (value) params.set('search', value)
      router.push(`/posts${params.toString() ? `?${params.toString()}` : ''}`)
    }, 500),
    [router]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    debouncedSearch(value)
  }

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
      <TextField
        placeholder="Поиск по названию поста..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  )
}
