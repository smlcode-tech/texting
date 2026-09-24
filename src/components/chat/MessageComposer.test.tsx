import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MessageComposer } from './MessageComposer'

describe('MessageComposer', () => {
  it('boş girişte gönder butonunu pasif tutar', () => {
    render(<MessageComposer onSend={vi.fn()} />)

    expect(screen.getByRole('button', { name: /gönder/i })).toBeDisabled()
  })

  it('trim edilmiş mesajı iletir', () => {
    const onSend = vi.fn().mockResolvedValue(true)
    render(<MessageComposer onSend={onSend} />)

    const input = screen.getByLabelText('Mesaj')
    fireEvent.change(input, { target: { value: '  Merhaba  ' } })
    fireEvent.submit(input.closest('form') as HTMLFormElement)

    expect(onSend).toHaveBeenCalledWith('Merhaba')
  })

  it('boş mesaj göndermez', () => {
    const onSend = vi.fn()
    render(<MessageComposer onSend={onSend} />)

    fireEvent.submit(screen.getByLabelText('Mesaj').closest('form') as HTMLFormElement)

    expect(onSend).not.toHaveBeenCalled()
  })
})
