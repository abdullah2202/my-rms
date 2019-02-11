import { Component, OnInit, Input } from '@angular/core';
import { PagerService } from '../services/pager.service';

/**
 * Component 
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class Table {

  // Data to be input
  @Input('data') data: any;
  @Input('headers') headers: any;

  // All data, unfiltered
  allData = [{}];

  // Array of widths of columns
  columnWidths = [{}];

  /**
   * Variables for Mouse Handling and Dragging
   * for changing column widths
   */
  isMouseDown: boolean = false;
  columnArrayLoc = 0;
  minColWidth = 100;

  /**
   * Variables for Context Menu
   */
/*   contextMenuX = 0;
  contextMenuY = 0;
  contextmenu = false; */
  contextMenuSubject = '';

  // True if loading is happening
  loadingData: boolean = false;

  // An Error message to display somehwere - not implemented yet
  errorMessage: string;

  // Primary field for data beign displayed
  primaryField = '';  

  _isSelected = 'none';
  _numSelected = 0;
  _totalRows = 0;

  // Cell ID of selected Cell - Not implemented
  selectedCell: string = '';

  // Pagination Object
  pager: any = {};

  // Array of paged results
  pagedItems: any[];

  // Current displayed page
  currentPage: number = 1;

  //Sort Ascending
  sortAsc: boolean = false;
  sortField = this.primaryField;

  //Used for pagination
  itemsPerPage = [25,50, 100];
  itemsPerPageSelected = 25;

  //Filters
  filter: any = {};           // Keywords to filter results by
  filterFields: any = [];     // Fields to include when filtering the results
  displaySort: any = '';      // Initial loading filter keywords e.g. processing, completed
  displaySortField: any = ''; // Initial loading filter fields
  
  constructor(
    protected pagerService: PagerService
    // protected contextMenu: ContextMenuComponent
  ) {
    this.loadingData = true;
    
   }

  ngOnInit(): void {
    // this.filter = {};
    console.log(this.data);
    console.log(this.headers);
  } 

  /**
   * Called when context menu is called on table
   * 
   */
  context(e: MouseEvent){
    /* this.contextMenuX = e.clientX;
    this.contextMenuY = e.clientY;
    this.contextmenu = true; */
    // this.contextMenu.openMenu(e);
  }


  /**
   * 
   * Filter the data with keywords and fields
   * 
   * TODO: Use multiple keywords separated by spaces, use operators such as plus sign,
   *       quotes, NOT AND OR etc, ---> AND fuzzy search when no results are found
   * 
   * @param filter Keyword to filter results by
   * @param field Field to filter keywords, used by routing (completed, processing)
   * @param reloadData Boolean set to true if loading AllData as filtered
   */
  filterResults(filter: any, field: any = null, reloadData:boolean = false){

    // Set data to sorted and filtered list first
    if(this.displaySort.length>0 && this.displaySortField.length>0 && reloadData){
      this.data = this.allData;
      this.filterResults(this.displaySort, this.displaySortField);
    }

    // Only filter if filter has been set
    if(filter){

      // Load base data
      this.data = this.allData;

      this.data = this.data.filter((item) => {

        // True if a match is found
        let match = false;
        
        // Fields to filter
        let fields = this.filterFields;

        // If fields have been set, use them instead of default ones
        if(field){
          fields[0] = field;
        }

        // Iterate through the filter fields
        for(var i = 0; i < fields.length; i++){

          // Only check if the field has data in it
          if(item[fields[i]].length>0){

            // checkMatch returns true if match
            match = this.checkMatch(filter, item[fields[i]]);

          }

          // If there is a match, break the loop
          if(match){break;} 
        }
        return match;
      });

      // Set base data to  sorted data (processing, completed etc)
      if(reloadData){
        this.allData = this.data;
      }
    }else{

      // If no filter has been set, reset filter status
      this.resetFilter();
    }
  }

  /**
   *  Checks if filter exists in check[]
   * 
   * @param filter Needle
   * @param check Haystack
   * 
   * @returns true if Needle in Haystack
   */ 
  checkMatch(filter: any, check: any){
    return check.toLocaleLowerCase().indexOf(
      filter.toLocaleLowerCase()
    ) > -1;
  }

  /**
   * Resets filter 
   */
  resetFilter(){
    // Reset filter keywords
    this.filter = {};

    // Reset data to base data
    this.data = this.allData;

  }

 

  // Overwritten - Refreshes the data from server/api
  refreshData(){}

  // Overwritten - Show detail pages for data
  showDetails(id: string){}

  /**
   * 
   * Unused - Called when a cell is selected
   * 
   * @param cell 
   */
  selectCell(cell: string){
    this.selectedCell = cell;
  }

  /**
   * Called when a row is click
   * Toggle check box for each row
   * 
   * @param i ID of row
   */
  toggleCheckbox(i: string){
    var key = this.checkForID(i);

    if(key){
      if(this.data[key]['selected']){
        this._numSelected--;
      }else{
        this._numSelected++;
      }
      this.data[key]['selected'] = !this.data[key]['selected'];
    }

    if(this._numSelected<this._totalRows &&
       this._numSelected>0)this._isSelected = 'some';
    if(this._numSelected==this._totalRows) this._isSelected = 'all';
    if(this._numSelected==0) this._isSelected = 'none';
  }

  checkForID(i: string){
    for(var key in this.data){
      if(this.data[key][this.primaryField]==i) return key;
    }
    return false;
  }

  /**
   * Selects and checks the checkboxes for all results
   */
  checkAll(){
    for(var key in this.data){
      this.data[key]['selected']=true;
    }
    this._isSelected = 'all';
    this._numSelected=this._totalRows;
  }

  /**
   * Unchecks all the checkboxes
   */
  uncheckAll(){
    for(var key in this.data){
      this.data[key]['selected']=false;
    }
    this._isSelected = 'none';
    this._numSelected=0;
  }

  /**
   * Mouse Down on Column Width Change
   */
  headerSizeDown(event: MouseEvent, headerID){
    if(!this.isMouseDown){
      this.isMouseDown = true;

      // Saves the array location so array search isn't on movement of mouse
      for(var i = 0; i < this.headers.length; i++){
        if(this.headers[i]['id']===headerID){
          this.columnArrayLoc = i;
          break;
        }
      }
    }else{
      this.isMouseDown = false;
    }
  }

  /**
   * Mouse Up on Column Width Change
   */
  headerSizeUp(){
    if(this.isMouseDown){
      this.isMouseDown = false;
    }
  }

 /**
   * Called When Mouse is moving
   * @param event Mouse Event from element
   */
  headerSizeMove(event: MouseEvent){
    if(this.isMouseDown){
      //Min Width = 100px
      if(
        (this.headers[this.columnArrayLoc]['width']+event.movementX) > this.minColWidth
      ){
        this.headers[this.columnArrayLoc]['width']+=event.movementX;
      }else{
        this.isMouseDown = false;
      }
      
    }
  }

  /**
   * @param event Called when mouse leaves header row
   */
  headerMouseLeave(){
    this.isMouseDown = false;
  }

  /**
   * Check mouse movement in header if mouse button is down or up
   */
  checkMouse(event: MouseEvent){
    if(event.buttons<1){
      this.isMouseDown = false;
    }
  }

  /**
   * 
   * Sorts the results into ascending or descending 
   * 
   * @param fieldName field name to sort by
   */
  sortBy(fieldName: string = this.primaryField){
    
    // Invert sorting direction variable
    this.sortAsc = !this.sortAsc;

    // Set the sortfield
    this.sortField = fieldName;

    // Sort the array
    this.data.sort((a,b) => {
      var x = a[this.sortField].toLowerCase();
      var y = b[this.sortField].toLowerCase();
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    // Invert sorting direction
    if(!this.sortAsc){
      this.data.reverse();
    }
  

  }


  

}
