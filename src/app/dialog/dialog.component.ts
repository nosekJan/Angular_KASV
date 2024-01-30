import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{

  errorMessage = ''
  successMessage = ''
  delaySeconds = 5
  dialogService = inject(DialogService)

  ngOnInit(): void {
    this.dialogService.getMessages().subscribe((msg) => {
      if (msg.type == 'error') {
        this.errorMessage = msg.message
        setTimeout(() => {
          this.errorMessage = ''
        }, this.delaySeconds * 1000);
      } else {
        this.successMessage = msg.message
        setTimeout(() => {
          this.successMessage = ''
        }, this.delaySeconds * 1000);
      }
    })
  }
}
