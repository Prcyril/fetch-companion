export type EventType = 'vet' | 'medication' | 'insurance' | 'wellness' | 'milestone' | 'emergency'

export type TimelineEvent = {
  id: string
  petId: string
  type: EventType
  title: string
  clinic?: string
  date: string
  notes?: string
  attachments?: number
}

export type Pet = {
  id: string
  name: string
  breed: string
  species: 'dog' | 'cat'
  dob: string
  emoji: string
  colour: string
}
