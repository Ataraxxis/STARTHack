import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService, Rawdata } from '../data.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  @ViewChild('myCanvas', {static: true}) myCanvas: ElementRef<HTMLCanvasElement>;

  data: Rawdata[] = [];

  constructor(public dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.getData((data: Rawdata[]) => {
      this.data = data;
      this.myCanvas.nativeElement.width = window.innerWidth*0.8;
      this.myCanvas.nativeElement.height = window.innerHeight*0.8;
      this.draw(
        data.map(e => {return (e.la-e.ra)*400+300}), 'red'
      )

      let ldata = [];
      let rdata = [];
      for (var i = 2; i < data.length-2; i++) {
        let l = data[i-2].la+data[i-1].la-data[i+1].la-data[i+2].la;
        let r = data[i-2].ra+data[i-1].ra-data[i+1].ra-data[i+2].ra;
        ldata.push(l);
        rdata.push(r);
      }
      this.draw((ldata.map(e => {return e*400+300})), 'orange');
      this.draw((rdata.map(e => {return e*400+300})), 'green');

      this.drawgraph();
    });
    
  }

  ngAfterViewInit() {
  }

  draw(points, color) {
    const ctx = this.myCanvas.nativeElement.getContext('2d');

    console.log(ctx);
    // set line stroke and line width
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    

    let ybase = window.innerHeight;
    let step = window.innerHeight/points.length;
    ctx.moveTo(points[0], ybase);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i], (ybase-i*step));
    }
    ctx.stroke();
  }

  drawgraph() {
    const ctx = this.myCanvas.nativeElement.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.moveTo(25, 25);
    ctx.lineTo(25, window.innerHeight*0.8);
    ctx.lineTo(window.innerWidth*0.8, window.innerHeight*0.8)
    ctx.stroke();
  }
}
