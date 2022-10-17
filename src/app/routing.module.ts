import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./component/board/board.component";

const routes: Routes = [
    {
        path: 'board', component: BoardComponent
    },
    {
        path: '', redirectTo: 'board', pathMatch: 'full'
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class MainRoutingModule{}