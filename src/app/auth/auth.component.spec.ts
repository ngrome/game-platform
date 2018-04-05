import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AuthComponent],
        imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
        providers: [AuthService],
      }).compileComponents();
    })
  );

  xit(
    'should create the AuthComponent',
    async(() => {
      const fixture = TestBed.createComponent(AuthComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
