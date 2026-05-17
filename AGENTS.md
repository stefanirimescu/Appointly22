# Appointly — Claude Code Project Instructions

You are an expert React Native and Expo engineer helping me build **Appointly**.

Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction.

Think like a senior mobile developer. Build carefully, feature by feature.

---

## Project Overview

We are building **Appointly**, a mobile app for independent appointment-based professionals to manage bookings, clients, services, availability, and financial reports in one simple place.

Appointly is designed for solo professionals such as:

- barbers
- hairstylists
- makeup artists
- nail technicians
- tattoo artists
- massage therapists
- physiotherapists
- psychologists
- coaches
- consultants
- other independent professionals who work by appointment

The app should help users replace scheduling chaos with a simple, reliable business control center.

The user should quickly understand:

- what appointments they have today
- who their clients are
- what services they offer
- how much money they made
- how their business is performing over time

Keep the implementation simple, readable, and focused on the MVP.

---

## One-line Product Description

A mobile app for independent appointment-based professionals to manage bookings, clients, services, availability, and financial reports in one simple place.

---

## Product Positioning

Appointly is not just a booking app.

It is a calm, premium, mobile business tool for solo professionals who want to organize their schedule, understand their revenue, and manage their work with confidence.

The product should feel:

- calm
- premium
- professional
- trustworthy
- simple
- organized
- modern
- productive

The app should not feel:

- playful
- childish
- crowded
- overly colorful
- overly corporate
- generic
- template-like

---

## Design Direction

Appointly should feel:

**70% Premium & Calm + 30% Modern & Productive**

The interface should be clean, elegant, spacious, and easy to understand at a glance.

The app should feel like a premium mobile SaaS product built for independent professionals.

The visual style should combine:

- the calmness of a premium productivity app
- the clarity of a financial dashboard
- the simplicity of a scheduling tool
- the trust of a business management product

The user should feel in control when opening the app.

---

## Visual Style Principles

Use a clean, premium, minimal mobile SaaS aesthetic.

Prioritize:

- generous spacing
- strong visual hierarchy
- clear black text
- white cards
- subtle borders
- soft shadows
- rounded corners
- clean icons
- simple charts
- elegant appointment cards
- restrained use of color

Avoid:

- noisy gradients
- excessive colors
- childish illustrations
- cluttered dashboards
- unnecessary animations
- complex visual effects
- generic mobile app templates

The app should look professional enough for therapists, consultants, and coaches, but also approachable enough for beauty professionals, barbers, and tattoo artists.

---

## Color Palette

Use this palette as the main visual direction.

### Core Colors

```txt
Primary Background: #F7F8F5
Card Background: #FFFFFF

Primary Text: #111111
Secondary Text: #6B7280
Muted Text: #9CA3AF

Primary Accent: #1F7A5A
Primary Accent Soft: #DDEFE7
Secondary Accent: #F1E8D9

Border: #E5E7EB
Divider: #EEF0EC
```

### Status Colors

```txt
Success: #1F9D66
Warning: #D98C24
Error: #D94A4A
```

### Color Usage Rules

Use black text for all primary content.

Use muted gray for secondary information.

Use the green accent only for:

- primary actions
- selected states
- positive financial values
- important highlights
- active tabs
- success states

Use soft green backgrounds for selected cards, small highlights, and calm visual emphasis.

Do not overuse the accent color.

The app should feel mostly neutral, clean, and premium.

---

## Typography Rules

The typography should feel clean, modern, and readable.

Use strong hierarchy:

- large titles for screen headers
- medium bold text for card values
- smaller muted text for metadata
- clear labels for forms and fields

Use black text for important information.

Avoid weak contrast.

Avoid using too many font sizes on one screen.

Recommended hierarchy:

```txt
Screen Title: large, bold
Section Title: medium, semi-bold
Card Value: large, bold
Card Label: small, muted
Body Text: regular, readable
Metadata: small, muted
```

---

## UI Component Style

### Cards

Cards should feel clean and premium.

Use:

- white background
- subtle border
- 20–24px border radius
- generous padding
- soft shadow only when needed
- clear title, value, and supporting text
- enough spacing between elements

Cards should never feel cramped.

### Buttons

Buttons should be simple and clear.

Primary buttons:

- green background
- black or white text depending on contrast
- rounded corners
- generous height
- clear label

Secondary buttons:

- white or soft background
- subtle border
- black text

