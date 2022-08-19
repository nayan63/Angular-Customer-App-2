import { Injectable } from '@angular/core';
import { user } from './user'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users:user[]=[];

  constructor() { }

  addUser(userData:any)
  {
    let lastId ;
    if(this.users.length==0)
    {
      lastId = 1;
    }
    else
    {
      let lastUser = this.users[this.users.length-1];
      lastId = lastUser.id+1;
    }

    this.users.push({id:lastId,name:userData.name,age:userData.age,gender:userData.gender,hobbies:userData.hobbies,address:userData.address});
  }

  listUser()
  {
    console.log("All"+this.users)
    return this.users;
  }

  editUser(id:number)
  {
    for(let user of this.users)
    {
      if(user.id==id)
      {
        return user;
      }
    }
    return null;
  }

  updateUser(userData:user,id:number)
  {
    let itemIndex = this.users.findIndex(item => item.id == id);

    this.users[itemIndex] = userData;
  }

  deleteUser(id:number)
  {
    let itemIndex = this.users.findIndex(item => item.id == id);

    this.users = this.users.filter(item=>item.id!=id);
  }
}
