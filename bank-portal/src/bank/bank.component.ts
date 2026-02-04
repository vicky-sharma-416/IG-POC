import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BaseServiceService } from '../base-service/base-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  banks: any[] = [];
  isModalOpen = false;
  isLoading = false;
  bankForm!: FormGroup;

  constructor(private fb: FormBuilder, private baseService: BaseServiceService) {}

  ngOnInit(): void {
    this.bankForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      ifsc: ['', Validators.required],
      branchAddress: ['']
    });

    this.loadBanks();
  }

  loadBanks() {
    this.baseService.getBanks().subscribe({
      next: (res: any) => {
        this.banks = res || [];
        console.log('Banks loaded', this.banks);
      },
      error: (err) => console.error('Failed to load banks', err)
    });
  }

  openAdd() {
    this.bankForm.reset({ id: null, name: '', ifsc: '', branchAddress: '' });
    this.isModalOpen = true;
  }

  openEdit(bank: any) {
    this.bankForm.patchValue(bank);
    this.isModalOpen = true;
  }

  cancel() {
    this.isModalOpen = false;
    this.bankForm.reset();
  }

  save() {
    if (this.bankForm.invalid) {
      this.bankForm.markAllAsTouched();
      return;
    }

    const payload = this.bankForm.value;
    this.isLoading = true;

    this.backendApiCall(payload);
  }

  private backendApiCall(payload: Record<string,any>): void {
    this.baseService.createOrUpdateBank(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.isModalOpen = false;
        this.loadBanks();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Save failed', err);
      }
    });
  }

  trackById(_: number, item: any) {
    return item?.id;
  }
}
