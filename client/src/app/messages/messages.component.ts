import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from './messages.interfaces';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  private messagesSubject: BehaviorSubject<Message[]>;
  public messages: Observable<Message[]>;
  public readonly displayedColumns = ['id', 'content'];

  constructor(private readonly http: HttpClient) {
    this.messagesSubject = new BehaviorSubject<Message[]>([]);
    this.messages = this.messagesSubject.asObservable();
  }

  ngOnInit(): void {
    this.http
      .get<Message[]>(`${environment.apiUrl}/messages`)
      .pipe(
        map((messages) => {
          this.messagesSubject.next(messages);
        })
      )
      .subscribe();
  }
}
