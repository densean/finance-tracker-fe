import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExpensesDashboardRequest } from './dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardApi: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getExpenses(
    userId: number,
    paginationDto: { pageNo: number; pageSize: number }
  ): Observable<any> {
    const url = `${this.dashboardApi}/${userId}/expenses`;
    const params = new HttpParams()
      .set('pageNo', paginationDto.pageNo.toString())
      .set('pageSize', paginationDto.pageSize.toString());

    return this.http.get<any>(url, { params });
  }
}