Avoid too many button styles.

### Icons

Use simple linear icons.

Icons should support the interface, not dominate it.

Use icons for:

- appointments
- clients
- services
- reports
- settings
- calendar
- revenue
- time
- status

Keep icon style consistent across the app.

### Charts

Financial charts should be simple, clean, and readable.

Use:

- simple line charts
- simple bar charts
- minimal labels
- subtle grid lines
- clear financial values
- green accent for positive values

Avoid complex analytics visuals in the MVP.

---

## Main Navigation

Use bottom tab navigation.

Recommended tabs:

```txt
Home
Calendar
Clients
Reports
Settings
```

Each tab should have a clear icon and label.

The active tab should use the primary green accent.

The inactive tabs should use muted gray.

---

## MVP Feature List

The MVP includes:

- Authentication with Clerk
- Welcome screen
- Sign in
- Sign up
- Basic onboarding
- Profession selection
- Business profile setup
- Services management
- Availability setup
- Calendar view
- Appointment list
- Manual appointment creation
- Appointment editing
- Appointment status management
- Client management
- Client details
- Basic financial reports
- Daily revenue
- Monthly revenue
- Yearly revenue
- All-time revenue
- Settings screen
- Local persistence where appropriate

Do not add online booking links in the MVP.

Do not add integrated payments in the MVP.

Do not add team accounts in the MVP.

Do not add advanced CRM features in the MVP.

Build the smallest useful version first.

---

## Core Screens

### Auth Screens

```txt
Welcome
Sign In
Sign Up
```

The auth flow should feel premium, simple, and trustworthy.

Avoid clutter.

The welcome screen should clearly communicate what Appointly does.

Example positioning:

```txt
Your schedule, clients, and income in one calm place.
```

### Onboarding Screens

```txt
Choose Profession
Set Business Name
Add First Service
Set Availability
```

The onboarding should be short and easy.

The user should be able to reach the main app quickly.

Do not overcomplicate onboarding.

### Main App Screens

```txt
Home
Calendar
New Appointment
Appointment Details
Clients
Client Details
Services
Reports
Settings
```

---

## Home Screen Direction

The Home screen is the user’s business control center.

It should answer four questions quickly:

```txt
What do I have today?
What appointment is next?
How much money did I make?
What can I do quickly?
```

Recommended Home structure:

```txt
Header:
Good morning, Ana
Here’s your day

Main Summary Card:
Today’s Revenue
€320
5 appointments completed

Next Appointment Card:
10:30
Haircut
Maria Popescu

Quick Actions:
New booking
Add client
View reports

Today’s Schedule:
List of appointments
```

Keep the Home screen simple.

Do not overload it with too many metrics.

Prioritize clarity.

---

## Calendar Screen Direction

The Calendar screen should help users manage appointments easily.

It should include:

- current day/week/month context
- appointment list
- clear time slots
- appointment cards
- quick create appointment action

The calendar should feel clean and practical.

For the MVP, prioritize a simple day-based or list-based calendar before building a complex full calendar system.

---

## Appointment Rules

An appointment should include:

```txt
id
clientId
serviceId
date
startTime
endTime
price
status
notes
createdAt
updatedAt
```

Appointment statuses:

```txt
scheduled
completed
cancelled
no-show
```

Keep statuses simple in the MVP.

---

## Clients Screen Direction

The Clients screen should help users manage their customer list.

Each client should include:

```txt
id
name
phone
email
notes
createdAt
updatedAt
```

The client list should be clean and searchable when needed.

Client details should show:

- contact information
- notes
- appointment history
- total revenue from that client, if easy to calculate

Do not build complex CRM functionality in the MVP.

---

## Services Screen Direction

Services represent what the professional offers.

Each service should include:

```txt
id
name
duration
price
description
createdAt
updatedAt
```

Examples:

```txt
Haircut — 45 min — €35
Makeup Session — 90 min — €120
Physiotherapy Session — 60 min — €70
Consultation — 50 min — €80
```

Services should be easy to add, edit, and delete.

---

## Reports Screen Direction

The Reports screen should be simple and useful.

Focus on essential financial visibility.

The MVP should show:

- today’s revenue
- monthly revenue
- yearly revenue
- all-time revenue
- number of completed appointments
- average appointment value
- revenue by service, if easy to calculate

Use simple cards and clean charts.

Avoid advanced analytics in the MVP.

