import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalTrainingService } from 'src/app/professional-training.service'; // ✅ Correct import
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ISlider } from 'src/app/shared/banner/banner.component';


@Component({
  selector: 'app-professional-training',
  templateUrl: './professional-training.component.html',
  styleUrls: ['./professional-training.component.scss']
})
export class ProfessionalTrainingComponent implements OnInit {

  contactForm: FormGroup;
  selectedFile: File | null = null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    autoplaySpeed: 5000,
    autoplay: false,
    navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    responsive: {
      940: {
        items: 1
      }
    },
    nav: true
  }

  slidesStore: ISlider[] = [
    {
      id: 1,
      heading: 'DevOps With AWS',
      primaryText: '',
      subHeading: 'Streamline Deployment Excellence - Master DevOps with AWS!',
      image: 'assets/images/banner.jpeg'
    },
    {
      id: 2,
      heading: 'DSA, Java with Springboot & Microservices',
      primaryText: '',
      subHeading: 'Master the Art of Building Scalable Solutions: Dive into DSA, Java with Spring Boot, and Microservices!',
      image: 'assets/images/1.png'
    },
    {
      id: 3,
      heading: 'Angular & Basics of HTML, CSS',
      primaryText: '',
      subHeading: 'Build Stunning Web Interfaces: Learn Angular with HTML & CSS Essentials!',
      image: 'assets/images/2.png'
    }
  ]
  http: any;

  constructor(
    private formBuilder: FormBuilder,
    private professionalTrainingService: ProfessionalTrainingService
  ) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      qualification: [''],
      passingyear: [''],
      course: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    console.log("error");
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      const formData = new FormData();
      const formValue = this.contactForm.value
      formData.set("firstName",formValue.firstName)
      formData.set("lastName",formValue.lastName)
      formData.set("email",formValue.email)
      formData.set("mobile",formValue.mobile)
      formData.set("qualification",formValue.qualification)
      formData.set("passingYear",formValue.passingyear)
      formData.set("description",formValue.description)
      formData.set("course",formValue.course)
      
      this.professionalTrainingService.submitForm(
  formData
      ).subscribe((payload)=>{
        console.log(payload)
      })
    } 
  }
}
