import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email = null;
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    auth.getUser().subscribe(
      (user) => {
        this.email = user?.email;
      },
      (err) => {
        this.toastr.error('You are not Authenticated...');
      }
    );
  }

  ngOnInit(): void {}

  async handelSignOut() {
    try {
      await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Logout Success');
      this.email = null;
    } catch (error) {
      this.toastr.error('Problem in SignOut..');
    }
  }
}
