import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class produtosComponents implements AfterViewInit {
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
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 100, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 400, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 600, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 111, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 1107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 167, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 194, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 1984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 297, symbol: 'Ne'},
];