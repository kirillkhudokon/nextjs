export type Post = {
  id: number;
  url: string
  title: string
  content: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  UserId: string | null
}