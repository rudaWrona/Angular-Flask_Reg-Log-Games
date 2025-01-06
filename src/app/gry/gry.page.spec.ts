import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GryPage } from './gry.page';

describe('GryPage', () => {
  let component: GryPage;
  let fixture: ComponentFixture<GryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
