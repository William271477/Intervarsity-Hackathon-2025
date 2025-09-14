// Firestore data model documentation for SaveQuest
// This file is for developer reference only. No code is executed here.

/*
Collections:

users (uid: string)
  - email: string
  - displayName: string
  - xp: number
  - streak: number
  - createdAt: Timestamp
  - badges: [badgeId]

savingsGoals (goalId: string)
  - uid: string (user)
  - title: string
  - targetAmount: number
  - currentAmount: number
  - createdAt: Timestamp
  - completed: boolean

savings (savingsId: string)
  - uid: string (user)
  - goalId: string
  - amount: number
  - date: Timestamp

badges (badgeId: string)
  - name: string
  - description: string
  - icon: string
  - criteria: string

challenges (challengeId: string)
  - creatorUid: string
  - inviteCode: string
  - goalAmount: number
  - participants: [uid]
  - progress: { [uid]: number }
  - winnerUid: string | null
  - createdAt: Timestamp

lessons (lessonId: string)
  - title: string
  - content: string
  - quiz: [{ question, options, answer }]
  - xpReward: number
*/
