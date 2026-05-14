# TradeNet Angular Portal - Installation & Setup Guide

## Project Structure

```
tradenet-portal/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── business.model.ts
│   │   │   │   ├── license.model.ts
│   │   │   │   ├── transaction.model.ts
│   │   │   │   ├── dashboard.model.ts
│   │   │   │   └── notification.model.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── business.service.ts
│   │   │   │   ├── license.service.ts
│   │   │   │   ├── transaction.service.ts
│   │   │   │   ├── program.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── http-error.interceptor.ts
│   │   │   └── env/
│   │   │       ├── environment.ts
│   │   │       └── environment.prod.ts
│   │   ├── shared/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts
│   │   │   │   └── navbar.component.html
│   │   │   └── footer/
│   │   │       ├── footer.component.ts
│   │   │       └── footer.component.html
│   │   └── features/
│   │       ├── auth/
│   │       │   └── components/
│   │       │       ├── login/
│   │       │       └── register/
│   │       └── business-trader/
│   │           └── components/
│   │               ├── dashboard/
│   │               ├── license-list/
│   │               └── profile/
│   ├── assets/
│   │   └── styles/
│   │       └── styles.css
│   └── index.html
├── package.json
├── angular.json
└── README.md
```

## Installation Steps

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)
- Angular CLI (v17+)

### 2. Create Project
```bash
ng new tradenet-portal --routing --style=css
cd tradenet-portal
```

### 3. Install Dependencies
```bash
npm install bootstrap @popperjs/core
npm install @fortawesome/fontawesome-free
```

### 4. Configure Angular
Update `angular.json` styles and scripts sections with Bootstrap and FontAwesome paths.

### 5. Copy All Files
Copy the provided source files into `src/app/` directory maintaining the folder structure.

### 6. Update Environment
Modify `src/app/core/env/environment.ts` with your API URL:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7265/api'
};
```

### 7. Run Development Server
```bash
ng serve
```

Access at `http://localhost:4200`

## API Integration

All API calls are configured in the service files under `src/app/core/services/`.

### API Base URL
- Development: `https://localhost:7265/api`
- Production: Update in `environment.prod.ts`

### Authentication Flow
1. User logs in → AuthService stores session
2. All HTTP requests include authorization
3. Token stored in sessionStorage
4. Auto-logout on 401 response

## CORS Configuration (.NET API)

Update your .NET `Program.cs`:

```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("Angular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// In the pipeline:
app.UseCors("Angular");
```

## Key Features

✓ Business/Trader user portal
✓ Authentication & Authorization
✓ License management
✓ Transaction tracking
✓ Business profile management
✓ Document uploads
✓ Trade programs & subsidies
✓ Real-time notifications
✓ Dashboard with metrics
✓ Responsive Bootstrap design

## Component Commands (For Reference)

```bash
# Generate standalone components
ng generate component features/auth/components/login --standalone
ng generate component features/auth/components/register --standalone
ng generate component features/business-trader/components/dashboard --standalone
ng generate component features/business-trader/components/license-list --standalone
ng generate component features/business-trader/components/profile --standalone
ng generate component shared/navbar --standalone
ng generate component shared/footer --standalone

# Generate services
ng generate service core/services/auth
ng generate service core/services/business
ng generate service core/services/license
ng generate service core/services/transaction
ng generate service core/services/program
ng generate service core/services/notification

# Generate guard
ng generate guard core/guards/auth

# Generate interceptor
ng generate interceptor core/interceptors/http-error
```

## Build for Production

```bash
ng build --configuration production
```

Output will be in `dist/tradenet-portal/`

## Troubleshooting

### CORS Errors
- Ensure .NET API has CORS enabled
- Check API URL in environment files

### 401 Unauthorized
- Verify token is being sent
- Check token expiration
- Re-login if needed

### Module Not Found
- Ensure all files are in correct directories
- Check import paths use correct relative paths
- Run `npm install` if node_modules are missing
