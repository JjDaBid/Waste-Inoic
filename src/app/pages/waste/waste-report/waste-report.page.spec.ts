import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WasteReportPage } from './waste-report.page';

describe('WasteReportPage', () => {
  let component: WasteReportPage;
  let fixture: ComponentFixture<WasteReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WasteReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
