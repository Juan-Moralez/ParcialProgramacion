import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listpaises } from './listpaises.component';

describe('Listpaises', () => {
  let component: Listpaises;
  let fixture: ComponentFixture<Listpaises>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listpaises]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listpaises);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
