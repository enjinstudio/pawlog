export type EntryType = 'vet_visit' | 'vaccination' | 'flea_treatment' | 'worming' | 'medication' | 'weight' | 'grooming' | 'other'

export interface Pet {
  id: string
  user_id: string
  name: string
  breed?: string
  dob?: string
  gender?: 'male' | 'female' | 'unknown'
  weight_kg?: number
  photo_url?: string
  is_public: boolean
  created_at: string
}

export interface HealthEntry {
  id: string
  pet_id: string
  type: EntryType
  title: string
  notes?: string
  date: string
  next_due?: string
  weight_kg?: number
  vet_name?: string
  photo_url?: string
  created_at: string
}

export interface EntryTypeConfig {
  label: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
}

export const ENTRY_TYPE_CONFIG: Record<EntryType, EntryTypeConfig> = {
  vet_visit: {
    label: 'Vet Visit',
    icon: '🩺',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
  },
  vaccination: {
    label: 'Vaccination',
    icon: '💉',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
  },
  flea_treatment: {
    label: 'Flea Treatment',
    icon: '🐛',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
  },
  worming: {
    label: 'Worming',
    icon: '💊',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
  },
  medication: {
    label: 'Medication',
    icon: '💊',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20',
  },
  weight: {
    label: 'Weight',
    icon: '⚖️',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
  },
  grooming: {
    label: 'Grooming',
    icon: '✂️',
    color: 'text-teal-400',
    bgColor: 'bg-teal-400/10',
    borderColor: 'border-teal-400/20',
  },
  other: {
    label: 'Other',
    icon: '📝',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/20',
  },
}
