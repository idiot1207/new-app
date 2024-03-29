import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
import {IProduct,TeamDetails} from '../modals/productData'
import { ServiceService } from '../user/service.service';
import { ImportedDataComponent } from '../dialogs/imported-data/imported-data.component';


@Component({
  selector: 'expected-data-output',
  templateUrl: './expected-data-output.component.html',
  styleUrls: ['./expected-data-output.component.css']
})
export class ExpectedDataOutputComponent implements OnInit {
  displayedColumns: string[] = ['sr_no','name', 'project_name', 'release', 'project_status','target_fps','fp_closed','target_sps','sp_closed','bugs_raised','bugs_closed'];

  dataSource;
  //user:IProduct;

  users: TeamDetails[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private userService: ServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.userService.getTeamDetails()
    //   .subscribe((users: TeamDetails[]) => {
    //     this.users = users;
    //     this.refreshTable();
    //     this.dataSource.sort = this.sort;
    //   });
  }
  // Refreshing table is just redifining matDataSource
  public refreshTable(){
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    console.log("page refreshed");
  }

importData(teamdetails:TeamDetails) {
      const dialogRef = this.dialog.open(ImportedDataComponent, {
      height: '490px',
      width: '500px',
      disableClose: true,
      data: {teamdetails}
      });
      dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        //this.users=result;
        this.refreshTable();
        //console.log(result);
      }
      if(result===0){
        console.log("terminated");
      }
      });

  }

}

