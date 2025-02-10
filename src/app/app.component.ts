import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChoreographyService } from './services/choreography.service';
import { TimelineComponent } from './components/timeline/timeline.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TimelineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'choreo-builder-v';
  constructor(private choreographyService: ChoreographyService) {}
  
  loadChoreography() {
    const jsonString = `{
      "steps": [
        {
          "id": "step1",
          "name": "Spin",
          "startBeat": 0,
          "beatDuration": 2,
          "difficulty": "Medium",
          "level": "Beginner",
          "travel": "Small",
          "direction": "Clockwise",
          "energy": "High",
          "groove": "Hip-Hop Bounce",
          "refLink": "https://www.danceexample.com/spin",
          "video": "https://www.youtube.com/watch?v=example"
        },
        {
  "id": "step2",
  "name": "Spin-2",
  "startBeat": 2,
  "beatDuration": 2,
  "difficulty": "Medium",
  "level": "Beginner",
  "travel": "Small",
  "direction": "Clockwise",
  "energy": "High",
  "groove": "Hip-Hop Bounce",
  "refLink": "https://www.danceexample.com/spin",
  "video": "https://www.youtube.com/watch?v=example"
}
      ]
    }`;

    this.choreographyService.loadChoreography(jsonString);
  }

}
