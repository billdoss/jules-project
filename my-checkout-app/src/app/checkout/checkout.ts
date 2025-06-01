import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule for *ngIf, etc.
import { CheckoutService } from './services/checkout.service';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss'],
  standalone: true,
  imports: [
    CommonModule, // Needed for *ngIf, *ngFor, pipes etc. in the template if any
    CustomerInformationComponent,
    OrderSummaryComponent,
    PaymentDetailsComponent
  ]
})
export class CheckoutComponent {
  @ViewChild(CustomerInformationComponent) customerInfo!: CustomerInformationComponent;
  @ViewChild(PaymentDetailsComponent) paymentDetails!: PaymentDetailsComponent;
  @ViewChild(OrderSummaryComponent) orderSummary!: OrderSummaryComponent;

  constructor(private checkoutService: CheckoutService) {}

  isCheckoutFormValid(): boolean {
    const customerFormValid = this.customerInfo && this.customerInfo.isFormValid ? this.customerInfo.isFormValid() : false;
    const paymentFormValid = this.paymentDetails && this.paymentDetails.isFormValid ? this.paymentDetails.isFormValid() : false;
    return customerFormValid && paymentFormValid;
  }

  handlePlaceOrder() {
    if (!this.customerInfo || !this.paymentDetails || !this.orderSummary) {
      console.error('Child components not available');
      alert('An error occurred. Please try again.');
      return;
    }

    // Validation is now primarily handled by the form controls and button state,
    // but an additional check here can be a safeguard.
    if (!this.isCheckoutFormValid()) {
      alert('Please ensure all fields are correctly filled out.');
      return;
    }

    const orderData = {
      customerName: this.customerInfo.customer.name,
      customerEmail: this.customerInfo.customer.email,
      shippingAddress: this.customerInfo.customer.address,
      items: this.orderSummary.items, // Using items from OrderSummaryComponent
      totalAmount: this.orderSummary.calculateTotal(), // Using calculated total
      paymentDetails: { // Not typically sent in full, but for simulation:
        cardNumber: '**** **** **** ' + this.paymentDetails.payment.cardNumber.slice(-4) // Masked
      }
      // paymentStatus is typically handled by the backend
    };

    this.checkoutService.placeOrder(orderData).subscribe({
      next: (response) => {
        alert('Order placed successfully!');
        console.log('Order response:', response);
        // Here you might want to clear the form or redirect
        // For example, reset child component data:
        // this.customerInfo.customer = { name: '', email: '', address: '' };
        // this.paymentDetails.payment = { cardNumber: '', expiryDate: '', cvv: '' };
        // this.orderSummary.items = []; // Or fetch updated cart
      },
      error: (error) => {
        alert('There was an error placing your order. See console for details.');
        console.error('Order error:', error);
      }
    });
  }
}
