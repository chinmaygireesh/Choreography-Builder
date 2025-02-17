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

  private selectedStepSubject = new BehaviorSubject<ChoreographyStep | null>(null);
  selectedStep$ = this.selectedStepSubject.asObservable();

  private hipHopeStepsSubject = new BehaviorSubject<ChoreographyStep[]>([]);
  hipHopeSteps$ = this.hipHopeStepsSubject.asObservable();

  selectStep(step: ChoreographyStep) {
    this.selectedStepSubject.next(step);
  }

  loadChoreography(jsonString: string) {
    const parsedData = JSON.parse(jsonString);
    this.stepsSubject.next(parsedData);
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
  saveChoreographyToFile(steps: ChoreographyStep[]): void {
    const choreographyData = JSON.stringify(steps, null, 2); // Converts array to formatted JSON
    const blob = new Blob([choreographyData], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = "choreography.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  loadHipHopeSteps()
  {
    var stepset1 = "[{\"id\":0,\"name\":\"The Wop\",\"startBeat\":1,\"beatDuration\":2,\"difficulty\":\"Easy\",\"level\":\"Beginner\",\"travel\":\"Small\",\"direction\":\"Forward\",\"energy\":\"Medium\",\"groove\":\"Hip-Hop Bounce\",\"refLink\":\"https://www.youtube.com/results?search_query=the+wop+dance+tutorial\",\"video\":\"https://www.youtube.com/watch?v=XzmhNJ4ASbg\"},{\"id\":0,\"name\":\"Running Man\",\"startBeat\":3,\"beatDuration\":2,\"difficulty\":\"Medium\",\"level\":\"Beginner\",\"travel\":\"Medium\",\"direction\":\"Backward\",\"energy\":\"High\",\"groove\":\"New Jack Swing\",\"refLink\":\"https://www.danceexample.com/running-man\",\"video\":\"https://www.youtube.com/watch?v=lYpRasK4c9k\"},{\"id\":0,\"name\":\"Mike Tyson\",\"startBeat\":4,\"beatDuration\":3,\"difficulty\":\"Hard\",\"level\":\"Advanced\",\"travel\":\"Large\",\"direction\":\"Side\",\"energy\":\"Very High\",\"groove\":\"Power Moves\",\"refLink\":\"https://www.danceexample.com/mike-tyson\",\"video\":\"https://youtu.be/QMDYyCn7b4A?si=YiWomaZFmjaezS_U\"},{\"id\":0,\"name\":\"Gucci\",\"startBeat\":2,\"beatDuration\":2,\"difficulty\":\"Medium\",\"level\":\"Intermediate\",\"travel\":\"Small\",\"direction\":\"Forward\",\"energy\":\"Medium\",\"groove\":\"Smooth Flow\",\"refLink\":\"https://www.danceexample.com/gucci\",\"video\":\"https://www.youtube.com/watch?v=example4\"},{\"id\":0,\"name\":\"Smurf\",\"startBeat\":3,\"beatDuration\":2,\"difficulty\":\"Easy\",\"level\":\"Beginner\",\"travel\":\"Small\",\"direction\":\"Side\",\"energy\":\"Low\",\"groove\":\"Old School\",\"refLink\":\"https://www.danceexample.com/smurf\",\"video\":\"https://www.youtube.com/watch?v=example5\"},{\"id\":0,\"name\":\"Steve Martin\",\"startBeat\":3,\"beatDuration\":3,\"difficulty\":\"Medium\",\"level\":\"Intermediate\",\"travel\":\"Medium\",\"direction\":\"Forward\",\"energy\":\"Medium\",\"groove\":\"Groovy\",\"refLink\":\"https://www.danceexample.com/steve-martin\",\"video\":\"https://www.youtube.com/watch?v=example6\"},{\"id\":0,\"name\":\"Robocop\",\"startBeat\":2,\"beatDuration\":3,\"difficulty\":\"Hard\",\"level\":\"Advanced\",\"travel\":\"Large\",\"direction\":\"Side\",\"energy\":\"Very High\",\"groove\":\"Power Moves\",\"refLink\":\"https://www.danceexample.com/robocop\",\"video\":\"https://www.youtube.com/watch?v=example7\"},{\"id\":0,\"name\":\"Stomp\",\"startBeat\":2,\"beatDuration\":2,\"difficulty\":\"Medium\",\"level\":\"Intermediate\",\"travel\":\"Small\",\"direction\":\"Forward\",\"energy\":\"Medium\",\"groove\":\"Footwork\",\"refLink\":\"https://www.danceexample.com/stomp\",\"video\":\"https://www.youtube.com/watch?v=example8\"},{\"id\":0,\"name\":\"BK Bounce (Brooklyn Bounce)\",\"startBeat\":3,\"beatDuration\":2,\"difficulty\":\"Easy\",\"level\":\"Beginner\",\"travel\":\"Small\",\"direction\":\"Side\",\"energy\":\"Low\",\"groove\":\"Bounce\",\"refLink\":\"https://www.danceexample.com/bk-bounce\",\"video\":\"https://www.youtube.com/watch?v=example9\"},{\"id\":0,\"name\":\"Basketball\",\"startBeat\":4,\"beatDuration\":3,\"difficulty\":\"Hard\",\"level\":\"Advanced\",\"travel\":\"Large\",\"direction\":\"Side\",\"energy\":\"Very High\",\"groove\":\"Freestyle\",\"refLink\":\"https://www.danceexample.com/basketball\",\"video\":\"https://www.youtube.com/watch?v=example10\"}"

    var stepset2 = "{\"id\":0,\"name\":\"ATL/A-Town Stomp\",\"startBeat\":1,\"beatDuration\":2,\"difficulty\":\"Medium\",\"level\":\"Intermediate\",\"travel\":\"Small\",\"direction\":\"Forward\",\"energy\":\"Medium\",\"groove\":\"Southern Bounce\",\"refLink\":\"https://www.danceexample.com/a-town-stomp\",\"video\":\"https://www.youtube.com/watch?v=example11\"},{\"id\":0,\"name\":\"Harlem Shake\",\"startBeat\":3,\"beatDuration\":2,\"difficulty\":\"Easy\",\"level\":\"Beginner\",\"travel\":\"Small\",\"direction\":\"In Place\",\"energy\":\"High\",\"groove\":\"Hip-Hop Shake\",\"refLink\":\"https://www.danceexample.com/harlem-shake\",\"video\":\"https://www.youtube.com/watch?v=example12\"},{\"id\":0,\"name\":\"Dice Game\",\"startBeat\":4,\"beatDuration\":3,\"difficulty\":\"Medium\",\"level\":\"Intermediate\",\"travel\":\"Medium\",\"direction\":\"Side\",\"energy\":\"Medium\",\"groove\":\"Freestyle\",\"refLink\":\"https://www.danceexample.com/dice-game\",\"video\":\"https://www.youtube.com/watch?v=example13\"},{\"id\":0,\"name\":\"Roger Rabbit (Reject)\",\"startBeat\":2,\"beatDuration\":2,\"difficulty\":\"Easy\",\"level\":\"Beginner\",\"travel\":\"Medium\",\"direction\":\"Backward\",\"energy\":\"Low\",\"groove\":\"New Jack Swing\",\"refLink\":\"https://www.danceexample.com/roger-rabbit\",\"video\":\"https://www.youtube.com/watch?v=example14\"},{\"id\":0,\"name\":\"Bart Simpson\",\"startBeat\":3,\"beatDuration\":2,\"difficulty\":\"Easy\",\"level\":\"Beginner\",\"travel\":\"Small\",\"direction\":\"Side\",\"energy\":\"Low\",\"groove\":\"Old School\",\"refLink\":\"https://www.danceexample.com/bart-simpson\",\"video\":\"https://www.youtube.com/watch?v=example15\"},{\"id\":0,\"name\":\"The Prep\",\"startBeat\":3,\"beatDuration\":3,\"difficulty\":\"Medium\",\"level\":\"Intermediate\",\"travel\":\"Medium\",\"direction\":\"Forward\",\"energy\":\"Medium\",\"groove\":\"Groovy\",\"refLink\":\"https://www.danceexample.com/the-prep\",\"video\":\"https://www.youtube.com/watch?v=example16\"}]"

    var finalSteps = stepset1 + "," +stepset2;
    const parsedData = JSON.parse(finalSteps);
    this.hipHopeStepsSubject.next(parsedData);
  }

  
}
