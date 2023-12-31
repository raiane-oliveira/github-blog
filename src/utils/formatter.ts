import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = (date: string) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ptBR,
  })
