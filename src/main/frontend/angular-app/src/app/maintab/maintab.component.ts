import { Component, ViewChild, OnDestroy, ElementRef, Input } from "@angular/core";
import { Tabbar } from "dhx-suite";
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.component.html',
  styleUrls: ['./maintab.component.css']
})
export class MaintabComponent implements OnDestroy {

  @ViewChild("widget", { static: true })
  container: ElementRef | undefined
  tab: Tabbar | undefined

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.tab = new Tabbar(this.container?.nativeElement, {
      views: [
        { tab: "Welcome", css: "panel flex" }
      ]
    })

    this.httpClientService.getUserResources().subscribe(list => {
      list.forEach((resource) => {
        this.tab?.addTab({tab: resource.sheetType, css:"panel flex"}, 0)
      })
    })
  }

  ngOnDestroy() {
    if (this.tab) {
      this.tab.destructor()
    }
  }
}
