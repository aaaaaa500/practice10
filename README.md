# Smart Campus Room Availability Checker

A small web app that shows which campus rooms are free for a chosen time. The user selects the number of attendees and the required equipment, the app shows the matching rooms, and the availability check uses the bookings of the chosen room. All data is fictional. There is no login, payment, live API or database.

This is my work for Software Engineering, Assignment #04 (Korganbek Alua, 24B032155).

## Versions

- **Initial version:** commit `4227c252a96c4830d063ea6bb7d880b8b6e79fee`
  https://github.com/[GITHUB_NAME]/[REPOSITORY_NAME]/tree/4227c252a96c4830d063ea6bb7d880b8b6e79fee
- **Final version:** the latest commit of this repository.

The setup, run and test commands below are the same for both versions.

## Requirements

Node.js and npm. I used Node.js v24.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the address that the terminal shows.

## Test

```bash
npx vitest run
```

To list every test with its name:

```bash
npx vitest run --reporter=verbose
```

Expected result in the final version: 4 test files, **31 passed (31)**. The initial version has 2 test files, 15 passed (15).

Other checks used during the work: `npm run build`, `npm run typecheck`, `npm run lint`.

## What the app does

- Catalog of 5 fictional rooms. Each room has an ID, name, building, capacity, equipment list, status (open or blocked) and its own bookings.
- Filter by capacity (room capacity is greater than or equal to the number of attendees).
- Filter by equipment (the room must have all selected items).
- A blocked room is never shown as available.
- An empty-state message appears when no room matches.
- Changing the selected room refreshes the availability result.
- Original rules (AC1–AC6) are preserved: valid time, 120 minutes maximum, blocked room, overlap rules (touching intervals are allowed), booking data is not changed, clear responsive feedback.

## Project structure (final version)

```
src/
  App.tsx                      state only, connects the components
  main.tsx, index.css          entry point and styles
  availability.test.ts         tests for the booking rules
  data/rooms.ts                fictional rooms, bookings, current time
  lib/
    availability.ts            checkAvailability: all booking rules
    roomBookings.ts            getRoomBookings: bookings of one room
    roomFilter.ts              capacity and equipment filtering
    datetime.ts                time helpers
    datetime.test.ts, roomFilter.test.ts, roomSearch.test.ts
  components/
    RoomFilterPanel.tsx        attendees and equipment inputs
    RoomList.tsx               list of matching rooms
    TimeRangeInputs.tsx        start and end time inputs
    AvailabilityResultCard.tsx availability result
    ExistingBookings.tsx       bookings of the selected room
    RoomTimeline.tsx           timeline bar
AGENTS.md                      rules for the AI assistant
```

`AGENTS.md` was updated before the feature work to allow an equipment field in the room data.

## AI use

I used Bolt.new and Claude. The tool, date, prompts, outputs, problems, changes and my own verification are in the AI evidence appendix of the report.

## Known limitations

- `checkAvailability` still reads the room data directly, so a test cannot give it a different catalog.
- No automated test checks the screen. The empty state, the refresh on room change and the responsive layout were checked by hand.
