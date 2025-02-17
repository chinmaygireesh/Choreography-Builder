import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ChoreographyService, ChoreographyStep } from '../../services/choreography.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddStepModalComponent } from '../add-step-modal/add-step-modal.component';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true,
  imports:[NgFor, MatIcon]
})
export class TimelineComponent implements OnInit {
  beats: number[] = [];
  steps: ChoreographyStep[] = [];
  @Input() bpm: number = 120;
  totalBeats = 32; // Adjust as needed

  constructor(
    private choreographyService: ChoreographyService,
    private dialog: MatDialog
            ) {}

  ngOnInit() {
    this.generateBeats();
    this.choreographyService.steps$.subscribe(steps => {
      this.steps = steps;
    });
  }

  generateBeats() {
    this.beats = Array.from({ length: this.totalBeats }, (_, i) => i + 1);
  }

  calculateLeftPosition(startBeat: number): string {
    return `${(startBeat / this.totalBeats) * 100}%`;
  }

  calculateWidth(beatDuration: number): string {
    return `${(beatDuration / this.totalBeats) * 100}%`;
  }
  openAddStepModal() {
    const dialogRef = this.dialog.open(AddStepModalComponent, { width: '400px' });
    /*
    dialogRef.afterClosed().subscribe((result: ChoreographyStep) => {
      if (result) {
        this.steps.push(result);
      }
    });
    */
  }

  openEditStepDialog(step: ChoreographyStep): void {
    const dialogRef = this.dialog.open(AddStepModalComponent, {
      width: '400px',
      data: { ...step }  // ✅ Pass step data to modal for editing
    });
    /*
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ✅ Find the index and update the step
        const index = this.steps.findIndex(s => s.id === result.id);
        if (index !== -1) {
          this.steps[index] = result;
        }
      }
    });
    */
  }
  getRandomColor(stepName: string): string {
    const hash = stepName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = (hash % 40) + 220; // Restrict hue to 220-260 (blue & purple shades)
    const saturation = 40 + (hash % 20); // 40-60% saturation for subtlety
    const lightness = 30 + (hash % 10); // 30-40% lightness for a dark UI feel
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Dark After Effects color scheme
  }
  
  downloadChoreoJson()
  {
    this.choreographyService.saveChoreographyToFile(this.steps);
  }
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
  selectStep(step: ChoreographyStep) {
    this.choreographyService.selectStep(step)
  }

  getStepIcon(stepName: string): string {
    const iconMap: { [key: string]: string } = {
      'The Wop': 'directions_run',
      'Running Man': 'directions_walk',
      'Mike Tyson': 'sports_mma',
      'Gucci': 'emoji_people',
      'Smurf': 'child_care',
      'Steve Martin': 'theater_comedy',
      'Robocop': 'android',
      'Stomp': 'emoji_symbols',
      'BK Bounce (Brooklyn Bounce)': 'music_note',
      'Basketball': 'sports_basketball'
    };
  
    return iconMap[stepName] || 'help'; // Default to 'help' if no icon found
  }
  
}
