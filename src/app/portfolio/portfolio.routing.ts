import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import  {StockComponent} from './stock/stock.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: PortfolioComponent,   
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: DashboardComponent },            
            { path: 'stocks', component: StockComponent },
            { path: 'addstock', component: AddStockComponent },
            { path: 'analyze', component: AnalyzeComponent },
            { path: 'profile', component: ProfileComponent },
        ]     
    }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortfolioRoutingModule {}
