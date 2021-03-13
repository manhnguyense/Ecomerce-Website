import { NotifyService } from './../../core/services/notify/notify.service';
import { SignalrService } from './../../core/services/signalr/signalr.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Notify } from '@app/models/notifies/notify';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;
  @ViewChild('audioElement', { static: true }) private audioElement;
  listNotify: Notify[] = [];
  numUnRead = 0;

  constructor(
    private readonly signalrService: SignalrService,
    private readonly renderer: Renderer2,
    private readonly notifyService: NotifyService
  ) { }

  ngOnInit(): void {

    this.notifyService.getAllNotify().subscribe(res => {
      if (res.isSuccessed) {
        this.listNotify = res.data.datas;
        this.numUnRead = this.listNotify.filter(x => !x.isRead).length;
      }
    })

    this.signalrService.notifyEventEmitter$.subscribe(data => {
      this.listNotify.unshift(data);
      this.numUnRead++;
      this.playNotifySound();
    })
  }

  updateNumUnread() {
    this.notifyService.updateNumUnread().subscribe(res => {
      if (res.isSuccessed) {
        this.numUnRead = 0;
      }
    })
  }

  playNotifySound() {
    this.audioElement.nativeElement.insertAdjacentHTML("beforeend", "<audio autoplay><source src='/assets/musics/notification.mp3'></audio>")
    setTimeout(() => {
      const childElements = this.audioElement.nativeElement.childNodes;
      for (let child of childElements) {
        this.renderer.removeChild(this.audioElement.nativeElement, child);
      }
    }, 1000)
  }
  log() {

  }
}
