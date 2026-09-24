import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest `globals` kapalı olduğu için RTL'nin otomatik temizliği devreye girmez.
afterEach(() => {
  cleanup()
})

