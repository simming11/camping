import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalstatusComponent } from './approvalstatus.component';

describe('ApprovalstatusComponent', () => {
  let component: ApprovalstatusComponent;
  let fixture: ComponentFixture<ApprovalstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalstatusComponent]
    });
    fixture = TestBed.createComponent(ApprovalstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
