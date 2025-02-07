import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ChoreographyService, ChoreographyStep } from '../../services/choreography.service';

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

  constructor(private choreographyService: ChoreographyService) {}

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
}
