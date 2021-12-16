import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {

    of(1,2,3,4,5,6,7,8,9).pipe(
      mergeMap((val) => this.pathMultiplePosts(val)),
      tap(i => console.log(i))
    ).subscribe();

  }

  public pathMultiplePosts(postId: number) {

    let body = JSON.stringify({
      body: 'Test123',
      title: 'Title123'
    });

    let headers = new HttpHeaders({'Content-Type': 'application/json; charset:UTF-8'});
    let options = { headers: headers };

    return this.http.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, body, options);
  }

}
