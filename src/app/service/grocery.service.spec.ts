import { TestBed } from '@angular/core/testing';

import { GroceryService } from './grocery.service';

describe('GroceryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroceryService = TestBed.get(GroceryService);
    expect(service).toBeTruthy();
  });
});
