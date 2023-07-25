import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { issuesApi, userApi } from '../lib/axios'

interface UserGithub {
  name: string
  avatar_url: string
  html_url: string
  bio: string
  login: string
  company: string | null
  followers: number
}

interface Issue {
  id: number
  title: string
  body: string
  created_at: string
  number: number
}

interface BlogType {
  user: UserGithub
  issues: Issue[]
}

interface BlogContextType {
  user: UserGithub
  issues: Issue[]
}

interface BlogProviderProps {
  children: ReactNode
}

export const BlogContext = createContext({} as BlogContextType)

export function BlogProvider({ children }: BlogProviderProps) {
  const [blog, setBlog] = useState<BlogType>({
    user: {
      name: '',
      avatar_url: '',
      html_url: '',
      bio: '',
      login: '',
      company: null,
      followers: 0,
    },
    issues: [],
  })

  const { user, issues } = blog

  async function fetchUserGithub(username: string) {
    const response = await userApi.get(`/${username}`)
    setBlog((prevBlog) => ({ ...prevBlog, user: response.data }))
  }

  async function fetchIssuesRepo() {
    const response = await issuesApi.get(
      `https://api.github.com/repos/rocketseat-education/reactjs-github-blog-challenge/issues`,
    )

    setBlog((prevBlog) => ({ ...prevBlog, issues: response.data }))
  }

  useEffect(() => {
    fetchUserGithub('raiane-oliveira')
    fetchIssuesRepo()
  }, [])

  return (
    <BlogContext.Provider value={{ user, issues }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => useContext(BlogContext)
