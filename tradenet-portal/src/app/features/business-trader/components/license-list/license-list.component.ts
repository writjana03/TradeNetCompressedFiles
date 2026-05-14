import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LicenseService } from '@core/services/license.service';
import { ProgramService } from '@core/services/program.service';
import { TradeLicense, TradeProgram } from '@core/models/license.model';

@Component({
  selector: 'app-license-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit {
  availableLicenses: TradeLicense[] = [];
  activePrograms: TradeProgram[] = [];
  selectedLicense: TradeLicense | null = null;
  selectedProgram: TradeProgram | null = null;
  isLoading = true;
  
  // Application form
  applicationForm = { 
    licenseID: 0, 
    licenseType: '', 
    title: '', 
    description: '', 
    additionalNotes: '', 
    files: [] as File[] 
  };
  appSuccess = '';
  appError = '';
  isSubmittingApp = false;

  // Search and filter
  searchTerm = '';
  selectedType = '';

  constructor(
    private licenseService: LicenseService,
    private programService: ProgramService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.licenseService.getAvailableLicenses().subscribe({
      next: (licenses) => {
        this.availableLicenses = licenses || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading licenses:', err);
        this.isLoading = false;
      }
    });

    this.programService.getActivePrograms().subscribe({
      next: (programs) => {
        this.activePrograms = programs || [];
      },
      error: (err) => {
        console.error('Error loading programs:', err);
      }
    });
  }

  get filteredLicenses(): TradeLicense[] {
    let filtered = this.availableLicenses;
    
    if (this.searchTerm) {
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedType) {
      filtered = filtered.filter(l => l.type === this.selectedType);
    }

    return filtered;
  }

  get licenseTypes(): string[] {
    return Array.from(new Set(this.availableLicenses.map(l => l.type)));
  }

  viewLicenseDetails(license: TradeLicense): void {
    this.selectedLicense = license;
  }

  viewProgramDetails(program: TradeProgram): void {
    this.selectedProgram = program;
  }

  openApplicationForm(license: TradeLicense): void {
    this.applicationForm = { 
      licenseID: license.licenseID, 
      licenseType: license.type, 
      title: license.title, 
      description: license.description, 
      additionalNotes: '', 
      files: [] 
    };
    this.appSuccess = '';
    this.appError = '';
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.applicationForm.files = Array.from(input.files || []);
  }

  submitApplication(): void {
    if (!this.applicationForm.licenseID) {
      this.appError = 'License ID is required.';
      return;
    }

    this.appError = '';
    this.isSubmittingApp = true;

    this.licenseService.applyForLicense({
      ...this.applicationForm,
      documents: this.applicationForm.files
    }).subscribe({
      next: () => {
        this.appSuccess = 'Application submitted successfully!';
        this.applicationForm = { 
          licenseID: 0, 
          licenseType: '', 
          title: '', 
          description: '', 
          additionalNotes: '', 
          files: [] 
        };
        this.isSubmittingApp = false;
        setTimeout(() => { this.appSuccess = ''; }, 3000);
      },
      error: (err) => {
        this.appError = err.error?.message || 'Failed to submit application. Please try again.';
        this.isSubmittingApp = false;
      }
    });
  }

  closeDetailModal(): void {
    this.selectedLicense = null;
    this.selectedProgram = null;
  }
}
