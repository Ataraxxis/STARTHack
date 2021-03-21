import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { emit } from 'process';

export interface Rawdata{
  t: number;
  lx: number;
  ly: number;
  lz: number;
  rx: number;
  ry: number;
  rz: number;
  la?: number;
  ra?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataset: string;
  private loading: boolean = false;
  private em = new EventEmitter();

  private rawdata: Rawdata[] = [];

  constructor(private http: HttpClient) { }

  public setactivedataset(file: string) {
    this.loading = true;
    this.dataset = file;
    this.parseData(() => {
      this.transformData();
      this.loading = false;
      this.em.emit('loaded');
    });
  }

  private parseData(callback: any) {
    this.rawdata = [];
    this.http.get('assets/' + this.dataset, {responseType: 'text'})
    .subscribe(
        data => {
            let lines = data.split(/\r\n|\n/);
            let reduce = 0;
            lines.forEach(line => {
              if (reduce == 40) {
                reduce = 0;
                let _line = line.split(',');
                let p: Rawdata = {
                  t: parseFloat(_line[0]),
                  lx: parseFloat(_line[1]),
                  ly: parseFloat(_line[2]),
                  lz: parseFloat(_line[3]),
                  rx: parseFloat(_line[4]),
                  ry: parseFloat(_line[5]),
                  rz: parseFloat(_line[6])
                }
                p.la = Math.cbrt(Math.abs(p.lx*p.ly*p.lz));
                p.ra = Math.cbrt(Math.abs(p.rx*p.ry*p.rz));
                this.rawdata.push(p);
              } else {
                reduce++;
              }
              
            })
            callback();
        },
        error => {
            console.log(error);
            this.loading = false;
        }
    );
  }

  private transformData() {
    console.log(this.rawdata[0].lx);
    
  }

  public async getData(callback: any) {
    console.log("debug")
    if (this.loading) await new Promise(resolve => this.em.once('loaded', resolve));
    console.log(2)
    callback(this.rawdata);
  }
}
