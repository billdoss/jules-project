import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // For pipes

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class OrderSummaryComponent {
  // Example: items could be passed as Input
  @Input() items: any[] = [{ productName: 'Sample Product', quantity: 1, price: 10.00, total: 10.00 }]; // Default
  @Input() totalAmount: number = 10.00; // Default

  constructor() { }

  calculateTotal() {
    // This would be more dynamic in a real app
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
