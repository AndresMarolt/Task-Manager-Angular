import { Injectable } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listsSubject: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  public lists$: Observable<any> = this.listsSubject.asObservable();
  
  constructor(private webReqService: WebRequestService) {
    this.getLists().subscribe(lists => {
      this.listsSubject.next(lists)
    });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getLists2(): void {
    this.webReqService.get(`lists`).subscribe(list => {
      this.listsSubject.next(list);
    });
  }
  
  createList(title: string): Observable<any> {
    let newList = this.listsSubject.getValue();
    this.webReqService.post('lists', { title }).subscribe(_ => {
      newList.push(_);
      this.listsSubject.next(newList);
    });

    return this.lists$;
  }

  updateList(title: string, listId: string) {
    let newList = this.listsSubject.getValue();
    this.webReqService.patch(`lists/${listId}`, { title }).subscribe(_ => {
      let updatedLists = newList.map((list: any) => list._id === listId ? {...list, title} : list);
      this.listsSubject.next(updatedLists);
    });

    return this.lists$;
  }

  deleteList(listId: string) {
    return this.webReqService.delete(`lists/${listId}`)
  }
}
