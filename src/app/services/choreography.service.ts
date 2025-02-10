import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChoreographyStep {
  id: number;
  name: string;
  startBeat: number;
  beatDuration: number;
  difficulty: string;
  level: string;
  travel: string;
  direction: string;
  energy: string;
  groove: string;
  refLink: string;
  video: string;
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
  addStep(newStep: ChoreographyStep) {
    const currentSteps = this.stepsSubject.value;
    this.stepsSubject.next([...currentSteps, newStep]);
  }

  /** ✅ Update an existing step */
  updateStep(updatedStep: ChoreographyStep) {
    const currentSteps = this.stepsSubject.value.map((step) =>
      step.id === updatedStep.id ? updatedStep : step
    );
    this.stepsSubject.next(currentSteps);
  }

  /** ✅ Remove a step */
  removeStep(stepId: number) {
    const currentSteps = this.stepsSubject.value.filter((step) => step.id !== stepId);
    this.stepsSubject.next(currentSteps);
  }
}
