import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-brand-modal',
  templateUrl: './add-brand-modal.component.html',
  styleUrls: ['./add-brand-modal.component.scss'],
})
export class AddBrandModalComponent implements OnInit {
  @Input() brand!: Brand;
  myFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  get isFormGroupValid(): boolean {
    return this.myFormGroup.valid;
  }

  get getBrandLogo(): string {
    return this.myFormGroup.get('logo')?.value;
  }

  get modal(): NgbActiveModal {
    return this.activeModal;
  }

  ngOnInit(): void {
    this.myFormGroup = this.formBuilder.group({
      name: [
        null,
        [
          Validators.minLength(2),
          Validators.maxLength(25),
          Validators.required,
        ],
      ],
      description: [
        null,
        [
          Validators.minLength(20),
          Validators.maxLength(150),
          Validators.required,
        ],
      ],
      logo: [null, [Validators.required]],
    });
    if (this.brand) {
      this.myFormGroup.patchValue({
        name: this.brand.name,
        description: this.brand.description,
        logo: this.brand.logo,
      });
    }
  }

  onImageChange(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.myFormGroup.patchValue({
        logo: event.target.result,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onSave() {
    if (this.brand) {
      var paylaod = this.myFormGroup.value;
      paylaod['brandId'] = this.brand._id;
      this.dataService.editBrand(paylaod).subscribe((res: any) => {
        if (res.status == 200) {
          this.toastr.success('Brand updated successfully!');
          this.activeModal.close(true);
        }
      });
    } else {
      this.dataService
        .addBrand(this.myFormGroup.value)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.toastr.success('Brand added successfully!');
            this.activeModal.close(true);
          }
        });
    }
  }
}
