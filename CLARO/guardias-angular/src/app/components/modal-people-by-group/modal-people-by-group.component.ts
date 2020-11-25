import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '@app/services/general.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { SitesByUserIdResponse, User } from '@app/models/group.model';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { TodoItemFlatNode, TodoItemNode } from '@app/models/tree-checklist.model';


@Component({
  selector: 'app-modal-people-by-group',
  templateUrl: './modal-people-by-group.component.html',
  styleUrls: ['./modal-people-by-group.component.scss']
})
export class ModalPeopleByGroupComponent implements OnInit {

  public treeControl: FlatTreeControl<TodoItemFlatNode>;
  public dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  public checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  
  private dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  private treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
  responseBySite: { success: boolean, message: SitesByUserIdResponse[]};

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User, acronyms: string[]},
    public generalservice: GeneralService,
    public dialogRef: MatDialogRef<ModalPeopleByGroupComponent>) {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
        this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      
      this.dataChange.subscribe(data => {
        this.dataSource.data = data;
      });
    }


  ngOnInit(): void {
    const { idusuario } = this.data.user;
    this.getSitesByUserId(idusuario);
  }
  
  getSitesByUserId(idusuario: string): void {
    this.generalservice.getSitesByUserId(idusuario).subscribe(resp => {
      this.responseBySite = resp;
      if (this.responseBySite.success) {
        const data = this.buildFileTree(this.buildDataSiteList(this.responseBySite.message), 0);
        // Notify the change.
        this.dataChange.next(data);
        this.setItemSelected();
      }
    });
  }

  setItemSelected(): void {
    this.treeControl.dataNodes.filter(node => node.level == 1).forEach(dataItem => {
      if (this.data.acronyms.indexOf(dataItem.item) !== -1) {
        this.todoItemSelectionToggle(dataItem);
        this.treeControl.expand(dataItem);
      }
    });
  }

  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }


  buildDataSiteList(data: SitesByUserIdResponse[]) {
    return data.reduce(function(map, obj) {
      map[obj.region] = obj.acronyms;
      return map;
    }, {});
  }

  checkAllOrNone(event, isAll: boolean) {
    event.stopPropagation();
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
      if (isAll) {
        if(!this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      } else {
        if(this.checklistSelection.isSelected(this.treeControl.dataNodes[i]))
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
      }
    }
  }

  onUpdatedGroup(deletedUsers: any) {
    this.dialogRef.close(deletedUsers);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSaveChanges() {
    const itemSlected = this.checklistSelection.selected.filter(item => item.level == 1);
    this.dialogRef.close(itemSlected);
  }

  getLevel = (node: TodoItemFlatNode) => node.level;
  isExpandable = (node: TodoItemFlatNode) => node.expandable;
  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
    const nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
    const existingNode = nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNodeMap.set(flatNode, node);
    nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


}
