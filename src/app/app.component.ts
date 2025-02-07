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
        { "id": "1", "name": "Step Touch", "startBeat": 1, "beatDuration": 2 },
        { "id": "2", "name": "Spin", "startBeat":3 , "beatDuration": 3 }
      ]
    }`;

    this.choreographyService.loadChoreography(jsonString);
  }

}
