import { Routes } from "@angular/router";
import { PremiosComponent } from "./premios/premios.component";
import { RankingComponent } from "./ranking/ranking.component";

export const VistasRoutes: Routes = [
    {
        path: 'premios',
        component: PremiosComponent
    },
    {
        path:'ranking',
        component:RankingComponent
    },
   
    //
]