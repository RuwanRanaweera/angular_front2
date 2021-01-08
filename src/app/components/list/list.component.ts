import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { Issue } from '../../issue.model';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  dataSource: MatTableDataSource <Issue[]>;

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    // this.issueService.getIssues().subscribe((issues) => {
    //   console.log(issues);
    // });

  //   this.marinService.getAllContainers().subscribe((result) => {
  //     //Data
  //      this.dataSource = new MatTableDataSource(result);
  //  }

    this.fetchIssues();
  }
  fetchIssues(){
    this.issueService
    .getIssues()
    .subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Data requested...!');
      console.log(this.issues);
    });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id){
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
