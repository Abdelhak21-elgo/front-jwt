import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandler } from './_Model/FileHandler.model';
import { DomSanitizer } from '@angular/platform-browser';
@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files : EventEmitter<FileHandler> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";
  constructor(private sanitizer : DomSanitizer) { }

  @HostListener("dragover",["$event"])
  public onDeageover(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#999";
  }

  @HostListener("dragleave",["$event"])
  public onDragLeave(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
  }

  @HostListener("drop",["$event"])
  public onDrop(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background="#eee";
    let filehandel : FileHandler;

    const file = evt.dataTransfer!.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    filehandel = {file , url};

    this.files.emit(filehandel);

  }
}
