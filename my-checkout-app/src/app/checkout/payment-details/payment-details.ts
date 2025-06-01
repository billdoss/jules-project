import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
  standalone: true, // Assuming standalone
  imports: [FormsModule] // Import FormsModule here
})
export class PaymentDetailsComponent {
  @ViewChild('paymentForm') paymentForm!: NgForm;
  payment = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor() { }

  isFormValid(): boolean {
    return this.paymentForm ? this.paymentForm.valid ?? false : false;
  }
}
