import { Component } from '@angular/core';
import { ChoreographyService,ChoreographyStep } from '../../services/choreography.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddStepModalComponent } from '../add-step-modal/add-step-modal.component';

@Component({
  selector: 'app-step-lib',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-lib.component.html',
  styleUrl: './step-lib.component.css'
})
export class StepLibComponent {
  constructor(private _choreoService: ChoreographyService,
    private dialog: MatDialog
  ){}
  steps:ChoreographyStep[] = [];

  ngOnInit() {
    this._choreoService.loadHipHopeSteps();
    this._choreoService.hipHopeSteps$.subscribe(res =>{
      this.steps = res;
    })
  }
  openEditStepDialog(step: ChoreographyStep): void {
      const dialogRef = this.dialog.open(AddStepModalComponent, {
        width: '400px',
        data: { ...step }  // ✅ Pass step data to modal for editing
      });
    }

}
