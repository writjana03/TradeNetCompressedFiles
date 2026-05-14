# TradeNet Business Portal - Angular Frontend

A comprehensive Angular 17+ web application for business traders to manage licenses, transactions, and compliance within the TradeNet government platform.

## Features

✅ **Business Registration** - Register and manage business profiles
✅ **Trade Licenses** - Browse and apply for government trade licenses
✅ **Transaction Tracking** - Monitor buy/sell, import/export transactions
✅ **Compliance Management** - Document uploads and verification
✅ **Government Programs** - Access subsidies and trade programs
✅ **Real-time Notifications** - Stay updated on license approvals and transactions
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Secure Authentication** - Session-based user authentication

## Tech Stack

- **Framework:** Angular 17+
- **Language:** TypeScript
- **UI Framework:** Bootstrap 5.3
- **Icons:** Font Awesome 6.4
- **HTTP Client:** Angular HttpClient
- **State Management:** RxJS Observables
- **Routing:** Angular Router

## Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- npm v9+ (comes with Node.js)
- Angular CLI 17+ (`npm install -g @angular/cli@17`)
- .NET 7+ API Backend ([TradeNetAPI](https://github.com/yourrepo/tradenet-api))

## Installation & Setup

### 1. Clone or Extract Project

```bash
# If using git
git clone <repository-url>
cd tradenet-portal

# Or just extract the provided zip file
unzip tradenet-portal.zip
cd tradenet-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Connection

Edit `src/app/core/env/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7265/api'  // Update with your API URL
};
```

For production, edit `src/app/core/env/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.tradenet.gov/api'  // Your production API URL
};
```

### 4. Start Development Server

```bash
npm start
# or
ng serve --open
```

Access the application at **http://localhost:4200**

## Project Structure

```
tradenet-portal/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   ├── services/            # API service layer
│   │   │   ├── guards/              # Route guards
│   │   │   ├── interceptors/        # HTTP interceptors
│   │   │   └── env/                 # Environment configuration
│   │   ├── shared/
│   │   │   ├── navbar/              # Navigation component
│   │   │   └── footer/              # Footer component
│   │   └── features/
│   │       ├── auth/                # Login & Register
│   │       ├── home/                # Landing page
│   │       └── business-trader/     # Business portal
│   ├── assets/                      # Images, fonts
│   ├── index.html                   # HTML entry point
│   ├── main.ts                      # Angular bootstrap
│   └── styles.css                   # Global styles
├── angular.json                     # Angular CLI config
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies
└── README.md                        # This file
```

## Key Components

### Authentication
- **LoginComponent** - User login with email/password
- **RegisterComponent** - New account creation
- **AuthService** - Handles authentication logic
- **AuthGuard** - Protects routes requiring login

### Business Portal
- **DashboardComponent** - Overview of licenses, transactions, programs
- **LicenseListComponent** - Browse and apply for licenses
- **ProfileComponent** - Manage business information and documents

### Shared
- **NavbarComponent** - Top navigation with notifications
- **FooterComponent** - Footer with links

## API Integration

All API calls are in `src/app/core/services/`:

- `auth.service.ts` - Authentication endpoints
- `business.service.ts` - Business profile management
- `license.service.ts` - License listing and applications
- `transaction.service.ts` - Transaction management
- `program.service.ts` - Government programs
- `notification.service.ts` - Real-time notifications

### Required API Endpoints

```
POST   /api/account/login           - User login
POST   /api/account/register        - User registration
GET    /api/business/user/{userId}  - Get business profile
PUT    /api/business/{id}           - Update business
GET    /api/license                 - Get all licenses
GET    /api/license/{id}            - Get license details
POST   /api/license/apply           - Apply for license
GET    /api/transaction/{id}        - Get transaction details
POST   /api/transaction             - Create transaction
GET    /api/program                 - Get programs
GET    /api/program/{id}            - Get program details
GET    /api/notification            - Get notifications
POST   /api/notification/{id}/read  - Mark as read
```

## CORS Configuration

Update your .NET API `Program.cs`:

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

## Build for Production

```bash
npm run build:prod
# or
ng build --configuration production
```

Output in `dist/tradenet-portal/`

Deploy to your web server (Apache, Nginx, IIS, etc.)

## Running Tests

```bash
ng test
```

## Linting

```bash
ng lint
```

## Troubleshooting

### CORS Errors
- ✓ Enable CORS in .NET API
- ✓ Check API URL in environment files
- ✓ Ensure frontend and API are on allowed origins

### 401 Unauthorized
- ✓ Verify login credentials
- ✓ Check token expiration
- ✓ Re-login if session expired

### Module Not Found
- ✓ Run `npm install`
- ✓ Check import paths are relative
- ✓ Ensure files exist in correct directories

### Port 4200 Already in Use
```bash
ng serve --port 4300  # Use different port
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build:prod` | Production build |
| `npm test` | Run tests |
| `ng generate component name` | Create component |
| `ng generate service name` | Create service |

## Features in Detail

### Dashboard
- View pending/approved licenses count
- Monitor transaction statistics
- Access available subsidies
- Create new transactions
- View license details

### License Management
- Browse available licenses with filters
- Apply for licenses with documents
- Track application status
- View detailed license information
- Access government programs

### Business Profile
- Add/edit business information
- Upload supporting documents
- Set business type (Trader, Exporter, Importer)
- Manage compliance documents
- Upload profile photo

### Notifications
- Real-time notification bell
- License approval alerts
- Transaction updates
- Program announcements
- Mark notifications as read

## Security Features

✓ **Authentication** - Session-based with JWT tokens
✓ **Authorization** - Route guards prevent unauthorized access
✓ **HTTPS** - Encrypted data transmission
✓ **Input Validation** - Client & server-side validation
✓ **CORS** - Cross-origin request protection
✓ **Secure Storage** - SessionStorage for tokens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimizations

- ✓ Lazy loading of feature modules
- ✓ Standalone components (no NgModule overhead)
- ✓ Tree-shaking enabled
- ✓ AOT compilation
- ✓ Minification & compression
- ✓ CSS grid for responsive design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the Government License - see LICENSE file for details.

## Support

For issues, questions, or suggestions:
- 📧 Email: support@tradenet.gov
- 🐛 Issues: [GitHub Issues](https://github.com/tradenet/portal/issues)
- 📖 Documentation: [Wiki](https://github.com/tradenet/portal/wiki)

## Changelog

### v1.0.0 (Initial Release)
- Business registration and profile management
- Trade license browsing and applications
- Transaction tracking
- Document uploads
- Government programs access
- Real-time notifications
- Responsive design

---

**Built with ❤️ for TradeNet Government Platform**
