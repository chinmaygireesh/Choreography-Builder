import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoreographyStep,ChoreographyService } from '../../services/choreography.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-display-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-area.component.html',
  styleUrl: './display-area.component.css'
})
export class DisplayAreaComponent {
  selectedStep: ChoreographyStep | null = null;

  constructor(private _choreographyStep: ChoreographyService, private sanitizer: DomSanitizer ){

  }
  ngOnInit() {
    this._choreographyStep.selectedStep$.subscribe(step => {
      this.selectedStep = step;
      console.log(this.selectedStep);
    });
  }

  getYouTubeEmbedUrl(videoUrl?: string): SafeResourceUrl | null {
    if (!videoUrl) return null;
    
    // Convert standard YouTube URL to embed format
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoIdMatch[1]}`);
    }
    
    return null;
  }

}
