import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../service/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private usersService: UserServiceService, private formBuilder: FormBuilder,
    private route: Router, private rt: ActivatedRoute) {
    // this.usersService.addUser({ id: 1, name: "Sanjay Seal", age: 30, gender: "Male", hobbies: "Singing", address: "Chakda" });
    // this.usersService.addUser({ id: 2, name: "Moumita Dutta", age: 32, gender: "Female", hobbies: "Dancing", address: "Kolkata" });
  }

  userForm!: FormGroup;
  editUserId!:number;
  ngOnInit(): void {
    if (this.route.url == "/add") {
      this.userForm = this.formBuilder.group(
        {
          "name": ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
          "age": ['', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]],
          "gender": ['', [Validators.required]],
          "hobbies": ['', [Validators.required]],
          "address": ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
        }
      );
    }
    else {
      let id = this.rt.snapshot.params.id;
      this.editUserId = id;
      let userById = this.usersService.editUser(id);
      console.log(userById)
      this.userForm = this.formBuilder.group(
        {
          "name": [userById?.name, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
          "age": [userById?.age, [Validators.required, Validators.pattern('^[0-9]{1,5}$')]],
          "gender": [userById?.gender, [Validators.required]],
          "hobbies": [userById?.hobbies, [Validators.required]],
          "address": [userById?.address, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
        }
      );
    }
  }

  get name() {
    return this.userForm.get('name');
  }
  get age() {
    return this.userForm.get('age');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get hobbies() {
    return this.userForm.get('hobbies');
  }
  get address() {
    return this.userForm.get('address');
  }
  addUser() {
    if (this.route.url == "/add") {
      if (this.userForm.valid) {
        this.usersService.addUser(this.userForm.value);
        this.route.navigate(['/list'])
      }
      else {
        alert("Something is Wrong")
      }
    }
    else
    {
      if (this.userForm.valid) {
        let userVal = this.userForm.value; 
        let UserValue = {id: this.editUserId,name: userVal.name,age:userVal.age, gender:userVal.gender,hobbies:userVal.hobbies,address: userVal.address};
        this.usersService.updateUser(UserValue,this.editUserId);
        this.route.navigate(['/list'])
      }
      else {
        alert("Something is Wrong")
      }
    }
  }

}