The reports screen should feel modern and productive, but not overwhelming.

---

## Availability Direction

Availability should allow the user to set working days and hours.

For MVP, keep it simple:

```txt
Monday: 09:00 - 17:00
Tuesday: 09:00 - 17:00
Wednesday: 09:00 - 17:00
Thursday: 09:00 - 17:00
Friday: 09:00 - 17:00
Saturday: optional
Sunday: optional
```

Do not build advanced scheduling rules at first.

Avoid overengineering availability.

---

## Tech Stack

Use:

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- AsyncStorage
- Clerk for authentication

Do not introduce new major libraries unless there is a strong reason.

If a new library would significantly help, recommend it, explain why, and ask before adding it.

Do not install new libraries without approval.

---

## Development Philosophy

Build feature by feature.

For every feature:

1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.
7. Keep changes focused.
8. Do not rewrite unrelated code.
9. Follow existing patterns.
10. Make sure the feature works end to end.
11. Fix lint and type errors before finishing.

---

## Decision Making

If something is unclear or could be improved, suggest a better approach.

If a new library would significantly help, recommend it, explain why, and ask before adding it.

Do not install new libraries without approval.

Do not make large architectural changes without explaining the reason first.

Prefer simple solutions that are easy to understand and maintain.

---

## Architecture

Use this folder structure:

```txt
app/
  (auth)/
  (onboarding)/
  (tabs)/
    index.tsx
    calendar.tsx
    clients.tsx
    reports.tsx
    settings.tsx
  appointments/
  clients/
  services/

components/
  appointments/
  clients/
  services/
  reports/
  ui/

constants/
  colors.ts
  images.ts

data/

hooks/

lib/
  clerk.ts
  api.ts
  cn.ts

store/
  appointmentStore.ts
  clientStore.ts
  serviceStore.ts
  userStore.ts

types/
  appointment.ts
  client.ts
  service.ts
  user.ts

assets/
  images/
  icons/
```

---

## Folder Rules

### app/

The `app/` folder is for routes and screens only.

Screens should:

- compose components
- call hooks
- use stores
- handle screen-level layout

Screens should not contain:

- large reusable UI blocks
- complex business logic
- repeated component structures
- hardcoded data that belongs in `data/`

### components/

The `components/` folder is for reusable UI.

Create a component when:

- it is reused in multiple places
- it makes a screen easier to read
- it represents a clear UI concept
- it has its own visual responsibility

Examples for Appointly:

```txt
AppointmentCard
ClientCard
ServiceCard
RevenueCard
StatCard
SectionHeader
EmptyState
PrimaryButton
ScreenContainer
```

Do not create components too early.

Avoid unnecessary abstraction.

### constants/

Use `constants/` for shared values.

Examples:

```txt
colors.ts
images.ts
spacing.ts
```

### data/

Use `data/` for hardcoded content.

Keep hardcoded data typed.

### store/

Use `store/` for Zustand stores.

Examples of state to keep here:

```txt
appointments
clients
services
user profile
availability
```

Persist with AsyncStorage when needed.

### lib/

Use `lib/` for external service helpers.

Examples:

```txt
clerk.ts
api.ts
cn.ts
```

Never expose secret keys here.

### types/

Use `types/` for shared TypeScript types.

Keep types simple and readable.

---

## Styling Rules

Use NativeWind classes.

Do not use StyleSheet unless it is not possible to style with `className`.

Use the NativeWind version installed in this project.

Check `package.json`.

Do not upgrade NativeWind without approval.

Reuse class patterns through utilities in `global.css` when useful.

---

## Style Exception List

Use StyleSheet or inline styles only for:

- SafeAreaView when className is not supported
- KeyboardAvoidingView behavior props
- Modal visible and transparent props
- Animated.View animated style values
- dynamic styles calculated at runtime
- platform-specific styles
- Pressable or TouchableOpacity pressed states
- complex shadows when NativeWind is not enough

Everywhere else, use NativeWind.

---

## UI Rules

For any UI task:

- Match the requested layout exactly.
- Match spacing, padding, font sizes, font hierarchy, colors, border radius, shadows, alignment, and proportions.
- Do not approximate.
- Do not simplify unless explicitly asked.
- Keep the design premium, calm, minimal, and productive.
- Use strong visual hierarchy.
- Keep screens clean and easy to scan.
- Avoid crowded layouts.

When no design reference is provided, follow the Appointly design direction from this file.

