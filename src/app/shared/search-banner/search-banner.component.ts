import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-banner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-banner.component.html',
  styleUrl: './search-banner.component.css',
})
export class SearchBannerComponent {
  @Output() search = new EventEmitter<any>();

  categories = [
    'Categorías',
    'Aventura',
    'Naturaleza',
    'Ciudad',
    'Playa',
  ];

  statusOptions = ['Abierto', 'Cerrado', 'Próximamente'];

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [''],
      category: [this.categories[0]],
      status: [this.statusOptions[0]],
      startDate: [''],
      endDate: [''],
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value);
    }
  }
}
