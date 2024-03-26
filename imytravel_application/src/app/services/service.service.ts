import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Service;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: localStorageSession
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });

  addComment(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.addComment, data, {
      headers: this.headers,
    });
  }

  updateComment(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.updateComment, _data, {
      headers: this.headers,
    });
  }

  getAllComments(data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.getAllComments + '?id=' + data,
      {
        headers: this.headers,
      }
    );
  }

  // getAllComments() {
  //   return this._httpClient.get(_baseUrl + _apiUrl.getAllComments + '?id=1', {
  //     headers: this.headers,
  //   });
  // }

  deleteComment(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.deleteComment + '?id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  createTravelExperience(_data: any) {
    return this._httpClient.post(
      _baseUrl + _apiUrl.createTravelExperience,
      _data,
      {
        headers: this.headers,
      }
    );
  }

  updateTravelExperience(_data: any) {
    return this._httpClient.put(
      _baseUrl + _apiUrl.updateTravelExperience,
      _data,
      {
        headers: this.headers,
      }
    );
  }

  getTravelExperiencesList() {
    return this._httpClient.get(
      _baseUrl + _apiUrl.getTravelExperiencesList, //+ _data,
      {
        headers: this.headers,
      }
    );
  }

  getAllTravelExperiences(data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.getAllTravelExperiences + '?locationName=' + data,
      {
        headers: this.headers,
      }
    );
  }

  deleteTravelExperience(_data: any) {
    debugger;
    return this._httpClient.delete(
      _baseUrl + _apiUrl.deleteTravelExperience + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
