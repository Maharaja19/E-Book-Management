# BookSphere Mobile App

A mobile application for the BookSphere platform, built with React Native and Expo.

## Features

- User authentication (register/login)
- Book library browsing
- Group collaboration
- In-app reading with bookmarks and notes
- AI-powered learning tools
- Reading progress tracking

## Tech Stack

- React Native with Expo
- Redux Toolkit for state management
- React Navigation for routing
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- Android/iOS simulator or Expo Go app on your device

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code with Expo Go app or run on simulator

## Project Structure

```
mobile/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   ├── books/
│   │   ├── groups/
│   │   └── progress/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── LibraryScreen.js
│   │   ├── BookDetailScreen.js
│   │   ├── ReaderScreen.js
│   │   ├── GroupsScreen.js
│   │   └── AIToolsScreen.js
│   ├── Navigation.js
│   └── store.js
├── App.js
├── package.json
└── README.md
```

## Available Scripts

- `npm start`: Start the development server
- `npm run android`: Run on Android
- `npm run ios`: Run on iOS
- `npm run web`: Run on web

## API Integration

The mobile app connects to the BookSphere backend API running on `http://localhost:5000`. Make sure the backend server is running before using the mobile app.

## Redux State Management

The app uses Redux Toolkit for state management with the following slices:

- `auth`: User authentication and profile
- `books`: Book library and details
- `groups`: Reading groups
- `progress`: Reading progress and statistics

## Navigation

The app uses React Navigation with a tab-based interface for the main sections and stack navigation for detailed views.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License