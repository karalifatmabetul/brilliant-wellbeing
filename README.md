# 🐙 Brilliant Well-being

> Gamified time management & well-being app featuring **Mr. Clocktopus** — an overwhelmed octopus learning to prioritize.

## ✨ Features

- 🎮 **Gamified Learning** — XP points, streaks, and progress tracking
- 🧠 **Interactive Courses** — Mind & Habits, Focus Flow, Time Mastery
- 📝 **Engaging Quizzes** — Visual choice cards with instant feedback
- ⏰ **Eisenhower Matrix** — Learn Do/Decide/Delegate/Delete framework
- 💎 **Premium Subscriptions** — RevenueCat-powered paywall with weekly/monthly/yearly plans
- 🌙 **Dark Theme** — Premium dark UI with green accent

## 📱 Screenshots

| Course Brief | Course Selection | Quiz | Eisenhower Matrix |
|:---:|:---:|:---:|:---:|
| Meet Mr. Clocktopus | Mind & Habits L1 | Interactive choices | Do/Decide/Delegate/Delete |

## 🛠 Tech Stack

- **React Native** + **Expo** (SDK 57)
- **TypeScript** — Full type safety
- **Expo Router** — File-based navigation
- **RevenueCat** — In-app subscriptions
- **AsyncStorage** — Local state persistence
- **GitHub Actions** — CI/CD for Android APK builds

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm
- Expo CLI (`npx expo`)

### Install & Run
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on Android
npx expo start --android
```

### Environment Variables
Create a `.env` file in the root:
```
EXPO_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_api_key
```

## 📦 Build Android APK

### Local Build
```bash
npx eas build -p android --profile preview --local
```

### CI/CD (GitHub Actions)
Push to `main` branch triggers automatic APK build. Required secrets:
- `EXPO_TOKEN` — Expo access token
- `REVENUECAT_API_KEY` — RevenueCat API key

## 📂 Project Structure

```
brilliant-wellbeing/
├── app/
│   ├── (tabs)/           # Tab navigation
│   │   ├── index.tsx     # Home screen
│   │   ├── courses.tsx   # Course listing
│   │   └── you.tsx       # Profile
│   ├── course/           # Course flow
│   │   ├── [id].tsx      # Course detail
│   │   ├── brief.tsx     # Character intro
│   │   ├── quiz.tsx      # Interactive quiz
│   │   └── lesson.tsx    # Eisenhower matrix
│   └── paywall.tsx       # Subscription screen
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # App & subscription state
│   ├── data/             # Course & quiz content
│   ├── services/         # RevenueCat integration
│   └── theme/            # Design system tokens
└── assets/images/        # Character & course art
```

## 🎨 Design

- **Background**: `#0D0D0D`
- **Accent**: `#00E676`
- **Surface**: `#1A1A2E`
- Based on [Figma Design](https://www.figma.com/design/yVH0428TfDgGTM2aO8rmYa/Brilliant---Well-being)

## 📄 License

MIT
