# HealthCare Clinic - Frontend

A modern, responsive React frontend for the Medical Clinic Appointment System.

## Features

### For Patients
- Book appointments with available doctors
- View appointment history
- Browse doctors by specialty
- Manage appointments (cancel/reschedule)

### For Doctors
- View daily and upcoming appointments
- Manage appointment schedule
- Add medical records for patients
- Update appointment status (complete/cancel)

### For Administrators
- System-wide dashboard with statistics
- Manage users, doctors, and patients
- View all appointments
- Generate reports

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **date-fns** - Date formatting and manipulation
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features (Grid, Flexbox, CSS Variables)

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Running backend API (see Api folder)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.jsx        # Card container component
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation bar
│   └── ProtectedRoute.jsx  # Route authentication guard
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login page
│   ├── Signup.jsx      # Registration page
│   ├── PatientDashboard.jsx   # Patient dashboard
│   ├── DoctorDashboard.jsx    # Doctor dashboard
│   └── AdminDashboard.jsx     # Admin dashboard
├── services/           # API service layer
│   └── api.js          # Axios instance and API methods
├── utils/              # Utility functions
│   ├── dateUtils.js    # Date formatting helpers
│   └── validation.js   # Form validation functions
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## Design System

### Color Palette

The application uses a professional blue theme:

- **Primary Blue**: `#3b82f6` - Main brand color
- **Primary Dark**: `#1e40af` - Darker shade for depth
- **Primary Light**: `#60a5fa` - Lighter shade for highlights
- **Success**: `#10b981` - Success states
- **Danger**: `#ef4444` - Error/danger states
- **Warning**: `#f59e0b` - Warning states
- **Gray Scale**: From `#f8fafc` to `#0f172a` - UI elements

### Responsive Design

The application is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Components

- **Buttons**: Primary, secondary, outline, success, danger variants
- **Cards**: Elevated containers with hover effects
- **Forms**: Validated inputs with error states
- **Alerts**: Success, error, warning, info notifications
- **Tables**: Responsive data tables with hover effects

## API Integration

The frontend communicates with the backend API using Axios. The API service layer (`src/services/api.js`) provides:

- Automatic JWT token injection
- Request/response interceptors
- Centralized error handling
- Type-safe API methods

### Available API Methods

```javascript
// Authentication
authAPI.login(email, password)
authAPI.signup(data)

// Appointments
appointmentAPI.getAll()
appointmentAPI.getForUser()
appointmentAPI.book(data)
appointmentAPI.update(id, data)
appointmentAPI.delete(id)

// Doctors
doctorAPI.getAll()
doctorAPI.getById(id)

// Patients
patientAPI.getAll()
patientAPI.getById(id)

// Medical Records
medicalRecordAPI.getAll()
medicalRecordAPI.create(data)

// Users (Admin only)
userAPI.getAll()
userAPI.delete(id)
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users log in with email and password
2. Backend returns a JWT token
3. Token is stored in localStorage
4. Token is attached to all subsequent API requests
5. Protected routes check for valid token
6. Token is removed on logout

### Role-Based Access Control

Three user roles are supported:
- **Patient**: Can book appointments and view own records
- **Doctor**: Can manage schedule and add medical records
- **Admin**: Has full system access

## Form Validation

Client-side validation is implemented for all forms:

- Email format validation
- Password strength requirements (min 6 characters)
- Required field validation
- Date validation
- Custom validation rules per form

## Features in Detail

### Appointment Booking

1. Patient selects a doctor from the list
2. Patient chooses date and time
3. System validates for conflicts
4. Confirmation is displayed
5. Email notification is sent (backend)

### Doctor Schedule Management

1. Doctor views all appointments
2. Can filter by date/status
3. Can complete or cancel appointments
4. Can add medical records during appointment

### Admin Panel

1. View system statistics
2. Manage users with CRUD operations
3. View all appointments
4. Generate reports (upcoming feature)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of route components
- Optimized bundle size with code splitting
- Debounced search inputs
- Memoized expensive computations
- Efficient re-rendering with React keys

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test changes before committing
4. Update documentation as needed

## License

This project is part of an academic assignment.
