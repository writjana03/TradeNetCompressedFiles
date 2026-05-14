# TradeNet Portal - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Extract & Install (2 min)
```bash
# Extract the zip file
unzip tradenet-portal.zip
cd tradenet-portal

# Install dependencies
npm install
```

### Step 2: Configure API (1 min)
Edit `src/app/core/env/environment.ts`:
```typescript
apiUrl: 'https://localhost:7265/api'  // Change to your .NET API URL
```

### Step 3: Run (2 min)
```bash
npm start
```
Opens browser at **http://localhost:4200**

---

## 📋 What's Included

✅ **Complete Angular 17 Project**
✅ **All Components & Services**
✅ **Bootstrap 5 Styling**
✅ **Authentication Flow**
✅ **API Integration Ready**
✅ **Responsive Design**

---

## 📁 File Structure Quick Reference

```
tradenet-portal/
├── src/app/
│   ├── core/services/          ← Update API URLs here
│   ├── features/               ← All components
│   └── shared/                 ← Navbar, Footer
├── package.json                ← Dependencies
├── angular.json                ← Build config
└── README.md                   ← Full documentation
```

---

## 🔑 Key Files to Modify

### 1. API Configuration
**File:** `src/app/core/env/environment.ts`
```typescript
apiUrl: 'https://localhost:7265/api'  // ← Change this
```

### 2. CORS Setup (In your .NET API)
**File:** `Program.cs`
```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("Angular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

app.UseCors("Angular");
```

---

## 🚀 Development Workflow

```bash
# Start development server
npm start

# Build for production
npm run build:prod

# Run tests
npm test

# Generate new component
ng generate component features/business-trader/components/my-component
```

---

## 🔐 Default Routes

| Route | Access | Component |
|-------|--------|-----------|
| `/` | Public | Home |
| `/login` | Public | Login |
| `/register` | Public | Register |
| `/portal/dashboard` | Protected | Dashboard |
| `/portal/licenses` | Protected | Licenses |
| `/portal/profile` | Protected | Profile |

---

## 📱 Responsive Breakpoints

- **Mobile:** < 576px
- **Tablet:** 576px - 992px
- **Desktop:** > 992px

---

## 🐛 Common Issues & Fixes

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Enable CORS in .NET API (see CORS Setup above)

### API Not Responding
```
Failed to fetch from API
```
**Fix:** Check `environment.ts` has correct API URL

### Port 4200 Already in Use
```bash
ng serve --port 4300
```

---

## 📞 Support

Need help? Check these resources:
- 📖 README.md - Full documentation
- 🔍 INSTALLATION.md - Detailed setup
- 💬 GitHub Issues
- 📧 support@tradenet.gov

---

## 🎯 Next Steps

1. ✅ Extract & install (done!)
2. ✅ Update API URL in environment.ts
3. ✅ Run `npm start`
4. ✅ Login with test credentials
5. ✅ Explore dashboard & features

---

**Happy Coding! 🚀**
