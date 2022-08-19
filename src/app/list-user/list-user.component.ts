import { Component, OnInit } from '@angular/core';
import { user } from '../service/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private usersService:UserServiceService) { }

  ngOnInit(): void {
    this.getUserList();
  }
  displayedColumns: string[]=[];
  dataSource:user[]=[];
  getUserList()
  {
    this.displayedColumns = ['id', 'name', 'age', 'gender','hobbies','address','action'];
    this.dataSource = this.usersService.listUser();
  }

  deleteUser(id:number)
  {
    this.usersService.deleteUser(id);
    this.getUserList();
  }

}
