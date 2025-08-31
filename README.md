# EdoPoly Online Interaction App

A modern web application for EdoPoly students and staff to interact, communicate, and share resources.

## Features

### User Management
- User Registration with School ID/email verification
- User Login & Logout
- Profile Management (Name, Department, Course, Role)
- Role-based access (Student, Lecturer, Admin)

### Communication
- Real-time One-on-One Chat
- Department/Course Group Chats
- Typing indicators & message status

### Discussion Forum
- Course/Department specific threads
- Reply & comment functionality
- Post reactions

### Announcements
- Admin & Lecturer announcements
- Notification system
- Support for text, links, and documents

### File & Content Sharing
- Upload lecture materials (PDF, Word, PowerPoint)
- Image and media file sharing
- File download functionality

### Notifications
- In-app notifications
- Email notifications for important updates

### Security
- Secure authentication
- Role-based access control
- Content moderation

### Admin Features
- User management
- School-wide announcements
- Forum moderation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Prisma (SQLite)
- NextAuth.js
- Socket.IO
- React Query
- Zustand
- UploadThing

## License

MIT
