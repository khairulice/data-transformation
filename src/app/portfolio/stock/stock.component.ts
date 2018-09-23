import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ModalService, StockService } from '../../_services';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  animations: [routerTransition()]
})
export class StockComponent implements OnInit {
  private bodyText: string;
  stocks=[];
  totalamtpurchase=0;
  totalamtmarket=0;
  // stocks: Array<any> = [
  //   { companyName: 'Beximco', purchaseDate: '2018-01-20', quantity: '150', purchaseRate: '21.5', marketRate: '23' },
  //   { companyName: 'GrameenPhone', purchaseDate: '2018-03-10', quantity: '300', purchaseRate: '18', marketRate: '18.5' },
  //   { companyName: 'AB Bank', purchaseDate: '2017-05-09', quantity: '500', purchaseRate: '19.5', marketRate: '19' },
  //   { companyName: 'Square Pharmacitical', purchaseDate: '2018-01-20', quantity: '600', purchaseRate: '12.45', marketRate: '15.1' },
  //   { companyName: 'Munno Ceramics', purchaseDate: '2018-06-10', quantity: '250', purchaseRate: '29', marketRate: '32' },
  //   { companyName: 'Brac Bank', purchaseDate: '2016-07-25', quantity: '180', purchaseRate: '25', marketRate: '30' }
  // ]
  constructor(private modalService: ModalService, private stockService: StockService) { }

  ngOnInit() {    
    this.stockService.getUserStockMarket()
        .subscribe(data=>
          {
            this.stocks=data;
            this.stocks.map(s=> {
                                this.totalamtpurchase +=s.quantity*s.purchaseRate;
                                this.totalamtmarket +=s.quantity*s.marketRate;
                                })
          })
  }

  openModal(id: string) {
    console.log('Modal' + id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
