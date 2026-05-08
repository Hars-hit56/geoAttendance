# Geo Attendance App

Geo Attendance is a React Native attendance app that validates employee check-ins using live GPS location and an office geofence. Users can save the office coordinates, configure a geofence radius, check in only when inside the allowed area, and view locally saved attendance history.

## Features

- Live location tracking on the Home screen
- Google Maps view with office marker, current location, and geofence circle
- Office geofence setup from manual coordinates or current GPS
- Distance and GPS accuracy display
- Attendance check-in blocked outside the configured office radius
- Local offline storage for attendance records and geofence settings
- Attendance history screen
- Redux Toolkit state management

## Tech Stack

- React Native 0.85
- React 19
- TypeScript
- Redux Toolkit and React Redux
- React Navigation
- React Native Maps
- React Native Geolocation
- AsyncStorage
- NetInfo

## Environment Setup

Create a `.env` file in the project root:

```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

The Android manifest reads this value through Gradle:

```xml
android:value="${googleMapsApiKey}"
```

Do not commit `.env`. Use `.env.example` as the template for required environment values.

## Installation

Install dependencies:

```sh
npm install
```

Start Metro:

```sh
npm start
```

Run Android:

```sh
npm run android
```

Run iOS:

```sh
npm run ios
```

For iOS, install pods after native dependency changes:

```sh
bundle install
bundle exec pod install
```

## Main Screens

### Home

Shows the map, tracks current location, calculates distance from the saved office location, and allows attendance check-in only inside the geofence.

### Settings

Lets the user set office latitude, longitude, and geofence radius. The user can also fill coordinates from current GPS.

### Attendance History

Displays saved attendance check-in records from local storage.

## Data Storage

The app stores data locally with AsyncStorage:

- `attendance_records`: saved attendance history
- `office_location`: saved office coordinates
- `geofence_radius`: saved radius in meters

## Useful Commands

```sh
npm run lint
npm test
npx tsc --noEmit
```

## Notes

- Location permission is required for check-in and for using current GPS in Settings.
- Google Maps requires a valid Android API key.
- Restrict the Google Maps API key in Google Cloud Console by package name and SHA certificate.
