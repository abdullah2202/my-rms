import { Component, OnInit } from '@angular/core';
import { PagerService } from '../services/pager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialAppModule } from '../material.module';
/**
 * Component 
 */
@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {

  data = [{}];
  allData = [{}];
  headers = [{}];

  loadingData: boolean = false;

  errorMessage: string;

  primaryField = '';  

  selectedRows = [];
  selectedCell: string = '';

  pager: any = {};
  pagedItems: any[];
  currentPage: number = 1;

  //Sort Ascending
  sortAsc: boolean = false;
  sortField = this.primaryField;

  //Used for pagination
  itemsPerPage = [25,50,100,250,500];
  itemsPerPageSelected = 25;

  //Filters
  filter: any = {};           // Keywords to filter results by
  filterFields: any = [];     // Fields to include when filtering the results
  displaySort: any = '';      // Initial loading filter keywords e.g. processing, completed
  displaySortField: any = ''; // Initial loading filter fields
  
  constructor(
    protected pagerService: PagerService
  ) { }

  ngOnInit(): void {
    this.filter = {};
  } 

  /**
   * Called when context menu is called on table
   * 
   */
  context(){
    console.log('Context Menu');
  }

  /**
   * 
   * Renders the page with pagination
   * Uses the pagination service
   * 
   * POSSIBLE BUG - With a large number of pages visible and navigating, 
   *                all pages are visible at once, taking up all space in pagination footer
   * 
   * @param page Page number to load a paticular page
   */
  setPage(page: number = 1) {
    this.loadingData = true;
    this.currentPage = page;

    // Error checking
    if (this.currentPage < 1 || (this.pager.totalPages > 0 && page > this.pager.totalPages)) {
        return;
    }

    // Get pager object from service
    this.pager = this.pagerService.getPager(this.data.length, this.currentPage, this.itemsPerPageSelected);

    // Get current page of items
    this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);

    this.loadingData = false;
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
  filterResults(filter: any, field: any, reloadData:boolean = false){

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

      //Set to page 1 of results
      this.setPage(1);
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

    // Set page back to 1
    this.setPage(1);
  }

  /**
   * 
   * Sets the number of items to display on each page
   * 
   * @param itemPPId ID of items per page select
   */
  setItemsPerPage(itemPPId: number){
    this.itemsPerPageSelected = itemPPId;
    this.setPage(1);
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
    if(this.selectedRows.includes(i)){
      this.selectedRows.splice(
        this.selectedRows.indexOf(i),1
      );
    }else{
      this.selectedRows.push(i);
    }
  }

  /**
   * Selects and checks the checkboxes for all results
   */
  checkAll(){
    this.uncheckAll();
    for(var i=0;i<this.data.length;i++){
        this.selectedRows.push(this.data[i][this.primaryField]);
    }
  }

  /**
   * Unchecks all the checkboxes
   */
  uncheckAll(){
    this.selectedRows.splice(0,this.selectedRows.length);
  }

  /**
   * Checks if some checkboxes are checked but not all
   */
  isSomeChecked(){
    if(
      this.selectedRows.length>0 &&
      this.selectedRows.length!=this.data.length
    ){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Reduces the header file by 20px;
   */
  headerSize(width){
    return width - 20;
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

    // Refresh the view
    this.setPage(this.currentPage);
    
    //TODO: Set icons states, and then display next to header items

  }


  

}
