import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChoreographyStep {
  id: string;
  name: string;
  startBeat: number;
  beatDuration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChoreographyService {
  private jsonUrl = 'assets/choreography.json';
  private stepsSubject = new BehaviorSubject<ChoreographyStep[]>([]);
  steps$ = this.stepsSubject.asObservable();

  loadChoreography(jsonString: string) {
    const parsedData = JSON.parse(jsonString);
    this.stepsSubject.next(parsedData.steps);
  }
}
