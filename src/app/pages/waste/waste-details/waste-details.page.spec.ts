import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WasteDetailsPage } from './waste-details.page';

describe('WasteDetailsPage', () => {
  let component: WasteDetailsPage;
  let fixture: ComponentFixture<WasteDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WasteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
