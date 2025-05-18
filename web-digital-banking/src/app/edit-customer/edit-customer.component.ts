import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule // Add ReactiveFormsModule here
  ],
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  editForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer || {};
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.editForm = this.fb.group({
      name: this.fb.control(this.customer.name || '', [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(this.customer.email || '', [Validators.required, Validators.email])
    });
    this.loadCustomerData();
  }

  loadCustomerData() {
    if (this.customerId) {
      this.customerService.getCustomerById(+this.customerId).subscribe({
        next: (data) => {
          this.customer = data;
          this.editForm.patchValue({
            name: this.customer.name,
            email: this.customer.email
          });
        },
        error: (err) => {
          this.errorMessage = 'Error loading customer data.';
          console.error(err);
        }
      });
    }
  }

  handleUpdateCustomer() {
    const updatedCustomer = this.editForm.value;
    updatedCustomer.id = +this.customerId;
    this.customerService.updateCustomer(+this.customerId, updatedCustomer).subscribe({
      next: () => {
        alert("Customer has been successfully updated!");
        this.router.navigateByUrl("/customers");
      },
      error: (err) => {
        this.errorMessage = 'Error updating customer.';
        console.error(err);
      }
    });
  }

  handleCancel() {
    this.router.navigateByUrl("/customers");
  }
}
