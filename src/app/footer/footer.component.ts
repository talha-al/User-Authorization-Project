import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goToLinkedin() {
    window.location.href = 'https://www.linkedin.com/in/talhaalatas/';
  }

  goToGithub() {
    window.location.href = 'https://github.com/talha-al/User-Authorization-Project';
  }

}
