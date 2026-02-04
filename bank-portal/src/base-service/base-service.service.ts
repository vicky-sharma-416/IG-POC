import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Bank } from '../bank/models/bank.model';
import { Statement } from '../statement/models/statement.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {
  private baseConfigUrl = environment.bankConfigApi;
  private baseVisibilityUrl = environment.visibilityApi;

  constructor(private http: HttpClient) {}

  getBanks() {
    let url = `${this.baseConfigUrl}/banks`;
    console.log('Fetching banks from URL:', url);
    return this.http.get<Bank[]>(url).pipe(catchError(this.handleError));
  }

  createOrUpdateBank(bank: Partial<Bank>) {
    return this.http.post(`${this.baseConfigUrl}/banks`, bank).pipe(catchError(this.handleError));
  }

  getStatementsByBank(bankId: string) {
    return this.http.get<Statement[]>(
      `${this.baseConfigUrl}/banks/${bankId}/statements`
    ).pipe(catchError(this.handleError));
  }

  getAvailableBanks(userId: string) {
    return this.http.get<Bank[]>(
      `${this.baseVisibilityUrl}/visibility/banks?userId=${userId}`
    ).pipe(catchError(this.handleError));
  }

  reserveBank(bankId: string, userId: string) {
    return this.http.post(`${this.baseVisibilityUrl}/visibility/reserve`, {
      bankId,
      userId
    }).pipe(catchError(this.handleError));
  }

  releaseBank(bankId: string, userId: string) {
    return this.http.post(`${this.baseVisibilityUrl}/visibility/release`, {
      bankId,
      userId
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
