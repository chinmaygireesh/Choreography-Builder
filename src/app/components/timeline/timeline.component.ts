import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ChoreographyService, ChoreographyStep } from '../../services/choreography.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStepModalComponent } from '../add-step-modal/add-step-modal.component';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true,
  imports:[NgFor]
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
    const hue = hash % 360; // Keep within HSL range
    return `hsl(${hue}, 70%, 60%)`; // Vibrant colors with good contrast
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
  
}
