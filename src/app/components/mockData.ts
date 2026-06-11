import type { Pet, TimelineEvent, Reminder } from './types'

export const pets: Pet[] = [
  { id: 'bruno', name: 'Bruno', breed: 'Golden Retriever', species: 'dog', dob: '2021-03-12', emoji: '🐶', colour: '#FFF5E0' },
  { id: 'mochi', name: 'Mochi', breed: 'Domestic Shorthair', species: 'cat', dob: '2023-07-04', emoji: '🐱', colour: '#F3EEFB' },
]

export const events: TimelineEvent[] = [
  { id: 'e1', petId: 'bruno', type: 'milestone', title: 'Adoption day', date: '2021-03-20', notes: 'Bruno came home today. He was 8 weeks old.' },
  { id: 'e2', petId: 'bruno', type: 'vet', title: 'First vet visit', clinic: 'City Road Animal Hospital', date: '2021-04-02', notes: 'Initial health check. All clear.', attachments: 1 },
  { id: 'e3', petId: 'bruno', type: 'medication', title: 'Flea & tick treatment started', clinic: 'City Road Animal Hospital', date: '2021-06-15', notes: 'Monthly NexGard commenced.' },
  { id: 'e4', petId: 'bruno', type: 'vet', title: 'Annual vaccination', clinic: 'City Road Animal Hospital', date: '2022-04-10', notes: 'C5 vaccination. Weight 24kg.', attachments: 2 },
  { id: 'e5', petId: 'bruno', type: 'insurance', title: 'Fetch insurance started', date: '2022-08-01', notes: 'Enrolled in Fetch. $30k annual cover.' },
  { id: 'e6', petId: 'bruno', type: 'emergency', title: 'Swallowed a sock', clinic: 'Sydney Animal Emergency', date: '2022-11-03', notes: 'Induced vomiting. Sock retrieved. Monitored overnight.', attachments: 3 },
  { id: 'e7', petId: 'bruno', type: 'insurance', title: 'Insurance claim approved', date: '2022-11-10', notes: '$840 reimbursed for emergency visit.' },
  { id: 'e8', petId: 'bruno', type: 'vet', title: 'Annual vaccination', clinic: 'City Road Animal Hospital', date: '2023-04-08', notes: 'C5 vaccination. Weight 30kg. All vitals normal.', attachments: 1 },
  { id: 'e9', petId: 'bruno', type: 'wellness', title: 'Started hydrotherapy', clinic: 'Paws Rehab Centre', date: '2023-09-20', notes: 'Preventative joint care. 8 week program.' },
  { id: 'e10', petId: 'bruno', type: 'vet', title: 'Annual check-up', clinic: 'City Road Animal Hospital', date: '2024-04-15', notes: 'Weight stable at 32kg. Heart and lungs clear.', attachments: 2 },
  { id: 'e11', petId: 'mochi', type: 'milestone', title: 'Adoption day', date: '2023-07-10', notes: 'Mochi came home at 6 weeks old.' },
  { id: 'e12', petId: 'mochi', type: 'vet', title: 'First vet visit', clinic: 'Newtown Cat Clinic', date: '2023-07-20', notes: 'Initial health check and microchipping.', attachments: 1 },
  { id: 'e13', petId: 'mochi', type: 'vet', title: 'Desexing procedure', clinic: 'Newtown Cat Clinic', date: '2023-10-05', notes: 'Routine procedure. Full recovery in 5 days.', attachments: 2 },
]

export const reminders: Reminder[] = [
  {
    id: 'rem1', petId: 'bruno', title: 'Annual vaccination', type: 'vet',
    dueDate: '2026-04-15', recurring: 'annually',
    notes: 'C5 vaccination due at City Road Animal Hospital. Last done April 2024.',
  },
  {
    id: 'rem2', petId: 'bruno', title: 'Flea & tick treatment', type: 'medication',
    dueDate: '2026-07-01', recurring: 'monthly',
    notes: 'NexGard monthly dose. Started June 2021.',
  },
  {
    id: 'rem3', petId: 'bruno', title: 'Annual check-up', type: 'vet',
    dueDate: '2027-04-15', recurring: 'annually',
    notes: 'Full annual health check at City Road Animal Hospital.',
  },
  {
    id: 'rem4', petId: 'bruno', title: 'Joint health review', type: 'wellness',
    dueDate: '2026-09-20', recurring: 'once',
    notes: 'Follow-up with Paws Rehab Centre after the 2023 hydrotherapy program.',
  },
  {
    id: 'rem5', petId: 'bruno', title: 'Fetch policy renewal', type: 'insurance',
    dueDate: '2026-08-01', recurring: 'annually',
    notes: 'Annual policy renewal. Current cover: $30k. Review excess and coverage options.',
  },
  {
    id: 'rem6', petId: 'mochi', title: 'Annual vaccination', type: 'vet',
    dueDate: '2026-07-20', recurring: 'annually',
    notes: 'F3 vaccination due at Newtown Cat Clinic.',
  },
  {
    id: 'rem7', petId: 'mochi', title: 'Annual check-up', type: 'vet',
    dueDate: '2026-10-05', recurring: 'annually',
    notes: 'Full annual check-up at Newtown Cat Clinic. First annual since desexing.',
  },
]
