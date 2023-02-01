import { Routes } from "@angular/router";
import { ApuestasComponent } from "./apuestas/apuestas.component";
import { SportAdministrationComponent } from "./mantenimientos/sport-administration/sport-administration.component";
import { PaquetesComponent } from "./paquetes/paquetes.component";
import { PremiosComponent } from "./premios/premios.component";
import { RankingComponent } from "./ranking/ranking.component";

export const VistasRoutes: Routes = [
    {
        path: 'premios',
        component: PremiosComponent
    },
    {
        path: 'apuestas',
        component: ApuestasComponent
    },
    {
        path: 'paquetes',
        component: PaquetesComponent
    },
    {
        path:'ranking',
        component:RankingComponent
    },
    {
        path:'sport_administration',
        component:SportAdministrationComponent
    }
    //
]