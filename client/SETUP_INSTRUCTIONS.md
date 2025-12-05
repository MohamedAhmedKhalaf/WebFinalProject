# Setup Instructions

## Prerequisites

1. **Backend API Running**: Make sure the .NET API is running on `http://localhost:5000`
2. **Node.js**: Version 16 or higher
3. **npm**: Comes with Node.js

## Quick Start

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Configure API URL

The frontend is already configured to connect to `http://localhost:5000/api`.

If your backend API runs on a different port, create a `.env` file:

```bash
cp .env.example .env
```

Then edit `.env`:

```
VITE_API_URL=http://localhost:YOUR_PORT/api
```

And update `src/services/api.js` line 3 to:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Testing the Application

### 1. Create a Patient Account

1. Click "Sign Up" in the navigation
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Role: Patient
   - Birth Date: 1990-01-01
   - Password: password123
3. Click "Create Account"
4. Login with the credentials

### 2. Create a Doctor Account

1. Sign out from patient account
2. Click "Sign Up"
3. Fill in the form:
   - First Name: Jane
   - Last Name: Smith
   - Email: doctor@example.com
   - Role: Doctor
   - Specialty: Cardiology
   - Password: password123
4. Click "Create Account"
5. Login with the credentials

### 3. Book an Appointment (as Patient)

1. Login as patient
2. Go to Patient Dashboard
3. Click "Book Appointment"
4. Select yourself as patient
5. Select a doctor
6. Choose date and time
7. Click "Book Appointment"

### 4. Manage Appointments (as Doctor)

1. Login as doctor
2. View appointments in Doctor Dashboard
3. Click "Complete" or "Add Record" for appointments
4. Update appointment status

## Connecting to Backend

The frontend expects the following API endpoints to be available:

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/users/signup` - User registration

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/for` - Get user's appointments (requires auth)
- `POST /api/appointments/book` - Book appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

### Doctors
- `GET /api/doctors` - Get all doctors

### Patients
- `GET /api/patients` - Get all patients

### Medical Records
- `GET /api/medicalrecords` - Get all medical records
- `POST /api/medicalrecords` - Create medical record

### Users (Admin only)
- `GET /api/users` - Get all users
- `DELETE /api/users/{id}` - Delete user

## CORS Configuration

Make sure your backend API has CORS enabled for `http://localhost:5173` (or your frontend URL).

In your .NET API, this should already be configured in `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// After building the app
app.UseCors();
```

## Troubleshooting

### "Network Error" or "CORS Error"

1. Make sure the backend API is running
2. Check the API URL in the browser console
3. Verify CORS is enabled in the backend
4. Check that the API is accessible at `http://localhost:5000`

### "401 Unauthorized"

1. Try logging out and logging back in
2. Clear localStorage in browser dev tools
3. Check that the JWT token is being sent in requests (check Network tab)

### Appointments Not Showing

1. Make sure you've created both patient and doctor accounts
2. Verify data exists in the database
3. Check the browser console for errors
4. Verify the API endpoint returns data

### Build Errors

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`

## Production Build

To create a production build:

```bash
npm run build
```

This creates optimized files in the `dist` directory. You can serve these with any static file server:

```bash
npm run preview
```

Or deploy to:
- Vercel
- Netlify
- Azure Static Web Apps
- AWS S3 + CloudFront
- GitHub Pages

## Environment Variables

The application supports the following environment variables:

- `VITE_API_URL`: Backend API URL (default: `http://localhost:5000/api`)

Add them to a `.env` file in the client directory.

## Browser Dev Tools

### Useful Tips

1. **React Developer Tools**: Install the browser extension to inspect React components
2. **Network Tab**: Monitor API requests and responses
3. **Console**: Check for errors and warnings
4. **Application > Local Storage**: View stored authentication token
5. **Application > Cookies**: Check session cookies (if any)

## Default Test Accounts

You'll need to create these yourself using the signup form:

**Patient Account**:
- Email: patient@test.com
- Password: password123

**Doctor Account**:
- Email: doctor@test.com
- Password: password123
- Specialty: General Medicine

**Admin Account**:
- Needs to be created directly in the database with Role = "Admin"
