import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError } from 'rxjs';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ]
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  accounts$!: Observable<any[]>;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer || {};
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.loadAccounts();
    } else {
      this.errorMessage = 'Customer ID not provided.';
    }
  }

  loadAccounts() {
    console.log('Fetching accounts for customerId:', this.customerId); // Log pour débogage
    this.accounts$ = this.customerService.getCustomerAccounts(+this.customerId).pipe(
      catchError(err => {
        this.errorMessage = `Error fetching accounts. Please try again. Details: ${err.status} - ${err.message}`;
        console.error('Error details:', err); // Log détaillé de l'erreur
        return throwError(err);
      })
    );
  }

  handleClose() {
    this.router.navigate(['/admin/customers']);
  }
}
