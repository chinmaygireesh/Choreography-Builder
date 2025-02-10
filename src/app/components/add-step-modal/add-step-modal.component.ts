
import { ChoreographyStep, ChoreographyService } from '../../services/choreography.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { Pipe } from '@angular/core';
import { take } from 'rxjs';

// Angular Material Modules
import { MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-step-modal',
  standalone: true,
  templateUrl: './add-step-modal.component.html',
  styleUrl: './add-step-modal.component.css',
  imports: [
    FormsModule,
    MatDialogModule,       // ✅ Required for mat-dialog
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgIf
  ]
})
export class AddStepModalComponent {
  steps: ChoreographyStep[] = [];
  lastId = 0;
  defaultStepData: ChoreographyStep 
  =
  {
    id: 0,
    name: "",
    startBeat: 0,
    beatDuration: 1,
    difficulty: "Medium",
    level: "Beginner",
    travel: "Small",
    direction: "Clockwise",
    energy: "High",
    groove: "Hip-Hop Bounce",
    refLink: "",
    video: ""
  };

  constructor(private _choreographyService: ChoreographyService,
    private dialogRef: MatDialogRef<AddStepModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data: ChoreographyStep
    ) {
      if(data)
      {
        this.defaultStepData = { ...data }; // ✅ Clone data for editing
      }
    }

    ngOnInit() {
      this._choreographyService.steps$.pipe(take(1)).subscribe(steps => {
        this.steps = <ChoreographyStep[]>steps;
        if (steps.length > 0 && !this.defaultStepData.id) {
          const lastStep = steps[steps.length - 1];
          this.defaultStepData.startBeat = lastStep.startBeat + lastStep.beatDuration;
          this.lastId = lastStep.id;
        }
      });
    }
    
    

  save() {
    if(!this.defaultStepData.id)
      {
      this.defaultStepData.id = this.lastId + 1 // Generate ID from name
      this._choreographyService.addStep(this.defaultStepData)
      }
    else
      {
        this._choreographyService.updateStep(this.defaultStepData)
      }  
      this.dialogRef.close(); // Send data back to parent
  }

  close() {
    this.dialogRef.close();
  }
  deleteStep() {
    if (confirm('Are you sure you want to delete this step?')) {
      this._choreographyService.removeStep(this.defaultStepData.id);
      this.dialogRef.close();
    }
  }
  

}
