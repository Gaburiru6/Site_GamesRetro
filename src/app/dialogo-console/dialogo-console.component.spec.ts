import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleDialogoComponent } from './dialogo-console.component';

describe('DialogoPrecoComponent', () => {
  let component: ConsoleDialogoComponent;
  let fixture: ComponentFixture<ConsoleDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleDialogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
