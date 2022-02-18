import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddBrandModalComponent } from 'src/app/modals/add-brand-modal/add-brand-modal.component';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Brand } from 'src/app/models/brand';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-brand-listing',
  templateUrl: './brand-listing.component.html',
  styleUrls: ['./brand-listing.component.scss'],
})
export class BrandListingComponent implements OnInit {
  @ViewChild('deleteBrandModal') deleteModal!: ConfirmationModalComponent;
  brandsArray!: Brand[];
  brandsList!: Brand[];
  searchString: string = '';

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrandsListing();
  }

  getBrandsListing() {
    this.dataService.getBrands().subscribe((res: any) => {
      this.brandsArray = res;
      this.brandsList = [...this.brandsArray];
    });
  }

  onAddBrand() {
    const modelRef = this.modalService
      .open(AddBrandModalComponent, {
        centered: true,
        size: 'md',
        backdrop: 'static',
      })
      .result.then((fetchListing) => {
        if (fetchListing) this.getBrandsListing();
      });
  }

  searchBrand() {
    if (this.searchString) {
      this.brandsList = [];
      this.brandsArray.forEach((br) => {
        if (br.name.toLowerCase().includes(this.searchString.toLowerCase())) {
          this.brandsList.push(br);
        }
      });
    } else {
      this.brandsList = this.brandsArray;
    }
  }

  editBrand(brand: Brand) {
    const modelRef = this.modalService.open(AddBrandModalComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    modelRef.result.then((featchListing) => {
      if (featchListing) this.getBrandsListing();
    });
    modelRef.componentInstance.brand = brand;
  }

  deleteBrand(brand: Brand) {
    const modelRef = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    modelRef.result.then((deleteBrand) => {
      if (deleteBrand) {
        this.dataService
          .deleteBrand({ brandId: brand._id })
          .subscribe((res: any) => {
            if (res.status == 200) {
              this.toastr.success(
                brand.name + ' has been deleted successfully!'
              );
              this.getBrandsListing();
            }
          });
      }
    });
    modelRef.componentInstance.title = 'Delete Brand';
    modelRef.componentInstance.message =
      'Are you sure you want to delete ' + brand.name + '?';
    modelRef.componentInstance.cancelText = 'Cancel';
    modelRef.componentInstance.okText = 'Delete';
    modelRef.componentInstance.isOkButtonPrimary = false;
  }
}
