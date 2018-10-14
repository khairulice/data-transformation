import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { StockService, AlertService } from '../../../_services';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  addStockForm:FormGroup;
  loading = false;
  submitted = false;
  companies=[];
  selectedCountry:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private stockService: StockService,
    private alertService:AlertService) { }

    ngOnInit() {
      this.stockService.getStockMarket().subscribe(data=>{
        //console.log(data);
        this.companies=data})
        this.addStockForm = this.formBuilder.group({
            companyName: ['', Validators.required],
            purchaseDate: ['', Validators.required],
            quantity: ['', Validators.required],
            purchaseRate: ['', Validators.required]
        });
    }
    get f() { return this.addStockForm.controls; }

    onSubmit() {
      this.submitted = true;      
      // stop here if form is invalid
      if (this.addStockForm.invalid) {
          return;
      }
      console.log(this.addStockForm.value);
      this.loading = true;
      this.stockService.Add(this.addStockForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Stock added successfully', true);
                  this.router.navigate(['/portfolio/stocks']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
