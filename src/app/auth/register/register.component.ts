import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserWeb } from 'src/app/models/userweb.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInit = new UserWeb();

  matcher = new MyErrorStateMatcher();
  form = new FormGroup({
    documentNumber: new FormControl(),
    name: new FormControl(),
    lastName: new FormControl(),
    birthdayDate: new FormControl(),
    phone: new FormControl(),
    //departamento: new FormControl(),
    //provincia: new FormControl(),
    residenceCity: new FormControl(),
    address: new FormControl(),
    //invitedCode: new FormControl(),
    mail: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
    chkAceptCondition: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      documentNumber: [this.userInit.documentNumber || ''],
      name: [this.userInit.name ||''],//[this.clientRepreseInit?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(60), ]],
      lastName: [this.userInit.lastName ||''],
      //secondLastName: [''],
      birthdayDate: [this.userInit ||''],
      phone: [this.userInit.phone ||''],
      //departamento: [this.userInit.departamento ||''],
      //provincia: [this.userInit.password ||''],
      residenceCity: [this.userInit.residenceCity ||''],
      address: [this.userInit.address ||''],
      //invitedCode: [this.userInit.invitedCode ||''],
      mail: [this.userInit.mail ||'', [Validators.required, Validators.email]],
      userName: [this.userInit.userName ||''],
      password: [this.userInit.password ||''],
      chkAceptCondition:[false,[Validators.requiredTrue]],
    });
  }
  get documentNumber(): AbstractControl {
    return this.form.get("documentNumber") as FormArray;
  }
  get name(): AbstractControl {
    return this.form.get("name") as FormArray;
  }
  get lastName(): AbstractControl {
    return this.form.get("lastName") as FormArray;
  }
 
  get birthdayDate(): AbstractControl {
    return this.form.get("birthdayDate") as FormArray;
  }
  get phone(): AbstractControl {
    return this.form.get("phone") as FormArray;
  }
/** 
  get departamento(): AbstractControl {
    return this.form.get("departamento") as FormArray;
  }
  get provincia(): AbstractControl {
    return this.form.get("provincia") as FormArray;
  }*/
  get residenceCity(): AbstractControl {
    return this.form.get("residenceCity") as FormArray;
  }
  get address(): AbstractControl {
    return this.form.get("address") as FormArray;
  }


  get mail(): AbstractControl {
    return this.form.get("mail") as FormArray;
  }

  get userName(): AbstractControl {
    return this.form.get("userName") as FormArray;
  }
  get password(): AbstractControl {
    return this.form.get("password") as FormArray;
  }

  register() {
    this.userInit = this.form?.getRawValue();
    this.userService.add(this.userInit).subscribe(response => {
      if(response.isValid === true){
          Swal.fire('','Usted se ha registrado exitosamente, le enviamos un correo para confirmar su usuario Bienvenidos ...!','success').then(() =>{
             this.dialogRef.close();
          });
      }
      else  
      {
        Swal.fire('Error',response.message,'error');
      }
      console.log(response)
    });
   
    //console.log('true')
  }
}
