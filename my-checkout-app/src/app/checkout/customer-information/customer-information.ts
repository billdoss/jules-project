import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss'],
  standalone: true, // Assuming standalone based on ng generate defaults for newer Angular
  imports: [FormsModule] // Import FormsModule here for standalone components
})
export class CustomerInformationComponent {
  @ViewChild('customerForm') customerForm!: NgForm;
  customer = {
    name: '',
    email: '',
    address: ''
  };

  constructor() { }

  isFormValid(): boolean {
    return this.customerForm ? this.customerForm.valid ?? false : false;
  }
}
