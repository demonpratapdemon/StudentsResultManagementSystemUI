import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RowOperation } from 'src/enums/rowOperation';
import { MarksVO } from 'src/vo/marksVO';

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  columnHeading:string[] = ["ROLL NUMBER", "SUBJECT", "YEAR", "TERM", "MARKS", "TOTAL MARKS", "GRADE"]
  colWidth:string[] = ["15%","30%","10%","10%","10%", "10%", "10%"]
  resultData:MarksVO[]
  arrayResultData : string[][];
  backBtnLabel:string = "Back"
  backUrl:string = "view-update"
  submitBtnLabel:string = "Submit"
  userConf:string = "user-conf"
  otherPageResult:string = "results"
  prevPageBtnLabel:string = "Previous"
  nextPageBtnLabel:string = "Next"
  operationList:RowOperation[] = [];


  constructor(private router:Router, private activatedRoute:ActivatedRoute) { 
    this.resultData = <MarksVO[]>this.router.getCurrentNavigation().extras.state
    if(this.resultData == undefined)  
      this.router.navigateByUrl('home')
    this.convertToResultArray()
    this.allowedOperation()
  }

  convertToResultArray(){
    this.arrayResultData = [];
    for(let i=0;i<this.resultData.length;i++){
      this.arrayResultData.push([]);
      this.arrayResultData[i].push(this.resultData[i].rollNumber)
      this.arrayResultData[i].push(this.resultData[i].subjectCode+":"+this.resultData[i].subjectName)
      this.arrayResultData[i].push(this.resultData[i].year.toString())
      this.arrayResultData[i].push(this.resultData[i].term.toString())
      this.arrayResultData[i].push(this.resultData[i].marksObtained.toString())
      this.arrayResultData[i].push(this.resultData[i].totalMarks.toString())
      this.arrayResultData[i].push(this.resultData[i].grade)      
    }
  }

  ngOnInit() { }

  allowedOperation(){
    this.operationList.push(RowOperation.UPDATE);
    this.operationList.push(RowOperation.DELETE);
  }

  updateData(updatedData:any){
    console.log(updatedData)
  }

}