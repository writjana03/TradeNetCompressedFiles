import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService } from '@core/services/business.service';
import { AuthService } from '@core/services/auth.service';
import { Business, BusinessDocument } from '@core/models/business.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any = null;
  business: Business | null = null;
  documents: BusinessDocument[] = [];
  successMessage = '';
  errorMessage = '';
  isLoading = true;
  isSaving = false;

  // Form state
  editMode = false;
  businessForm: Partial<Business> = {};

  // File upload
  selectedDocuments: File[] = [];
  selectedProfilePhoto: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private businessService: BusinessService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.businessService.getProfile().subscribe({
      next: (business) => {
        this.business = business;
        this.businessForm = { ...business };
        
        if (business?.businessID) {
          this.businessService.getBusinessDocuments(business.businessID).subscribe({
            next: (docs) => {
              this.documents = docs || [];
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error loading documents:', err);
              this.isLoading = false;
            }
          });
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.errorMessage = 'Failed to load profile. Please refresh the page.';
        this.isLoading = false;
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.businessForm = { ...this.business };
    }
  }

  saveProfile(): void {
    if (!this.businessForm.businessID) {
      // Create new business
      const newBusiness: Business = {
        businessID: 0,
        userID: this.authService.getCurrentUserId(),
        name: this.businessForm.name || '',
        type: this.businessForm.type || 'Trader',
        address: this.businessForm.address || '',
        contactInfo: this.businessForm.contactInfo || '',
        registrationNumber: this.businessForm.registrationNumber,
        status: 'Pending',
        complianceStatus: 'Compliant'
      };

      this.isSaving = true;
      this.businessService.createBusiness(newBusiness).subscribe({
        next: (createdBusiness) => {
          this.business = createdBusiness;
          this.businessForm = { ...createdBusiness };
          this.successMessage = 'Business profile created successfully!';
          this.editMode = false;
          this.isSaving = false;
          setTimeout(() => { this.successMessage = ''; }, 3000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to create business profile.';
          this.isSaving = false;
        }
      });
    } else {
      // Update existing business
      this.isSaving = true;
      this.businessService.updateProfile(this.businessForm).subscribe({
        next: () => {
          this.business = { ...this.business, ...this.businessForm } as Business;
          this.successMessage = 'Profile updated successfully!';
          this.editMode = false;
          this.isSaving = false;
          setTimeout(() => { this.successMessage = ''; }, 3000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to update profile.';
          this.isSaving = false;
        }
      });
    }
  }

  onDocumentsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDocuments = Array.from(input.files || []);
  }

  uploadDocuments(): void {
    if (!this.business?.businessID) {
      this.errorMessage = 'Please save your business profile first.';
      return;
    }

    if (this.selectedDocuments.length === 0) {
      this.errorMessage = 'Please select at least one document.';
      return;
    }

    this.isSaving = true;
    this.businessService.uploadDocuments(this.business.businessID, this.selectedDocuments).subscribe({
      next: () => {
        this.successMessage = 'Documents uploaded successfully!';
        this.selectedDocuments = [];
        this.loadProfile();
        this.isSaving = false;
        setTimeout(() => { this.successMessage = ''; }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to upload documents.';
        this.isSaving = false;
      }
    });
  }

  onProfilePhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedProfilePhoto = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProfilePhoto(): void {
    if (!this.business?.businessID || !this.selectedProfilePhoto) {
      this.errorMessage = 'Please select a photo first.';
      return;
    }

    this.isSaving = true;
    this.businessService.uploadProfilePhoto(this.business.businessID, this.selectedProfilePhoto).subscribe({
      next: () => {
        this.successMessage = 'Profile photo updated successfully!';
        this.selectedProfilePhoto = null;
        this.previewUrl = null;
        this.isSaving = false;
        setTimeout(() => { this.successMessage = ''; }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to upload photo.';
        this.isSaving = false;
      }
    });
  }

  getDocStatusClass(status: string): string {
    if (status === 'Verified') return 'bg-success';
    if (status === 'Rejected') return 'bg-danger';
    return 'bg-warning text-dark';
  }

  cancelEdit(): void {
    this.editMode = false;
    this.businessForm = { ...this.business };
  }
}
