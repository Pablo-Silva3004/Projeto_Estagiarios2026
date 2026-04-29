import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'],
})
export class equipeComponents implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  funcao: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Gustavo', funcao: 'Adm', status: 'Ativo'},
  {position: 2, name: 'Pablo', funcao: 'Adm', status: 'Ativo'},
  {position: 3, name: 'Cintia', funcao: 'Adm', status: 'Ativo'},
  {position: 4, name: 'Mayara', funcao: 'Supervisor', status: 'Ativo'},
  {position: 5, name: 'Matheus', funcao: 'Supervisor', status: 'Ativo'},
  {position: 6, name: 'Caua', funcao: 'Supervisor', status: 'Inativo'},
  {position: 7, name: 'Vinicius', funcao: 'Supervisor', status: 'Inativo'},
  {position: 8, name: 'Ezequiel', funcao: 'Supervisor', status: 'Ativo'},
  
];