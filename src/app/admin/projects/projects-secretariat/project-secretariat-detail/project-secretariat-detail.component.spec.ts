import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectSecretariatDetailComponent} from './project-secretariat-detail.component';

describe('ProjectSecretariatDetailComponent', () => {
  let component: ProjectSecretariatDetailComponent;
  let fixture: ComponentFixture<ProjectSecretariatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSecretariatDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectSecretariatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
