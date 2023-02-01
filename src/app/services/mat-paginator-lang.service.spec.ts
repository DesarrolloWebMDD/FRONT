import { TestBed } from '@angular/core/testing';

import { MatPaginatorLangService } from './mat-paginator-lang.service';

describe('MatPaginatorLangService', () => {
  let service: MatPaginatorLangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatPaginatorLangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
