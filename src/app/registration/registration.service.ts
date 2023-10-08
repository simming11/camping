import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient ) { }

  getuser(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('https://localhost:7197/api/Camp/save' ,data, { headers });
  }

  ShowUser() {
    return this.http.get('https://localhost:7197/api/Camp/ShowUser');
  }
  createpost(data: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('https://localhost:7197/api/Camp/savePost', data, { headers });
  }
  ShowPost(){
    return this.http.get('https://localhost:7197/api/Camp/ShowPost');
  }
  deletePost(postId: any) {
    const deleteUrl = `https://localhost:7197/api/Camp/delete/${postId}`;
    return this.http.delete<any>(deleteUrl);
  }
  editPost(postId: Guid, updatedPost: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const editUrl = `https://localhost:7197/api/Camp/edit/${postId}`; // Replace with your API endpoint
    return this.http.put<any>(editUrl, updatedPost, { headers });
  }
  saveImages(model: FormData) {
    const headers = new HttpHeaders();
    // Do not set Content-Type, as it will be automatically set by the browser for FormData requests
    return this.http.post<any>('https://localhost:7197/api/Camp/saveimages', model, { headers });
  }
  
  editUser(userid: Guid, updatedUser: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const editUrl = `https://localhost:7197/api/Camp/edituser/${userid}`; // Replace with your API endpoint
    return this.http.put<any>(editUrl, updatedUser, { headers });
  }

  searchPosts(searchTerm: string) {
    // Encode the search term for safe URL usage
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    
    // Make an HTTP GET request to your API
    return this.http.get<any[]>(`https://localhost:7197/api/Camp/SearchPost?searchTerm=${encodedSearchTerm}`);
  }
}