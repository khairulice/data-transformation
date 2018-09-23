import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ModalService, StockService } from '../../_services';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    netWorth=0;
    currentValue=0;
    lastSale: Date = new Date("2018-09-10");
    lastBuy: Date = new Date("2018-08-15");

    constructor(private modalService: ModalService, private stockService: StockService) { }

    ngOnInit() { 
        this.stockService.getUserStockMarket()
        .subscribe(data=>
          {           
            data.map(s=> {
                                this.netWorth +=s.quantity*s.purchaseRate;
                                this.currentValue +=s.quantity*s.marketRate;
                                })
          })
    }
}

