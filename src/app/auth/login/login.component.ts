import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/login.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInit = new LoginDto();
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) public data: any,private userService:UserService,
    private router: Router) {
    //private matIconRegistry: MatIconRegistry,
    //private domSanitizer: DomSanitizer
      /*this.matIconRegistry.addSvgIcon(
        'check_icon',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'assets/icons/circle-check.svg'
        )
      );*/
     }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      //name: [this.clientRepreseInit?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(60), ]],
      username: [ ''],
      password: [ ''],
    });
  }
  get username(): AbstractControl {
    return this.form.get("username") as FormArray;
  }

  get password(): AbstractControl {
    return this.form.get("password") as FormArray;
  }
  async send(){
    //
    this.loginInit = this.form.value;
    let response = await this.userService.Login(this.loginInit).toPromise();
    if (response.valid) {
      this.dialogRef.close(response);
      //this.router.navigate(['/apuestas'])
      this.router.navigateByUrl('/apuestas');
    }
  }
}
