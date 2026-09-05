import type { FormEvent } from 'react'

export type Mode = 'login' | 'register'
export type AuthStep = 'credentials' | 'otp'
export type AuthFormEvent = FormEvent<HTMLFormElement>