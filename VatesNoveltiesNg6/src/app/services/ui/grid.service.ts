import { Injectable } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { isNullOrUndefined } from 'util';

@Injectable()
export class GridService<T = any> {
  public getInstance(columns?: Array<string>, dataSource?: Array<T>): IGridData<T> {
    const item: IGridData<T> = {
      displayedColumns: new Array<string>(),
      dataSource: new MatTableDataSource()
    };

    if (!isNullOrUndefined(columns)) {
      item.displayedColumns.concat(columns);
    }

    if (!isNullOrUndefined(dataSource)) {
      item.dataSource.data = dataSource;
    }

    return item;
  }

  public setPaginationConfiguration(): void {
    throw new Error('Función no implementada');
  }
}

export interface IGridData<T> {
  displayedColumns: Array<string>;
  dataSource: MatTableDataSource<T>;
  resultCount?: number;
  paginator?: MatPaginator;
  selectionModel?: SelectionModel<T>;
}
