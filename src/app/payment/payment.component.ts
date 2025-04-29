import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  form: FormGroup;
  servicesList = [
    {value: 'big_data', label: 'AI / ML and Big Data' },
    {value: 'java', label: 'Java Application Development' },
    {value: 'paython', label: 'Python Application Development' },
    {value: 'app', label: 'Mobile App Development' },
    {value: 'web_design', label: 'Web Design' },
    {value: 'web_development', label: 'Web Development' },
    {value: 'cloud_setup', label: 'Cloud Setup AWS / GCP / Azure' },
    {value: 'cloud_setup', label: 'Cloud Migration AWS / GCP / Azure' },
    {value: 'corporate_training', label: 'Corporate Training' },
    {value: 'dev_ops', label: 'DevOps and CI / CD Setup' },
  ]
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: [''],
      serviceRequired: ['', [Validators.required]],
    });
  }
}
