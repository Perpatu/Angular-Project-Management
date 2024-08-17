import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientsBoardComponent} from './clients-board.component';

describe('ClientsBoardComponent', () => {
  let component: ClientsBoardComponent;
  let fixture: ComponentFixture<ClientsBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsBoardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
