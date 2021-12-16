import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {delay, exhaustMap, fromEvent, of} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('editButton', {static: true}) editButton!: ElementRef;

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {

    of(1,2,3,4,5,6,7,8,9).pipe(
      mergeMap((val) => this.pathMultiplePosts(val)),
      tap(i => console.log(i))
    ).subscribe();

    fromEvent(this.editButton.nativeElement, 'click').pipe(
      tap(() => console.log()),
      exhaustMap(() => this.pathSinglePosts()),
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

  public pathSinglePosts() {

    let body = JSON.stringify({
      body: 'Body 1 edited',
      title: 'Title 1 edited'
    });

    let headers = new HttpHeaders({'Content-Type': 'application/json; charset:UTF-8'});
    let options = { headers: headers };

    return this.http.patch(`https://jsonplaceholder.typicode.com/posts/1`, body, options)
      .pipe(
        delay(2000)
      );
  }

}
