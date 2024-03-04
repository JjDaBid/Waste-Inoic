import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WasteFormPage } from './waste-form.page';

describe('WasteFormPage', () => {
  let component: WasteFormPage;
  let fixture: ComponentFixture<WasteFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WasteFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
