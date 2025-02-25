import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Service } from '../interfaces/service';
import { YourNeed } from '../interfaces/your-need';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { ProfessionalTrainingService } from '../core/services/professional-training.service';
import { ToastrService } from 'ngx-toastr';

export interface Course {
  image: string;
  courseTitle: string;
  courseDescription: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  

})
export class HomeComponent {
  courses = [];
  form: FormGroup;
  serviceTypes: any[] = [];

  constructor(private fb: FormBuilder,
    private professionalTrainingService: ProfessionalTrainingService,
    private toastr: ToastrService 
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: [''],
      serviceRequired: ['', [Validators.required]],
    });
  }
  // ngOnInit(): void {
  //   // this.loadServices();
  //   // this.loadCourses();
  // }
  loadServices(): void {
    this.professionalTrainingService.getServices().subscribe({
      next: (data) => {
        this.serviceTypes = data;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
      }
    });
  }

  /**
   * Fetch courses from API
   */
  loadCourses(): void {
    this.professionalTrainingService.getCourse()
      .subscribe({
        next: (course: any) => {
          this.courses = course;
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        }
      });
  }

  Clientenquiry(): void {
    this.form.markAllAsTouched();  

    if (this.form.valid) {
      const formData = new FormData();
      const formValue = this.form.value;
      formData.set('name', formValue.name);
      formData.set('email', formValue.email);
      formData.set('mobile', formValue.mobile);
      formData.set('message', formValue.message);
      formData.set('serviceRequired', formValue.serviceRequired);

      this.professionalTrainingService.clientenquiry(formData)
      .subscribe(() => {
        this.toastr.success('Your enquiry has been submitted successfully!', 'Success');
        this.form.reset();
      }, (error) => {
        console.error("Error submitting form:", error);
        this.toastr.error('Failed to submit enquiry. Please try again.', 'Error');
      });
  } else {
    this.toastr.warning('Please fill out all required fields correctly.', 'Warning');
  }
  }
  yourNeeds: YourNeed[] = [
    {
      icon: 'shield-check',
      cardTitle: 'Reliable Software Engineering Services',
      cardDescription: 'We strive to provide the industry standard software solutions, our solutions can be benchmarked against Cost, Quality & Speed in line with our customer expectations.'
    },
    {
      icon: 'graph-up-arrow',
      cardTitle: 'Web Analysis',
      cardDescription: 'We analyse and research related web platforms before proposing any website or web application solutions'
    },
    {
      icon: 'person',
      cardTitle: 'Priority Support',
      cardDescription: 'Our team provides prioritised customer support along with the seamless coordination as per client needs.'
    },
    {
      icon: 'gear',
      cardTitle: 'Integrity',
      cardDescription: 'Our business principles are based on consistency, corporate governance, a client-first approach and ethical business practices.'
    },
    {
      icon: 'pie-chart-fill',
      cardTitle: 'Evolution',
      cardDescription: 'We believe in evolution and  adaptability with industry trends, challenge the status quo with improvisation.'
    },
    {
      icon: 'card-checklist',
      cardTitle: 'Accountability',
      cardDescription: 'Beyond the technology solution, we focus on delivering value to our customers with determination and passion to perform.'
    }
  ];
  ourServices: Service[] = [
    {
      name: 'Software Engineering Services',
      description: 'In today’s market, the demand for relevant software solutions and skilled talent is experiencing unprecedented growth, even though the effective use of technology has always been crucial for business success.',
      icon: 'lightbulb-fill',
      routePath: 'services/it-solutions'
    },
    {
      name: 'Professional Trainings',
      description: 'We provide professional training to working professionals as well as graduates to gain expertise in specific areas and enable them to seize opportunities aligned with their career aspirations. Additionally, we offer legitimate employment and exposure to the real-world industry.',
      icon: 'person-bounding-box',
      routePath: 'services/professional-training'
    },
    {
      name: 'Contract Staffing',
      description: 'Our commitment lies in assisting companies with staff augmentation through managed services tailored to their unique requirements and organizational culture. By doing so, we enable companies to focus on their core business, driving growth and success. ',
      icon: 'people-fill',
      routePath: 'services/contract-staffing'
    },
    {
      name: 'Staffing Agency',
      description: 'Our talent acquisition team excels at identifying, sourcing, and recruiting top talent for companies. We are specialized in matching skill sets and experiences of job seekers with the requirements of available job positions.',
      icon: 'person-raised-hand',
      routePath: 'services/employment-solutions'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 1000,
    autoplaySpeed: 2000,
    margin: 10,
    autoplay: true,
    navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
    nav: false,
    responsive: {
      1140: {
        items: 4
      },
      940: {
        items: 3
      },
      500: {
        items: 2
      },
      0: {
        items: 1
      },
    },
  }
}