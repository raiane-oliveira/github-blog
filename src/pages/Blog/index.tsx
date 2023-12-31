import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useBlogContext } from '../../contexts/BlogContext'
import { formatDate } from '../../utils/formatter'
import { Profile } from './components/Profile'
import { SearchForm } from './components/SearchForm'
import {
  BlogPageContainer,
  BlogContainer,
  PostCard,
  PostCardBody,
  PostCardTitle,
  PostsContainer,
} from './styles'

export function Blog() {
  const { issues } = useBlogContext()

  return (
    <BlogPageContainer>
      <Profile />

      <BlogContainer>
        <SearchForm />

        <PostsContainer>
          {issues.map((issue) => {
            return (
              <PostCard key={issue.id} to={`/post/${issue.number}`}>
                <PostCardTitle>
                  <span>{issue.title}</span>
                  <time>{formatDate(issue.created_at)}</time>
                </PostCardTitle>

                <PostCardBody>
                  <ReactMarkdown>{issue.body}</ReactMarkdown>
                </PostCardBody>
              </PostCard>
            )
          })}
        </PostsContainer>
      </BlogContainer>
    </BlogPageContainer>
  )
}
