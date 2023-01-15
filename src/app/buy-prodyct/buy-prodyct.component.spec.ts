import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProdyctComponent } from './buy-prodyct.component';

describe('BuyProdyctComponent', () => {
  let component: BuyProdyctComponent;
  let fixture: ComponentFixture<BuyProdyctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyProdyctComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyProdyctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
