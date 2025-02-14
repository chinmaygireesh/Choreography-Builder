import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChoreographyService } from './services/choreography.service';
import { TimelineComponent } from './components/timeline/timeline.component';
import { DisplayAreaComponent } from './components/display-area/display-area.component';
import { MatIconModule } from '@angular/material/icon';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TimelineComponent,MatIconModule, DisplayAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'choreo-builder-v';
  constructor(private choreographyService: ChoreographyService) {}
  
  
loadChoreographyFromFile(event: Event): void {
  const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        try {
          const jsonString = reader.result as string;
          this.choreographyService.loadChoreography(jsonString);
        } catch (error) {
          console.error("Error parsing JSON file", error);
        }
      };
  
      reader.readAsText(file);
    }
}
saveChoreographyToFile(): void {
  var steps = []
this.choreographyService.steps$.pipe(take(1)).subscribe(res => {
  steps = res;
  this.choreographyService.saveChoreographyToFile(steps);
});
}

}
