import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignUpRequest } from 'src/app/components/pages/log-in/log-in.component.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localhost: string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  signUp(request: ISignUpRequest): Observable<any> {
    return this.http.post<any>(`${this.localhost}signup`, request);
  }

  // o	Response: Created user object.
  // 3.	Update User
  // o	Endpoint: PUT /api/users/{id}
  // o	Description: Updates an existing user by ID.
  // o	Request Body (JSON):
  // {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "username": "johndoe", "dob": "1990-01-01", "password": "password123", "roles": ["role1", "role2"]}
  // o	Response: Updated user object.
  // 4.	Patch User
  // o	Endpoint: PATCH /api/users/{id}
  // o	Description: Partially updates an existing user by ID.
  // o	Request Body (JSON):
  // {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "username": "johndoe", "dob": "1990-01-01", "password": "password123", "roles": ["role1", "role2"]}
  // o	Response: Partially updated user object.
  // 5.	Delete User
  // o	Endpoint: DELETE /api/users/{id}
  // o	Description: Deletes a user by ID.
  // o	Response: No content.
  // 6.	Get User by ID
  // o	Endpoint: GET /api/users/{id}
  // o	Description: Retrieves a user by ID.
  // o	Response: User object.
}
