import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataInterface } from './data-interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsService {
  [x: string]: any;

// status: string[] = ['GrossReturn', 'NetReturn'];

  constructor(private http:HttpClient) {}

getCompanyData()
{
  return this.http.get<any>('http://localhost:3000/CompanyDetails');
}

postData(data:any)
{
  console.log("post data called");
  return this.http.post<any>('http://localhost:3000/CompanyDetails',data);  
}
putData(id:string,data:DataInterface)
{
  console.log("put data called"+data.id+data.cname);

  return this.http.put<any>('http://localhost:3000/CompanyDetails/'+id,data);
}
deleteData(id:any)
{
  console.log(id);
  return this.http.delete<any>('http://localhost:3000/CompanyDetails/'+id);
  // return this.http.delete('http://localhost:3000/CompanyDetails/',id);
}
}