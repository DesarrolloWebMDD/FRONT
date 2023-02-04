import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AccionRequest } from 'src/app/models/sportUpload.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-excel',
  templateUrl: './carga-excel.component.html',
  styleUrls: ['./carga-excel.component.scss']
})
export class CargaExcelComponent implements OnInit {
  lstLigues:any[] = [];
  files: any[] = [];
  base64File:string = "";
  isDisabled:boolean = true;
  nombreArchivo: string = "";
  reader = new FileReader();
  array: any;
  constructor(private matIconRegistry: MatIconRegistry,
    private fb: FormBuilder, public dialogRef: MatDialogRef<any>,
    private domSanitizer: DomSanitizer) { }
  form = new FormGroup({
    ligueId: new FormControl()
  });
  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      'picture-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/picture-landscape.svg'
      )
    );

    this.buildForm();
  }
  
  buildForm() {
    this.form = this.fb.group({
      ligueId: [ 0 ,[Validators.required, Validators.minLength(2)]]
    });
  }

 

  get ligue(): boolean {
    return this.form.get('ligueId')?.invalid as boolean && this.form.get('ligueId')?.touched as boolean;
  }


  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        this.isDisabled = false;
        return;
      } else {
        
        const progressInterval = setInterval(() => {

          if (this.files.length == 0) {
            clearInterval(progressInterval);
            return;
          }

          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  prepareFilesList(files: any) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }
  onFileDropped(event: Event) {
    this.prepareFilesList(event);
  }

  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  fileBrowseHandler(event: any) {

    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.prepareFilesList(fileList);
    const file = event?.target?.files[0];
    this.nombreArchivo= file?.name;
    this.reader.readAsDataURL(file);
        this.reader.onload = () => {
         this.array = this.reader?.result?.toString().split(',');
          this.base64File = this.array[1];          
        };
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    console.log(this.files)
  }
  send(){
     if(this.files.length < 1){
       Swal.fire('','Debe cargar el excel ...!','info');
     }
     else{
      const formData = this.form?.getRawValue();
      var data = new AccionRequest();
      data.base64 = this.base64File;
      data.ligueId = formData.ligueId;
      data.fileName=this.nombreArchivo;
      console.log(data)
     }
    //this.dialogRef.close(this.form.value);
  }
}
