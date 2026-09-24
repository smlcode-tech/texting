import { FormEvent, KeyboardEvent, useState } from 'react'

type Props = {
  disabled?: boolean
  onSend: (body: string) => Promise<boolean> | boolean
}

export function MessageComposer({ disabled = false, onSend }: Props) {
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = draft.trim()
    if (!body || isSending || disabled) return

    setIsSending(true)
    const sent = await onSend(body)
    setIsSending(false)

    if (sent) setDraft('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form className="composer" onSubmit={submit}>
      <textarea
        className="composer-input"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Bir mesaj yaz..."
        rows={1}
        aria-label="Mesaj"
        disabled={disabled}
      />
      <button
        className="composer-send"
        type="submit"
        disabled={disabled || isSending || draft.trim().length === 0}
      >
        Gönder <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}
