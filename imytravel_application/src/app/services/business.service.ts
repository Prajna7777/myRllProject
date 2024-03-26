import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Business;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: localStorageSession
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });
  // 'Content-Type', 'text/plain'
  createPlaceSuggestion(_data: any) {
    return this._httpClient.post(
      _baseUrl + _apiUrl.createPlaceSuggestion,
      _data,
      {
        headers: this.headers,
      }
    );
  }

  updatePlaceSuggestion(_data: any) {
    return this._httpClient.put(
      _baseUrl + _apiUrl.updatePlaceSuggestion,
      _data,
      {
        headers: this.headers,
      }
    );
  }

  getAllPlaceSuggestions() {
    return this._httpClient.get(_baseUrl + _apiUrl.getAllPlaceSuggestions, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
      }),
    });
  }

  deletePlaceSuggestion(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.deletePlaceSuggestion + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
