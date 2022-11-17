import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';
import {Subject, throwError} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class PostsService {
error = new Subject<string>()
  constructor(private http:HttpClient) { }

  createAndStorePost(title: string,content:string)
  {
    const postData:Post = {title:title , content:content}

    this.http.post<{name:string}>('https://practiceangular-accb0-default-rtdb.firebaseio.com/posts.json'
    ,postData,
{
  observe:"response"
}
    ).subscribe(response =>{
      console.log(response )
    },error => {
      this.error.next(error)
    })
  }

  fetchPosts()
  {
let searchParams = new HttpParams()
searchParams = searchParams.append('print','pretty')
searchParams = searchParams.append('custom','key')

   return this.http.get<{[key:string]:Post}>('https://practiceangular-accb0-default-rtdb.firebaseio.com/posts.json',
   {
    headers: new HttpHeaders({'customer-Header':'Hello'}),
    params: searchParams
   })
    .pipe(map(res => {
      const postsArray :Post[]=[]
      for  (const key in res)
      {
        postsArray.push({...res[key],id :key})
      }
      return postsArray
    }), catchError(a => {
      return throwError(a)
    })

    )

  }

  deletePosts()
  {
    return this.http.delete('https://practiceangular-accb0-default-rtdb.firebaseio.com/posts.json',
{
  observe:"events",
  responseType:'text'
}
    ).pipe(tap(event  => {
      console.log(event)
      if(event.type == HttpEventType.Response){
        console.log(event.body)
      }
    }))
  }
}
