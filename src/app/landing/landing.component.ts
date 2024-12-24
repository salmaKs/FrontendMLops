import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  isUploadSectionVisible = false;
  imageUploaded = false;
  uploadedImage: File | any = null;
  imagePreview: string | ArrayBuffer | null = null; 
  predictionResult: string | null = null;


  toggleUploadSection() {
    this.isUploadSectionVisible = !this.isUploadSectionVisible;
  }

    // Function to handle file selection
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedImage = file;
      this.imagePreview = URL.createObjectURL(file); // Create a preview URL for the uploaded image
      this.imageUploaded = true; // Set image as uploaded
      console.log("File selected:", file);
    }
  }

  // Function to handle background click to close the section
  onBackgroundClick(event: MouseEvent) {
    this.isUploadSectionVisible = false;
  }

   // Prevent closing if clicking inside the box
   onUploadBoxClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent event from propagating to parent elements
  }

   // Function to close the upload section (both from the X button or after upload)
   closeUploadSection() {
    this.isUploadSectionVisible = false;
    this.imageUploaded = false; // Reset upload status
    this.uploadedImage = null; 
    this.imagePreview = null;  // Clear the uploaded image
  }

   // Function to delete the uploaded image
   deleteImage() {
    this.uploadedImage = null; // Clear the uploaded image
    this.imageUploaded = false;
    this.imagePreview = null; // Reset image uploaded status
  }

  // Optionnel: ajouter la gestion de Drag and Drop
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("File dropped:", file);
      // Traitez le fichier ici (envoyer au backend ou autre)
    }
  }

  constructor(private imageUploadService: ImageUploadService) { }

  onFileChange(event: any) {
    this.uploadedImage = event.target.files[0];
    this.predictionResult = null; 
  }

  analyzeImage() {
    if (this.uploadedImage) {
      this.imageUploadService.uploadImage(this.uploadedImage).subscribe(
        (response) => {
          this.predictionResult = response.prediction;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  ngOnInit() {}

}
