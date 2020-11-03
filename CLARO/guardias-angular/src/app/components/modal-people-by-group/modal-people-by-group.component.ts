import { Component, Inject, OnInit, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { User } from '@app/models/group.model';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { GeneralService } from '@app/services/general.service';


/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};

const SITE_DATA = [
  {
    "nombre": "MERLO",
    "acronimos": [
      {
        "acronimo": "SL196",
        "localidad": "MERLO",
        "cellowner_legajo": "EXA23736",
        "count_people": "1",
      }
    ]
  },
  {
    "nombre": "SIN REGIÓN ASOCIADA",
    "acronimos": [
      {
        "acronimo": "TNQ126",
        "localidad": null,
        "cellowner_legajo": "EXA23736",
        "count_people": "1",
      },
      {
        "acronimo": "TNQ127",
        "localidad": null,
        "cellowner_legajo": "EXA23736",
        "count_people": "1",
      },
      {
        "acronimo": "TNQ128",
        "localidad": null,
        "cellowner_legajo": "EXA23736",
        "count_people": "1",
      },
      {
        "acronimo": "TNQ131",
        "localidad": null,
        "cellowner_legajo": "EXA23736",
        "count_people": "1",
      }
    ]
  }
]

const DATA_MAP = {
  "MERLO": {
    "SL196": {
      "acronimo": "SL196",
      "localidad": "MERLO",
      "cellowner_legajo": "EXA23736",
      "count_people": "1",
    
    }
  },
  "SIN REGIÓN ASOCIADA": {
    "TNQ126": {
      "acronimo": "TNQ126",
      "localidad": null,
      "cellowner_legajo": "EXA23736",
      "count_people": "1",
    
    },
    "TNQ127": {
      "acronimo": "TNQ127",
      "localidad": null,
      "cellowner_legajo": "EXA23736",
      "count_people": "1",
    
    },
    "TNQ128": {
      "acronimo": "TNQ128",
      "localidad": null,
      "cellowner_legajo": "EXA23736",
      "count_people": "1",
   
    },
    "TNQ131": {
      "acronimo": "TNQ131",
      "localidad": null,
      "cellowner_legajo": "EXA23736",
      "count_people": "1",
 
    }
  }
}

const DATA_MAP_NULL = {
  "MERLO": {
    "SL196": null
  },
  "SIN REGIÓN ASOCIADA": {
    "TNQ126": null,
    "TNQ127": null,
    "TNQ128": null,
    "TNQ131": null
  }
}


/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.

    // SITE_DATA
    // DATA_MAP
    const data = this.buildFileTree(DATA_MAP_NULL, 0);
    // console.log('data', data);
    // // Notify the change.
    this.dataChange.next(data);

  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      console.log(value);
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

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  // updateItem(node: TodoItemNode, name: string) {
  //   node.item = name;
  //   this.dataChange.next(this.data);
  // }
}


@Component({
  selector: 'app-modal-people-by-group',
  templateUrl: './modal-people-by-group.component.html',
  styleUrls: ['./modal-people-by-group.component.scss'],
  providers: [ChecklistDatabase]
})
export class ModalPeopleByGroupComponent implements OnInit {

   /** Map from flat node to nested node. This helps us finding the nested node to be modified */
   flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

   /** Map from nested node to flattened node. This helps us to keep the same object for selection */
   nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
 
   /** A selected parent node to be inserted */
   selectedParent: TodoItemFlatNode | null = null;
 
   /** The new item's name */
   newItemName = '';
 
   treeControl: FlatTreeControl<TodoItemFlatNode>;
 
   treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
 
   dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
 
   /** The selection for checklist */
   checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

   sites = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User},
    public generalservice: GeneralService,
    private _database: ChecklistDatabase,
    public dialogRef: MatDialogRef<ModalPeopleByGroupComponent>) {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
        this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

      _database.dataChange.subscribe(data => {
        this.dataSource.data = data;
      });
    }


  ngOnInit(): void {
    console.log('modal', this.data.user);
    this.generalservice.getGroupsByOwner('EXA23736').subscribe(resu => {
      console.log(resu);
      this.groupByLocalidad(resu);
      console.log('sites', this.sites);
    });
    // getGroupsByOwner
  }

  groupByLocalidad(sites: any) {
    const acronimos = new Set(sites.map(item => item.localidad));
    acronimos.forEach(local => {
      this.sites.push({
        nombre: local || 'SIN REGIÓN ASOCIADA',
        acronimos: sites.filter(i => i.localidad === local).reduce(function(map, obj) {
          map[obj.acronimo] = null;
          return map;
        }, {})
      });
    });


    const result = this.sites.reduce(function(map, obj) {
      map[obj.nombre] = obj.acronimos;
      return map;
    }, {});

    console.log(result);

  }


  onUpdatedGroup(deletedUsers: any) {
    this.dialogRef.close(deletedUsers);
  }

  
  onClickBtnRight() {
    console.log('onClickBtnRight');
  }

  closeModal() {
    this.dialogRef.close();
  }

  // TODO Lo del Tree
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
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
    console.log('todoItemSelectionToggle', node);
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
    console.log('todoLeafItemSelectionToggle', node);
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
