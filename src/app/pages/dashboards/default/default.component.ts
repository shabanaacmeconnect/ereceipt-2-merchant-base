import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  dashboardData:any;
  earningLineChart:any;
  earningLineChart1:any;
  series: any;
  constructor(private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: '' }];
    this._fetchData()
  }
  private _fetchData() {
   
    this.authFackservice.get('merchants/dashboard').subscribe(
      res => {
        if(res['status']==true){
           this.dashboardData =res['data'];
        let collection=res['data']['graph'];
        this.earningLineChart= {
            chart: {
                height: 380,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#6f62e7', '#34c38f'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: [3, 3],
                curve: 'smooth'
            },
            series: [{
                name: 'Transactions Count',
                data: [parseFloat(collection[0]['count']),parseFloat(collection[1]['count']),parseFloat(collection[2]['count']),parseFloat(collection[3]['count']),parseFloat(collection[4]['count']),parseFloat(collection[5]['count']),parseFloat(collection[6]['count'])]
            },
            ],
            title: {
                text: 'Transactions for last 7 Days',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.2
                },
                borderColor: '#f1f1f1'
            }, 
            markers: {
                style: 'inverted',
                size: 6
            },
            xaxis: {
                categories: [collection[0]['DayDate'],collection[1]['DayDate'],collection[2]['DayDate'],collection[3]['DayDate'],collection[4]['DayDate'],collection[5]['DayDate'],collection[6]['DayDate']],
                title: {
                    text: 'Date'
                }
            },
            yaxis: {
                title: {
                     text: 'Transactions count'
                },
               
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false
                        }
                    },
                    legend: {
                        show: false
                    },
                }
            }]
        };
      
        };
      });
  }
}
