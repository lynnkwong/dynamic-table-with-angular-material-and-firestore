import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface ProductElement {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

const PRODUCT_DATA: ProductElement[] = [
  { id: 1, name: 'Lenovo ThinkPad', brand: 'Lenovo', price: 500, quantity: 6 },
  { id: 2, name: 'Lenovo IdeaPad', brand: 'Lenovo', price: 1300, quantity: 3 },
  { id: 3, name: 'Dell Latitude', brand: 'Dell', price: 1600, quantity: 8 },
  { id: 4, name: 'Dell Inspiron', brand: 'Dell', price: 1500, quantity: 10 },
  {
    id: 5,
    name: 'Apple MacBook Air',
    brand: 'Apple',
    price: 1200,
    quantity: 9,
  },
  {
    id: 6,
    name: 'Apple MacBook Pro',
    brand: 'Apple',
    price: 2000,
    quantity: 7,
  },
];

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent {
  columns = [
    {
      columnDef: 'id',
      header: 'No.',
      cell: (element: ProductElement) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: ProductElement) => `${element.name}`,
    },
    {
      columnDef: 'brand',
      header: 'Brand',
      cell: (element: ProductElement) => `${element.brand}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: ProductElement) => `${element.price}`,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: ProductElement) => `${element.quantity}`,
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);
  dataSource: MatTableDataSource<ProductElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(PRODUCT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
