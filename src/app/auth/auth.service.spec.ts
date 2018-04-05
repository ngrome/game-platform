import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
  });

  it(
    'should be created',
    async(
      inject(
        [HttpTestingController, AuthService],
        (http: HttpTestingController, service: AuthService) => {
          expect(service).toBeTruthy();
        }
      )
    )
  );
});
