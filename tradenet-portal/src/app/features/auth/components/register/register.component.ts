import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  businessName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  errorMessage = '';
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/portal/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  get isFormValid(): boolean {
    // Added agreeTerms to the validation check
    return !!this.fullName && !!this.email && !!this.password && !!this.businessName && this.agreeTerms;
  }

  get canSubmit(): boolean {
    return this.isFormValid;
  }

  onSubmit(): void {
    if (this.passwordMismatch) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.isFormValid) {
      this.errorMessage = 'Please fill all fields and agree to terms.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    // --- FIX: NESTED DATA STRUCTURE FOR .NET API ---
    const registrationData = {
      user: {
        name: this.fullName,      // API expects "name"
        email: this.email,
        password: this.password,
        role: 'Trader',           // Match your User model requirements
        status: 'Active'
      },
      business: {
        name: this.businessName,  // API expects Business.Name
        type: 'General',
        address: 'N/A',
        contactInfo: this.email
      }
    };

    // Passing the single object to the service instead of multiple strings
    this.authService.register(registrationData)
      .subscribe({
        next: (response: any) => {
          // Note: response might be { success: true, user: ..., business: ... } 
          // based on the controller code you shared earlier.
          if (response.success || response.user) {
            this.router.navigate(['/login'], { 
              queryParams: { registered: true } 
            });
          } else {
            this.errorMessage = response.error || response.message || 'Registration failed.';
            this.isLoading = false;
          }
        },
        error: (err: any) => {
          // Check for the error message your API returns
          this.errorMessage = err.error?.error || 'An error occurred during registration.';
          this.isLoading = false;
        }
      });
  }
}