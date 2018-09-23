import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AddStock,StockMarket } from '../_models';

@Injectable()
export class StockService {
    constructor(private http: HttpClient) { }   

    Add(stock: AddStock) {
        return this.http.post(`${environment.apiUrl}/userstocks/create`, stock);
    }
    getUserStockMarket() {
        return this.http.get<StockMarket[]>(`${environment.apiUrl}/userstocks/getUserStockMarket`);
    }
    getStockMarket() {
        return this.http.get<StockMarket[]>(`${environment.apiUrl}/userstocks/getStockMarket`);
    }

    update(stock: AddStock) {
        return this.http.put(`${environment.apiUrl}/userstocks/` + stock.id, stock);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/userstocks/` + id);
    }
}