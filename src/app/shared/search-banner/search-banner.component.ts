import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface SearchFilters {
  query: string;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-search-banner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-banner.component.html',
  styleUrls: ['./search-banner.component.css'],
})
export class SearchBannerComponent {
  @Output() search = new EventEmitter<SearchFilters>();

  categories = [
    'Categorías',
    'Aventura',
    'Naturaleza',
    'Ciudad',
    'Playa',
  ];

  statusOptions = ['Estado', 'Abierto', 'Cerrado', 'Próximamente'];

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
      const { query, category, status, startDate, endDate } = this.searchForm.value;
      this.search.emit({
        query: (query || '').trim(),
        category: category === this.categories[0] ? '' : category,
        status: status === this.statusOptions[0] ? '' : status,
        startDate: startDate || '',
        endDate: endDate || '',
      });
    }
  }
}
