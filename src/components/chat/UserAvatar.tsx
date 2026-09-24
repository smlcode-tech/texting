import { initialsFor } from '../../lib/format'

type Props = {
  name: string
  size?: 'small' | 'medium'
}

export function UserAvatar({ name, size = 'medium' }: Props) {
  return (
    <span className={`user-avatar user-avatar-${size}`} aria-hidden="true">
      {initialsFor(name)}
    </span>
  )
}
