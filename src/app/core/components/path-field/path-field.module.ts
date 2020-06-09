import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { PathInputComponent } from './path-field.component';

@NgModule({
  declarations: [PathInputComponent],
  imports: [CommonModule, FormsModule, NbFormFieldModule, NbIconModule, NbInputModule],
  exports: [PathInputComponent],
})
export class PathInputModule {}
