export enum Direction {
  firstPage = 1,
  previousPage,
  nextPage
}

export interface IPagingProps {

    /**
    * The no of selected records
    */
    selectedCount: number;  

    /**
    * The total no of records
    */
    totalCount: number;

    /**
    * Current page
    */

    currentPage: number;


    /**
    * No of records to display per page
    */
    recordPerPage: number;

    /**
    * Callback issued when navigation is clicked.
    */
    onNavigationClick?: (direction: Direction) => void;
}