---

## Image Rule

Use centralized image imports.

1. Check if `constants/images.ts` exists.
2. If not, create it.
3. Import all app images there.
4. Use them through the centralized object.

Example:

```ts
import mascot from "@/assets/images/mascot.png";

export const images = {
  mascot,
};
```

Usage:

```tsx
<Image source={images.mascot} />
```

Do not import image assets directly inside screens or components.

---

## State Management

Use Zustand for global client state.

Use local state for temporary UI state.

Use AsyncStorage for persistence.

Recommended stores:

```txt
appointmentStore
clientStore
serviceStore
userStore
```

Keep stores small and readable.

Do not place UI-only state in global stores unless it is truly shared.

---

## TypeScript Rules

Use TypeScript strict mode.

Do not use `any`.

Keep types simple and readable.

Prefer explicit domain types.

Examples:

```ts
export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

export type Appointment = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

Avoid overly complex generic types unless necessary.

---

## Data Models

### User Profile

```ts
export type UserProfile = {
  id: string;
  fullName: string;
  businessName: string;
  profession: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
};
```

### Client

```ts
export type Client = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

### Service

```ts
export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
```

### Appointment

```ts
export type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show";

export type Appointment = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
```

### Availability

```ts
export type AvailabilityDay = {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

export type Availability = {
  days: AvailabilityDay[];
};
```

---

## Authentication

Use Clerk.

Do not build custom authentication.

Use Clerk for:

- sign up
- sign in
- sign out
- authenticated routes
- user session management

Keep the auth flow simple.

Never expose secret keys in client code.

---

## Secrets

Never expose secret keys in client code.

Use server routes for:

- tokens
- AI calls
- external API access
- private API keys

Do not commit `.env` files.

Use environment variables correctly.

---

## Feature Implementation Workflow

When building a feature:

1. Read this file first.
2. Identify the files to change.
3. Explain the implementation approach briefly.
4. Keep changes focused.
5. Do not rewrite unrelated code.
6. Follow existing project patterns.
7. Build the smallest working version.
8. Make sure the feature works end to end.
9. Fix lint errors.
10. Fix TypeScript errors.
11. Explain what changed.
12. Explain how to test it.

---

## MVP Priorities

Build in this order:

1. Project setup
2. Auth flow
3. Basic tab navigation
4. App design system
5. Onboarding
6. Services management
7. Client management
8. Appointment creation
9. Calendar / appointment list
10. Appointment details
11. Reports
12. Settings
13. Polish and UI refinement

Do not build advanced features before the core flow works.

---

## App Design System

Create reusable UI patterns only when needed.

Useful base components:

```txt
ScreenContainer
SectionHeader
PrimaryButton
SecondaryButton
Card
StatCard
RevenueCard
AppointmentCard
ClientCard
ServiceCard
EmptyState
```

Keep the design system small.

Do not create a large UI library too early.

---

## Empty States

Every important screen should have a clean empty state.

Examples:

### No Appointments

```txt
No appointments yet
Create your first booking and start organizing your day.
```

### No Clients

```txt
No clients yet
Add your first client to keep their details and appointment history in one place.
```

### No Services

```txt
No services yet
Create the services you offer so you can book appointments faster.
```

Empty states should feel helpful, not cold.

---

## Copywriting Style

Use clear, simple English.

The tone should be:

- calm
- helpful
- professional
- friendly
- concise

Avoid:

- hype
- complicated wording
- corporate jargon
- playful jokes
- excessive exclamation marks

Good examples:

```txt
Here’s your day
Create appointment
Add client
Today’s revenue
Upcoming appointments
No appointments yet
Set your availability
```

---

## Performance Rules

Keep screens lightweight.

Avoid unnecessary re-renders.

Use memoization only when there is a real reason.

Do not optimize too early.

Prioritize clear code first.

---

## Accessibility Rules

Use readable contrast.

Use clear labels.

Make touch targets large enough.

Do not rely on color alone to communicate status.

Keep text readable on small screens.

---

## Communication

Be concise.

When finishing a task, explain:

- what changed
- which files were updated
- how to test it

Do not write long explanations unless needed.

---

## Final Reminder

Before every feature:

- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Keep the implementation focused.
- Avoid overengineering.
- Replicate UI exactly when designs are provided.
- When no design is provided, follow the Appointly design direction.
- Keep the app premium, calm, modern, and productive.
